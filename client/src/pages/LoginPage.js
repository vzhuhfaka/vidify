import styles from "../styles/LoginPageStyle.css"
import React from "react";
import { Menu } from "../components/DirectionMenu"

export const LoginPage = () => {
    return (
        <div className="login_page" style={styles.main_page}>
            <form method="post" action={""} className="login_form">
                <input className="input" placeholder="Введите логин"/>
                <input className="input" placeholder="Введите пароль"/>
                <input className="submit_button" type="submit" value={"Войти"}/>
            </form>

            {<Menu/>}
        </div>
    )
}