import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createRootReducer from "../Reducers/Reducers.js";

export const history = createBrowserHistory();

const store = createStore(
    createRootReducer(history),
    composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
);

export { store as appStore };
        