import styles from "../styles/LoginPageStyle.css"
import React, { useContext, useState } from "react";
import { useHttp } from '../hooks/http.hook.js'
import { Menu } from '../components/DirectionMenu'
import { AuthContext } from "../context/AuthContext.js";

export const LoginPage = () => {
    const { login } = useContext(AuthContext)
    const {request} = useHttp()
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/v3/add-user', "POST", {...form}, {
                'Content-Type': 'application/json'
            });
            console.log(data)
        } catch (e) {
            console.error("Registration error:", e.message);
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/v3/login', "POST", {...form}, {
                'Content-Type': 'application/json'
            });
            login(data.token, data.userId || null);
            localStorage.setItem('username', data.username);
            localStorage.setItem('userId', data.userId);
            console.log('auth | OK')
        } catch (e) {   
            console.error("login error:", e.message);
        }
    };
    
    return (
        <div className="login_page">
            <div className="login_form">
                <h2>Вход в аккаунт</h2>
                <input 
                    className="input" 
                    name="username" 
                    placeholder="Введите логин" 
                    onChange={changeHandler}
                />
                <input 
                    className="input" 
                    name="password" 
                    type="password" 
                    placeholder="Введите пароль" 
                    onChange={changeHandler}
                />
                                
                <div className="buttons_container">
                    <button 
                        className="submit_button" 
                        onClick={loginHandler}
                    >
                        Войти
                    </button>
                    <button 
                        className="submit_button" 
                        onClick={registerHandler}
                    >
                        Регистрация
                    </button>
                </div>
            </div>

            <Menu />
        </div>
    )
}