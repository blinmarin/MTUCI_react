import style from './New_password.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import ErrorMessage from '../ErrorMessage';




function New_password() {

    const [email, setEmail] = useState("");
    const [emailDirty, setEmailDirty] = useState(false)
    const [emailError, setEmailError] = useState("Обязательное поле")
    const [errorMessage, setErrorMessage] = useState("");
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (emailError || errorMessage) {
            setFormValid(false)

        } else {
            setFormValid(true)
        }

    }, [emailError, errorMessage])


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


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
        }
    }





    async function new_password() {
        console.warn(email)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email
            })
        };


        fetch('https://mtuci-backend.swedencentral.cloudapp.azure.com/auth/recover', requestOptions)
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
                    setErrorMessage(data)
                    localStorage.setItem("user-info", JSON.stringify(data))
                }

            })
            .catch(error => {
                console.error('There was an error!', error.toString());
            });

    }

    return (
        <div className="New">
            <main>
                <div className={style.container}>
                    <div className={style.title}>
                        Восстановить пароль
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

                            {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}

                            <ErrorMessage message={errorMessage} />
                        </div>
                    </div>
                    <div >
                        <button className={style.button} disabled={!formValid} onClick={new_password}>Отправить</button>
                    </div>
                </div>
            </main>
        </div>);
}

export default New_password