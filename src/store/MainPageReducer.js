import React from "react";
const SET_CARD = 'SET-CARD'



let initialState = {
    cards: []

}

const MainPageReducer = (state=initialState, action) => {
    
    switch(action.type) {
        case SET_CARD:
            return{
                ...state,
                cards: action.data
            }
        default:
            return state
    }
    
}

export let MainPageReducerAC = (props) => ({type: SET_CARD, data: props})
export default MainPageReducer