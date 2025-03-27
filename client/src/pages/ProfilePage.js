import React from "react";
import styles from "../styles/ProfilePageStyle.css"
import { Menu } from "../components/DirectionMenu"
import { Link } from "react-router-dom"


export const ProfilePage = () => {
    return (
        <div className="profile_page" style={styles.main_page}>
            <Link to={"/profile/add-video"} className="button_add">Добавить новую запись</Link>

            <div className="my_videos" style={styles.all_videos}>
                <div className="video">example</div>
                <div className="video">example 2</div>
                <div className="video">example 3</div>
            </div>

            {<Menu/>}
        </div>
    )
}