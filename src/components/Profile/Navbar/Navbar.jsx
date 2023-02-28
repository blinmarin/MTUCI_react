import React from "react"
import style from "./Navbar.module.css"
import { NavLink} from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className={style.navbar}>
            <div className={style.item}>
                <NavLink to="/profile/main" className = { navData => navData.isActive ? style.active : style.link}>
                    Главная
                </NavLink>
            </div>
            <div className={style.item}>
                <NavLink to="/profile/applications" className = { navData => navData.isActive ? style.active : style.link}>
                    Мои заявки
                </NavLink>
            </div>
            <div className={style.item}>
                <NavLink to="/profile/students" className = { navData => navData.isActive ? style.active : style.link}>
                    Все студенты
                </NavLink>
            </div>
            <div className={style.item}>
                <NavLink to="/profile/instruction" className = { navData => navData.isActive ? style.active : style.link}>
                    Инструкция
                </NavLink>
            </div>


        </nav>
    )

}

export default Navbar