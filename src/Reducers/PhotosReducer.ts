const PhotosListReducer = (photosList = [], action) => {
    switch (action.type) {
        case "GET_PHOTOS":
            console.log(action.photosList.data)
            return action.photosList.data;
        default:
            return photosList;
    }
};

export { PhotosListReducer }