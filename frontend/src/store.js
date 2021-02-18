import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  lectureListReducer,
  lectureDetailsReducer,
} from "./reducers/lectureReducers.js";

const reducer = combineReducers({
  lectureList: lectureListReducer,
  lectureDetails: lectureDetailsReducer,
});
const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
