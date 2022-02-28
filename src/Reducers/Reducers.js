import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { History } from "history";

const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
	});

export default createRootReducer;
