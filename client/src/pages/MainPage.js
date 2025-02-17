import { Link } from "react-router-dom";
import styles from "../styles/MainPageStyle.css"
import React from "react";

export const MainPage = () => {
    return (
        <div className="main_page" style={styles.main_page}>
            <div className="all_videos" style={styles.all_videos}>
                <div></div>
            </div>

            <div className="fake_menu" /*
            для того чтобы блок с видео не накладывался на меню
            */ style={styles.fake_menu}></div>
            
            <div className="functional_menu" style={styles.functional_menu}>
                <Link to={"/login"} className="to_login menu_button">Войти</Link>
                <Link to={"/main"} className="to_main menu_button">Главная</Link>
                <Link to={"/profile"} className="to_my_video menu_button">Мои видео</Link>
                <Link to={"/history"} className="to_history menu_button">История</Link>
            </div>
        </div>
    )
}