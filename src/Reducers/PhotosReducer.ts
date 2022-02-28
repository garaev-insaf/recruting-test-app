const PhotosListReducer = (photosList = [], action) => {
    switch (action.type) {
        case "GET_PHOTOS":
            console.log(action.photosList.data)
            return action.photosList.data;
        default:
            return photosList;
    }
};

const initialState = {
    filter: false
}
const FilterStatusReducer = (state = initialState, action) => {
	switch (action.type) {
		case "FILTER_STATUS_ENABLE":
			return {...state, filter: true};
		case "FILTER_STATUS_DISABLE":
			return {...state, filter: false};
		default:
			return state;
	}
};


export { PhotosListReducer, FilterStatusReducer }