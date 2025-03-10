import styles from "../styles/ComponentsStyle.css"
import React from "react"
import { Link } from "react-router-dom"


export const Menu = () => {
    return (
        <div className="functional_menu" style={styles.functional_menu}>
            <Link to={"/login"} className="to_login menu_button">Войти</Link>
            <Link to={"/main"} className="to_main menu_button">Главная</Link>
            <Link to={"/profile"} className="to_my_video menu_button">Мои видео</Link>
        </div>
    )
}