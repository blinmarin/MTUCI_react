import { Route, Routes } from 'react-router-dom';
import './App.css';
import NewPassword from './components/RegLog/NewPassword/NewPassword';
import Login from './components/RegLog/Login/Login';
import Profile from './components/Profile/Profile';
import Register from './components/RegLog/Register/Register';
import { RequireToken } from './components/RegLog/Auth';


const App = (props) => {
  return (

    <div className='App'>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="new_password" element={<NewPassword />} />
        <Route path="register" element={<Register />} />
        <Route path="profile/*"
          element={
            <RequireToken>
              <Profile store = {props.store} />
            </RequireToken>} />
      </Routes>

    </div>
  );
}



export default App;