import styles from "../styles/ComponentsStyle.css"
import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"


export const Menu = () => {
    const { isAuthenticated, logout } = useContext(AuthContext)

    return (
        <div className="functional_menu" style={styles.functional_menu}>
            {isAuthenticated ? <button className="menu_button" onClick={logout}> Выйти: {localStorage.getItem('username')} </button> : <Link to={"/login"} className="to_login menu_button">Войти</Link>}
            <Link to={"/main"} className="to_main menu_button">Главная</Link>
            <Link to={"/profile"} className="to_my_video menu_button">Мои видео</Link>
        </div>
    )
}