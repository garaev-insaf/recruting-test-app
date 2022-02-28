import * as React from "react";
import { useDispatch } from 'react-redux'
import { ModalContext } from "../modalContext/ModalContext"
import { deletePhotoAction } from "../../../Actions/PhotosAction";
import './styles/PhotosModalContent.sass'
interface IMainProps {
    imageUrl: string,
    imageId: number,
}

const PhotosModalContent: React.FC<IMainProps> = ({ imageUrl, imageId }) => {
    let { handleModal} = React.useContext(ModalContext);
    const dispatch = useDispatch();
    const deletePhoto = (id: number) => {
        dispatch(deletePhotoAction(id));
        handleModal();
    }

    return (
        <>
            <img className="modal-image" src={imageUrl} alt="" />
            <button className="button_delete-image" onClick={() => deletePhoto(imageId)}>удалить {imageId}</button>
        </>
    );
};

export default PhotosModalContent;

