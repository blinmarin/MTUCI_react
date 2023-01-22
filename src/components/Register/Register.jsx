import { NavLink } from 'react-router-dom';
import style from './Register.module.css';

function Register() {
    return (
        <div className="Reg">
            <main>
            <div className={style.container}>
                <div className={style.title}>
                    Регистрация
                </div>
                <div className={style.fields}>
                    <div className={style.field}>
                        <input type="text" placeholder="Логин"></input>    
                    </div>

                    <div className={style.field}>
                        <input type="text" placeholder="Пароль"></input>
                    </div>

                    <div className={style.field}>
                        <input type="text" placeholder="Email"></input>
                    </div>

                    </div>

                    <div className={style.button}>
                        <input type="radio" id="button"></input>
                        <label htmlFor="button">OK</label>
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