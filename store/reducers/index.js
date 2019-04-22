import { combineReducers } from "redux";
import auth from "./authReducer";
import count from "./countReducer";

const rootReducer = combineReducers({ auth, count });

export default rootReducer;
