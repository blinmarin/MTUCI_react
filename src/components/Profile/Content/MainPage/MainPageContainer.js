import MainPage from "./MainPage";
import { connect } from "react-redux";
import { MainPageReducerAC } from "../../../../store/MainPageReducer";

let mapStateToProps = (state) =>{
    return{
        Cards: state.MainPage
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        SetCards: (data) =>{
            dispatch(MainPageReducerAC(data))
        }
    }
}


const MainPageContainer = connect(mapStateToProps, mapDispatchToProps)(MainPage)
export default MainPageContainer