import React from "react";
import { combineReducers, legacy_createStore } from "redux";
import MainPageReducer from "./MainPageReducer";

let reducers = combineReducers({
    MainPage: MainPageReducer
})

const store = legacy_createStore(reducers)
export default store