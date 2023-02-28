import { NavLink, useNavigate } from 'react-router-dom';
import React, { Component } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import style from './Login.module.css';
import { fetchToken, setToken } from '../Auth';
import ErrorMessage from '../ErrorMessage';
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'
import 'boxicons/css/boxicons.min.css'


function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState("Обязательное поле")
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState("Обязательное поле")
    const [formValid, setFormValid] = useState(false)
    const [loadind, setLoading] = useState(false)

    useEffect(() => {
        if (emailError || errorMessage || passwordError || loadind) {
            setFormValid(false)

        } else {
            setFormValid(true)
        }

    }, [emailError, errorMessage, passwordError, loadind])


    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email')
        } else {
            setEmailError('')
            setErrorMessage('')

        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (!e.target.value) {
            setPasswordError('Введите пароль')
        }
        else {
            setPasswordError('')
            setErrorMessage('')

        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }






    const navigate = useNavigate();

    async function login() {

        setLoading(true)

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
                    } else {
                        localStorage.removeItem('Tokenchik')
                    }
                    console.log(fetchToken())
                    console.log('Got!', data);
                    setErrorMessage(data.message)
                    localStorage.setItem("user-info", JSON.stringify(data))
                    setLoading(false)
                }
            })
            .catch(error => {
                console.error('There was an error!', error.toString());
            });
    }

    //eye
    const [type, setType] = useState('password')
    const [icon, setIcon] = useState(eyeOff)

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
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
                            <input
                                onChange={(e) => emailHandler(e)}
                                value={email}
                                onBlur={e => blurHandler(e)}
                                type="text"
                                placeholder="Email"
                                name='email'></input>

                        </div>

                        {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}

                    </div>

                    <div className={style.lastField}>
                        <input
                            onChange={(e) => passwordHandler(e)}
                            value={password}
                            onBlur={e => blurHandler(e)}
                            type={type}
                            placeholder="Пароль"
                            name='password'></input>

                        <span onClick={handleToggle}><Icon icon={icon} size={25} /></span>
                    </div>

                    {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}

                    {(passwordDirty && errorMessage) && <ErrorMessage message={errorMessage} />}

                    <div>
                        <button
                            className={style.button}
                            disabled={!formValid}
                            onClick={login}
                            placeholder="Войти">
                            
                            {(loadind) && <i className="bx bx-loader-alt bx-spin"></i>}
                            {(!loadind) && <div>Войти</div>}
                        </button>

                        
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