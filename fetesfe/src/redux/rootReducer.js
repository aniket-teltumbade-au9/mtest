import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";

export let rootReducer = combineReducers({ 
    authState: authReducer,
    prodState:categoryReducer
 })
