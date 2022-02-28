import axios from "axios";

export const deletePhotoAction = (id: number) => {
    return async (dispatch) => {
        dispatch({
            type: "SHOW_LOADER",
        });
        await axios
            .delete(`http://jsonplaceholder.typicode.com/photos/${id}`)
            .then((result) => {
                alert(`Идентификатор фото: ${id} Статус: ${result.status}`);
                dispatch({
                    type: "HIDE_LOADER",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const getPhotosByPage = (limit: number, currentPage: number) => {
    return async (dispatch) => {
        dispatch({
            type: "SHOW_LOADER",
        });
        await axios
            .get(`https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${limit}`)
            .then((photosList) => {
                dispatch({
                    type: "GET_PHOTOS",
                    photosList,
                });
                dispatch({
                    type: "HIDE_LOADER",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};