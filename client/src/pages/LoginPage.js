import styles from "../styles/LoginPageStyle.css"
import React, { useContext, useState } from "react";
import { useHttp } from '../hooks/http.hook.js'
import { Menu } from '../components/DirectionMenu'
import { AuthContext } from "../context/AuthContext.js";

export const LoginPage = () => {
    const { login, logout, isAuthenticated } = useContext(AuthContext)
    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    const {request} = useHttp()

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/user', "POST", {...form}, {
                'Content-Type': 'application/json'
            });
            console.log(data)
        } catch (e) {
            console.error("Registration error:", e.message);
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/login', "POST", {...form}, {
                'Content-Type': 'application/json'
            });
            login(data.token, data.userId || null);
            console.log('auth | OK')
        } catch (e) {   
            console.error("Login error:", e.message);
        }
    };


    return (
        <div className="login_page" style={styles.main_page}>
            <div className="login_form">
                <input className="input" name="username" placeholder="Введите логин" onChange={changeHandler}/>
                <input className="input" name="password" type="password" placeholder="Введите пароль" onChange={changeHandler}/>
                <input className="submit_button" type="submit" value={"Войти"} onClick={loginHandler}/>
                <input className="submit_button" type="submit" value={"Регистрация"} onClick={registerHandler}/>
            </div>

            {<Menu/>}
        </div>
    )
}