import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import Reducers from "../Reducers/AdminReducers";
import ModeReducers from "../Reducers/ModeReducers";

const root = combineReducers({
    admin: Reducers,
    mode: ModeReducers

})

const store = configureStore({
    reducer: root
})

export default store;
