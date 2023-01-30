import { NavLink, useNavigate } from 'react-router-dom';
import style from './Register.module.css';
import { useState } from 'react';


function Register() {

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [id_card, setId_card] = useState("");


    const navigate = useNavigate();

    async function register() {
        console.warn(fullname,email,id_card)
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "fullname": fullname,
                "email": email,
                "id_card": id_card,
                 })
        };

        
        fetch('https://mtuci-backend.swedencentral.cloudapp.azure.com/auth/signup', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //console.log(data)
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    
                    return Promise.reject(error);
                } else {
                    console.log('Got!', data);
                    localStorage.setItem("user-info", JSON.stringify(data))
                    //navigate('/login');
                }
    
            })
            .catch(error => {
                console.error('There was an error!', error.toString());
            });
          
    }



    return (
        <div className="Reg">
            <main>
            <div className={style.container}>
                <div className={style.title}>
                    Регистрация
                </div>
                <div className={style.fields}>
                    <div className={style.field}>
                        <input type="text" placeholder="ФИО"
                        onChange = {(e) => setFullname(e.target.value)}></input>    
                    </div>

                    <div className={style.field}>
                        <input type="text" placeholder="Email"
                        onChange = {(e) => setEmail(e.target.value)}></input>
                    </div>

                    <div className={style.field}>
                        <input type="text" placeholder="Группа"
                        onChange = {(e) => setId_card(e.target.value)}></input>
                    </div>

                    </div>

                    <div className={style.button}>
                        <button onClick={register}>OK</button>
                    </div>

                    <div>
                        <NavLink to = "/login" className={style.link}>
                            Пропустить
                        </NavLink>
                    </div>


                
            </div>
            </main>
        </div>);
}

export default Register