import {chefListReducer, categoryListReducer, timerReducer} from "./adminReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    chefListReducer,
    categoryListReducer,
    timerReducer
})

export default rootReducer;