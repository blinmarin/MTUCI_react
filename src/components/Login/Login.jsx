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
        let result = fetch("https://mtuci-backend.swedencentral.cloudapp.azure.com/auth/login", {
            mode: 'no-cors',
            method: 'POST',
            /*Header: 'accept: application/json',
            Header: 'Content-Type: application/json',*/
          
            headers:{
                'accept' : 'application/json',
                'Content-Type' : 'application/json'},
                
            body: {
                "username": "mbortnikova@yandex.ru",
                "password":  "WBNJVEDR"}
        });
        
        alert(result)
        localStorage.setItem("user-info", JSON.stringify(result))
        alert("add")
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