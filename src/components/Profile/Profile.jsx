import { Routes, Route } from "react-router-dom";
import AllStudents from './Content/AllStudentPage/AllStudentPage'
import MainPageContainer from "./Content/MainPage/MainPageContainer";
import Instruction from "./Content/InstructionPage/InstructionPage";
import MyApplications from './Content/MyApplicationsPage/MyApplicationPage'
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import "./Profile.css";


const Profile = (props) => {

    return (
        <div className="profile">
            <Header />
            <Navbar />
            <div className="content"> 
                <Routes>
                    <Route path="/*" element={<MainPageContainer store = {props.store}/>} />
                    <Route path="/main" element={<MainPageContainer store = {props.store}/>} />
                    <Route path="/applications" element={<MyApplications />} />
                    <Route path="/students" element={<AllStudents />} />
                    <Route path="/instruction" element={<Instruction />} />

                </Routes>
            </div>
        </div>);
}

export default Profile