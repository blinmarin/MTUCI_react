import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import style from './Login.module.css';
import { fetchToken, setToken } from '../Auth';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function login() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": email,
                "password": password
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
                    if (data.access_token) {
                        setToken(data.access_token)
                        navigate('/profile')
                    }

                    else {
                        localStorage.removeItem('Tokenchik')
                    }
                    console.log(fetchToken())
                    console.log('Got!', data);
                    localStorage.setItem("user-info", JSON.stringify(data))
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
                            <input type="text" placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}></input>

                        </div>
                        <div className={style.field}>
                            <input type="password" placeholder="Пароль"
                                onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                    </div>
                    <div className={style.button}>
                        <button onClick={login}>Войти</button>
                    </div>
                    <div className={style.link}>
                        <NavLink to="/new_password">
                            Забыли пароль?
                        </NavLink>
                    </div>
                    <div className={style.link2}>
                        <NavLink to="/register">
                            Зарегистрироваться
                        </NavLink>
                    </div>

                </div>
            </main>
        </div>);
}

export default Login