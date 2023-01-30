import style from './New_password.module.css';
import { useState } from 'react';




function New_password() {

    const [email, setEmail] = useState("");
    

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
                        <input type="text" placeholder="Email"
                        onChange = {(e) => setEmail(e.target.value)}></input>
                    </div>

                    </div>

                    <div className={style.button}>
                        <button onClick={new_password}>Отправить</button>
                    </div>


                
            </div>
            </main>
        </div>);
}

export default New_password