import { CalcPhotosAvailableCount } from "./CalcPhotosAvailableCount";


export const CalcPagesCountOfPhotos = () => {
    // решение топорное, и было бы верным вынести значение отображаемых фотографий с помощью контекста
    // это временное решение
    return Math.ceil(5000 / CalcPhotosAvailableCount())
}
