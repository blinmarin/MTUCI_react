import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import New_password from './components/Forgot/New_password';
import Login from './components/Login/Login';
import Profile from './components/Profile';
import Register from './components/Register/Register';
import { RequireToken } from './components/Auth';


const App = () => {
  return (

    <div className='App'>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="new_password" element={<New_password />} />
        <Route path="register" element={<Register />} />
        <Route path="profile"
          element={
            <RequireToken>
              <Profile />
            </RequireToken>} />
      </Routes>

    </div>
  );
}



export default App;