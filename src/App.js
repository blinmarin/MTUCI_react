import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import New_password from './components/Forgot/New_password';
import Login from './components/Login/Login';
import Register from './components/Register/Register';


const App = () => {
  return (
    


    <div className='App'>
      
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="new_password" element={<New_password />} />
        <Route path="register" element={<Register />} />
      </Routes>


    </div>

  );
}



export default App;
