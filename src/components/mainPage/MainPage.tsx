import * as React from "react";
import ImagesList from "../imagesList/ImagesList";
import { PhotosProvider } from "../photosContext/PagesContext";
import PhotosFooter from "../photosFooter/PhotosFooter";
import PhotosHeader from "../photosHeader/PhotosHeader";
import './styles/MainPage.sass'

const MainPage: React.FC = () => {

    return (
        // возьмём только main страницы, в котором будут локальные header, main, footer
        <main className="main_main-page">
            <div className="main-page-container">
                {/* Данный контекст, используемый с связке с provider, отвечает за состояние страниц в нашем приложении
                    состояние страницы используются:
                         в PhotosFooter для навигации по страницам
                         в ImagesList для обновления данных с сервера (данные загружаются порционно, в зависимости от того какая страница у нас отображается)
                         в photosHeader для управления состоянием страниц при фильтрации
                */}
                <PhotosProvider>
                    <PhotosHeader />
                    <ImagesList />
                    <PhotosFooter />
                </PhotosProvider>
            </div>
        </main>
    );
};

export default MainPage;

