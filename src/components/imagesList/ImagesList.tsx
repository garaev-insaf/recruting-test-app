import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { getPhotosByPage } from "../../Actions/PhotosAction";
import { ModalContext } from "../modal/modalContext/ModalContext";
import PhotosModalContent from "../modal/photosModalContent/PhotosModalContent";
import { CalcPhotosAvailableCount } from "../scripts/CalcPhotosAvailableCount";
import './styles/ImagesList.sass'
interface IMainProps {
    photosList: photosStateType[] | [],
    getPhotosByPage(limit: number): Promise<void>,
}

type photosStateType = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}

const ImagesList: React.FC<IMainProps> = ({ photosList, getPhotosByPage }) => {
    const { handleModal } = useContext(ModalContext)
    const [currentPageState, setCurrentPageState] = useState(1);
    const [photosListState, setPhotosListState] = useState<photosStateType[] | []>([]);
    useEffect(() => {
        getPhotosByPage(CalcPhotosAvailableCount());
    }, [])

    useEffect(() => {
        // заполнение локального стейта, при получение данных с сервера
        if (photosList.length > 0) {
            setPhotosListState(photosList);
        }
    }, [photosList])
    console.log(photosListState);
    return (
        <div className="image-list-container" id="image-list-container">
            <div className="photos-wrapper">{
                photosListState.length != 0 ?
                    photosListState.map((elem: photosStateType) =>
                        <div className="photo-wrapper" key={elem.id} onClick={() => handleModal(<PhotosModalContent imageUrl={elem.url} />)} ><img src={elem.thumbnailUrl} alt="photo" /></div>
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

