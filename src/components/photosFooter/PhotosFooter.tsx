import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { usePages } from "../photosContext/PagesContext";
import { CalcPagesCountOfPhotos } from "../scripts/CalcPagesCountOfPhotos";
import './styles/PhotosFooter.sass'


const PhotosFooter: React.FC = () => {
    const setPageRef = useRef(null);
    const [currentPageState, setCurrentPageState] = usePages();
    const [maxPageState, setMaxPageState] = useState(0)

    useEffect(() => {
        // после прорисовки dom'a присваиваем значения для состояния навигациионной панели футера
        if (maxPageState === 0) {
            setMaxPageState(CalcPagesCountOfPhotos())
        }

    }, [])
    const setPageHandler = (event: any) => {
        const value = event.target.innerHTML;
        if (Number(value) >= 1 && Number(value) <= maxPageState) {
            setCurrentPageState(value);
        }
    }

    useEffect(() => {
        // вешаем ref на весь список и с помощью делегирования событий обрабатываем клики по цифрам
        if (setPageRef && setPageRef.current) {
            setPageRef.current.addEventListener('click', setPageHandler)
        }

        return () => {
            setPageRef.current.removeEventListener('click', setPageHandler)
        }
    })

    const slidePageHandler = (action: boolean) => {
        // переключение по страницам с помощью кнопок "вперед, назад"
        if (!action && currentPageState > 1) {
            setCurrentPageState(Number(currentPageState) - 1);
        }
        else if (action && currentPageState < maxPageState) {
            setCurrentPageState(Number(currentPageState) + 1);
        }
    }
    return (
        <footer className="footer_photos-footer">
            <div className="pages-counts">
                <ul className="pages-list" ref={setPageRef}>
                    <li className="pages-list__item left-arrow-button"><button className="button_left-arrow" onClick={() => slidePageHandler(false)}>Назад</button></li>
                    {/* Данный вывод подточен только для тех случаев, когда кол-во страниц больше 2
                        не стал заморачиваться над логикой отображения страниц
                        *Временное решение*
                    */}
                    {
                        Number(currentPageState) === 1 || Number(currentPageState) === 2 ?
                            <>
                                <li className="pages-list__item current">{Number(currentPageState)}</li>
                                <li className="pages-list__item">{Number(currentPageState) + 1}</li>
                                <li className="pages-list__item disabled">...</li> {/* не реализована логика при клике на данный объект */}
                                <li className="pages-list__item">{maxPageState}</li>
                            </> : maxPageState - Number(currentPageState) >= 2 ?
                                <>

                                    <li className="pages-list__item">1</li>
                                    <li className="pages-list__item disabled">...</li>
                                    <li className="pages-list__item">{Number(currentPageState) - 1}</li>
                                    <li className="pages-list__item current">{Number(currentPageState)}</li>
                                    <li className="pages-list__item">{Number(currentPageState) + 1}</li>
                                    <li className="pages-list__item disabled">...</li> {/* не реализована логика при клике на данный объект */}
                                    <li className="pages-list__item">{maxPageState}</li>
                                </>
                                : maxPageState - Number(currentPageState) == 1 ?
                                    <>
                                        <li className="pages-list__item">1</li>
                                        <li className="pages-list__item disabled">...</li>
                                        <li className="pages-list__item">{Number(currentPageState) - 1}</li>
                                        <li className="pages-list__item current">{Number(currentPageState)}</li>
                                        <li className="pages-list__item">{maxPageState}</li>
                                    </> :
                                    <>
                                        <li className="pages-list__item">1</li>
                                        <li className="pages-list__item disabled">...</li>
                                        <li className="pages-list__item">{Number(currentPageState) - 1}</li>
                                        <li className="pages-list__item current">{maxPageState}</li>
                                    </>

                    }
                    <li className="pages-list__item button"><button className="button_right-arrow" onClick={() => slidePageHandler(true)}>Вперёд</button></li>
                </ul>
            </div>
        </footer>
    );
};

export default PhotosFooter;

