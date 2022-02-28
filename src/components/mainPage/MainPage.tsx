import * as React from "react";
import ImagesList from "../imagesList/ImagesList";
import PhotosFooter from "../photosFooter/PhotosFooter";
import PhotosHeader from "../photosHeader/PhotosHeader";
import './styles/MainPage.sass'

const MainPage: React.FC = () => {

    return (
        <main className="main_main-page">
            <div className="main-page-container">
                <PhotosHeader />
                <ImagesList />
                <PhotosFooter />
            </div>
        </main>
    );
};

export default MainPage;

