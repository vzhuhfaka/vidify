import React from "react";
import styles from "../styles/MainPageStyle.css"
import { Menu } from "../components/DirectionMenu"


export const ProfilePage = () => {
    return (
        <div className="profile_page" style={styles.main_page}>
            <div className="" style={styles.all_videos}>
                <div></div>
            </div>

            {<Menu/>}
        </div>
    )
}