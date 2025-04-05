import styles from "../styles/ComponentsStyle.css"
import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook.js"

export const Menu = () => {
    const { isAuthenticated, logout, userId } = useContext(AuthContext)
    const [username, setUsername] = useState(null)
    const {request} = useHttp()

    const getUser = async () => {
        try{
            const got_username = await request("api/user/" + userId)
            setUsername(got_username['username'])
        } catch (e) {
            console.log('error: ', e)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="functional_menu" style={styles.functional_menu}>
            {isAuthenticated ? <button className="menu_button" onClick={logout}>Выйти: {username}</button> : <Link to={"/login"} className="to_login menu_button">Войти</Link>}
            <Link to={"/main"} className="to_main menu_button">Главная</Link>
            <Link to={"/profile"} className="to_my_video menu_button">Мои видео</Link>
        </div>
    )
}