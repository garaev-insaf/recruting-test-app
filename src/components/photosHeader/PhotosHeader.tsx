import * as React from "react";
import { useDispatch } from "react-redux";
import { getFilteredPhotosByPage } from "../../Actions/PhotosAction";
import { usePages } from "../photosContext/PagesContext";
import { CalcPhotosAvailableCount } from "../scripts/CalcPhotosAvailableCount";
import './styles/PhotosHeader.sass'

const PhotosHeader: React.FC = () => {
    const dispatch = useDispatch();
    const [currentPageState, setCurrentPageState] = usePages();
    const [fillingArrayState, setFillingArrayState] = React.useState([]);
    const array = new Array(100);
    React.useEffect(() => {
        if (fillingArrayState.length === 0) {
            for (let index = 0; index < 100; index++) {
                array[index] = index + 1;

            }
            setFillingArrayState(array);
        }
    }, [])

    const searchByFilters = (index: number) => {
        dispatch(getFilteredPhotosByPage(CalcPhotosAvailableCount(), 1, index));
        setCurrentPageState({...currentPageState, albumId: index, currentPage: 1});
    }
    console.log(fillingArrayState)
    return (
        <header className="header_photos-header">
            <ul className="nav-list">
                {
                    fillingArrayState.length !== 0 ?
                        fillingArrayState.map((index) =>
                            <li key={index} className="nav-list__item"><input type="button" className={currentPageState.albumId === index ? 'active' : 'passive'} defaultValue={index} onClick={() => searchByFilters(index)} /></li>
                        )
                        : null
                }
            </ul>
        </header>
    );
};

export default PhotosHeader;

