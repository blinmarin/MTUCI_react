import { NavLink } from 'react-router-dom';
import style from './Login.module.css';

function Login() {
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
                        <input type="radio" id="button"></input>
                        <label htmlFor="button">Войти</label>
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