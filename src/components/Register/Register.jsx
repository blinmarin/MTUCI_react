import { NavLink, useNavigate } from 'react-router-dom';
import style from './Register.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import ErrorMessage from '../ErrorMessage';


function Register() {

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [id_card, setId_card] = useState("");
    const [emailDirty, setEmailDirty] = useState(false)
    const [fullnameDirty, setFullnameDirty] = useState(false)
    const [id_cardDirty, setId_cardDirty] = useState(false)
    const [emailError, setEmailError] = useState("Обязательное поле")
    const [fullnameError, setFullnameError] = useState("Обязательное поле")
    const [id_cardError, setId_cardError] = useState("Обязательное поле")
    const [errorMessage, setErrorMessage] = useState("");
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (emailError || errorMessage || fullnameError || id_cardError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, errorMessage, fullnameError, id_cardError])

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email')
            setErrorMessage('')
        } else {
            setEmailError('')
            setErrorMessage('')
        }
    }

    const fullnameHandler = (e) => {
        setFullname(e.target.value)
        if (!e.target.value) {
            setFullnameError('Введите ФИО')
        }
        else {
            setFullnameError('')
            setErrorMessage('')
        }
    }

    const id_cardHandler = (e) => {
        setId_card(e.target.value)
        if (!e.target.value) {
            setId_cardError('Введите группу')
        }
        else {
            setId_cardError('')
            setErrorMessage('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'fullname':
                setFullnameDirty(true)
                break
            case 'id_card':
                setId_cardDirty(true)
                break
        }
    }




    const navigate = useNavigate();

    async function register() {

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

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    console.log('Got!', data);

                    if (data === "Added user") {
                        setErrorMessage('Пароль отправлен на ваш email')
                    }
                    else {
                        setErrorMessage(data)
                    }
                    localStorage.setItem("user-info", JSON.stringify(data))
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
                            <input
                                onChange={(e) => fullnameHandler(e)}
                                value={fullname}
                                onBlur={e => blurHandler(e)}
                                type="text"
                                placeholder="ФИО"
                                name='fullname'></input>

                            {(fullnameDirty && fullnameError) && <div style={{ color: 'red' }}>{fullnameError}</div>}
                        </div>

                        <div className={style.field}>
                            <input
                                onChange={(e) => emailHandler(e)}
                                value={email}
                                onBlur={e => blurHandler(e)}
                                type="text"
                                placeholder="Email"
                                name='email'></input>

                            {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
                        </div>

                    </div>

                    <div className={style.lastField}>
                        <input
                            onChange={(e) => id_cardHandler(e)}
                            value={id_card}
                            onBlur={e => blurHandler(e)}
                            type="text"
                            placeholder="Группа"
                            name='id_card'></input>

                        {(id_cardDirty && id_cardError) && <div style={{ color: 'red' }}>{id_cardError}</div>}
                    </div>

                    <ErrorMessage message={errorMessage} />

                    <div >
                        <button className={style.button} disabled={!formValid} onClick={register}>OK</button>
                    </div>

                    <div>
                        <NavLink to="/login" className={style.link}>
                            Вернуться
                        </NavLink>
                    </div>
                </div>
            </main>
        </div>);
}

export default Register