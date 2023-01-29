import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import style from './Login.module.css';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function login2() {
        console.warn(email,password)
        let item={email,password};
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": "mbortnikova@yandex.ru",
                "password":  "WBNJVEDR"
                 })
        };
        fetch('https://mtuci-backend.swedencentral.cloudapp.azure.com/auth/login', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    console.log('Got!', data);
                    localStorage.setItem("user-info", JSON.stringify(data))
                    navigate('/profile');
                }
    
            })
            .catch(error => {
                console.error('There was an error!', error.toString());
            });
          
    }

    return (
        <div className="Log">
            <main>
                <div className={style.container}>
                    <div className={style.title}>
                        Вход
                    </div>
                    <div className={style.fields}>
                        <div className={style.field}>
                            <input type="text" placeholder="Логин"></input>

                        </div>
                        <div className={style.field}>
                            <input type="text" placeholder="Пароль"></input>
                        </div>
                    </div>
                    <div className={style.button}>
                        <button onClick={login2}>Войти</button>
                    </div>
                    <div className={style.link}>
                        <NavLink to = "/new_password">
                            Забыли пароль?
                        </NavLink>
                    </div>
                    <div className={style.link2}>
                        <NavLink to = "/register">
                            Зарегистрироваться
                        </NavLink>
                    </div>

                </div>
            </main>
        </div>);
}

export default Login