import axios from "axios";

export const deletePhoto = () => {
    axios
        .delete("http://jsonplaceholder.typicode.com/photos/1")
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getPhotosByPage = (limit: number) => {
    return async (dispatch) => {
        await axios
            .get(`https://jsonplaceholder.typicode.com/photos?_page=1&_limit=${limit}`)
            .then((photosList) => {
                dispatch({
                    type: "GET_PHOTOS",
                    photosList,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};