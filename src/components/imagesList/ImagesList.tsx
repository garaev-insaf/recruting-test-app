import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { deletePhotoAction, getFilteredPhotosByPage, getPhotosByPage } from "../../Actions/PhotosAction";
import { ModalContext } from "../modal/modalContext/ModalContext";
import PhotosModalContent from "../modal/photosModalContent/PhotosModalContent";
import { usePages } from "../photosContext/PagesContext";
import { CalcPhotosAvailableCount } from "../scripts/CalcPhotosAvailableCount";
import './styles/ImagesList.sass'
interface IMainProps {

    photosList: photosStateType[] | [],
    getPhotosByPage(limit: number, currentPage: number): Promise<void>,
    getFilteredPhotosByPage(limit: number, currentPage: number, albumId: number): Promise<void>,
    filterStatus: {
        filter: boolean
    },
}

type photosStateType = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}

const ImagesList: React.FC<IMainProps> = ({ photosList, getPhotosByPage, filterStatus, getFilteredPhotosByPage }) => {
    const { handleModal } = useContext(ModalContext)
    const [currentPageState, setCurrentPageState] = usePages();
    const [photosListState, setPhotosListState] = useState<photosStateType[] | []>([]);
    console.log(currentPageState);
    useEffect(() => {
        if (!filterStatus.filter) {
            getPhotosByPage(CalcPhotosAvailableCount(), currentPageState.currentPage);
        }
        else {
            getFilteredPhotosByPage(CalcPhotosAvailableCount(), currentPageState.currentPage, currentPageState.albumId)
        }
    }, [currentPageState.currentPage])

    useEffect(() => {
        // заполнение локального стейта, при получение данных с сервера
        if (photosList.length > 0) {
            setPhotosListState(photosList);
            if (currentPageState.endOfAlbum) {
                setCurrentPageState({ ...currentPageState, endOfAlbum: false })
            }
        }
        else {
            setCurrentPageState({ ...currentPageState, endOfAlbum: true })
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
        filterStatus: state.searchFilter,
    };
};

const mapDispatchToProps = {
    getPhotosByPage,
    getFilteredPhotosByPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagesList);

