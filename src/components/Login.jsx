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
                    <button className="button">Войти</button>
                </div>
                <div className={style.link}>
                    <a>
                    Забыли пароль?
                </a>
                </div>
                <div className={style.link2}>
                    <a>
                    Зарегистрироваться
                </a>
                </div>
                
            </div>
            </main>
        </div>);
}

export default Login