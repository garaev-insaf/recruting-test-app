import * as React from "react";

interface IMainProps {
    imageUrl: string,
}

const PhotosModalContent: React.FC<IMainProps> = ({ imageUrl }) => {
    console.log(imageUrl);
    return (
        <>
            <img src={imageUrl} alt="" />
        </>
    );
};

export default PhotosModalContent;

