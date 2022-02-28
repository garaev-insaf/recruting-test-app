import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { History } from "history";
import { LoadingReducer } from "./LoadingReducer";
import { PhotosListReducer } from "./PhotosReducer";

const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		loadingStatus: LoadingReducer,
		photosList: PhotosListReducer,
	});

export default createRootReducer;
