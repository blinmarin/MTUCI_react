import style from './New_password.module.css';

function New_password() {
    return (
        <div className="New">
            <main>
            <div className={style.container}>
                <div className={style.title}>
                Восстановить пароль
                </div>
                <div className={style.fields}>


                    <div className={style.field}>
                        <input type="text" placeholder="Email"></input>
                    </div>

                    </div>

                    <div className={style.button}>
                        <input type="radio" id="button"></input>
                        <label htmlFor="button">Продолжить</label>
                    </div>


                
            </div>
            </main>
        </div>);
}

export default New_password