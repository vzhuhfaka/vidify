import styles from "../styles/MainPageStyle.css"
import React from "react";
import { Menu } from "../components/DirectionMenu"

export const MainPage = () => {
    return (
        <div className="main_page" style={styles.main_page}>
            <div className="all_videos" style={styles.all_videos}>
                <div></div>
            </div>

            {<Menu/>}
        </div>
    )
}