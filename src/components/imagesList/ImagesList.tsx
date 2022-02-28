import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { deletePhotoAction, getPhotosByPage } from "../../Actions/PhotosAction";
import { ModalContext } from "../modal/modalContext/ModalContext";
import PhotosModalContent from "../modal/photosModalContent/PhotosModalContent";
import { usePages } from "../photosContext/PagesContext";
import { CalcPhotosAvailableCount } from "../scripts/CalcPhotosAvailableCount";
import './styles/ImagesList.sass'
interface IMainProps {
    photosList: photosStateType[] | [],
    getPhotosByPage(limit: number, currentPage: number): Promise<void>,
}

type photosStateType = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}

const ImagesList: React.FC<IMainProps> = ({ photosList, getPhotosByPage}) => {
    const { handleModal } = useContext(ModalContext)
    const [currentPageState, setCurrentPageState] = usePages();
    const [photosListState, setPhotosListState] = useState<photosStateType[] | []>([]);
    useEffect(() => {
        getPhotosByPage(CalcPhotosAvailableCount(), currentPageState);
    }, [currentPageState])

    useEffect(() => {
        // заполнение локального стейта, при получение данных с сервера
        if (photosList.length > 0) {
            setPhotosListState(photosList);
        }
    }, [photosList])

    return (
        <div className="image-list-container" id="image-list-container">
            <div className="photos-wrapper">{
                photosListState.length != 0 ?
                    photosListState.map((elem: photosStateType) =>
                        <div className="single-photo-wrapper" key={elem.id}  >
                            <img src={elem.thumbnailUrl} alt="photo" onClick={() => handleModal(<PhotosModalContent imageUrl={elem.url} imageId={elem.id} />)} />
                           
                        </div>
                    )
                    : null
            }</div>
        </div>
    );
};


const mapStateToProps = (state: any) => {
    return {
        photosList: state.photosList,
    };
};

const mapDispatchToProps = {
    getPhotosByPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagesList);

