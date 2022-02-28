const PHOTO_SIZE = 150;

export const CalcPhotosAvailableCount = () => {
    // рассчитываем кол-во вмещаемых объектов, исходя из ширины и высоты блока, зная размер картинки
    const actualBlock = document.getElementById('image-list-container');
    const photosByHeight: number = Math.floor(actualBlock?.offsetHeight / PHOTO_SIZE);
    const photosByWidth: number = Math.floor(actualBlock?.offsetWidth / PHOTO_SIZE);
    return (photosByHeight * photosByWidth);
} 