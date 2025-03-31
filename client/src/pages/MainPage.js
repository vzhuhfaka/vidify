import styles from "../styles/MainPageStyle.css"
import React, { use, useEffect, useState } from "react";
import { Menu } from "../components/DirectionMenu"
import { useHttp } from "../hooks/http.hook.js"

export const MainPage = () => {
    const {request} = useHttp()
    const [data, setData] = useState([])
    const [users, setUsers] = useState([])
    
    const getVideos = async () => {
        try{
            const videodata = await request('/api/video', 'GET')
            setData(videodata['videos'])
            setUsers(videodata['users'])
        } catch (e) {
            console.log('getVideos | error: ', e)
        }
    }

    useEffect(() => {
        getVideos()
    }, [])

    const previewUrl = (url) => {
        return "http://localhost:8000/media/" + url
    }
    
    const UsingArrayMap = () => (
        <div>
            {data.length > 0 ? (
            data.map((video, index) => (
                <div className="item" style={styles} key={index}>
                    <img className="preview" src={previewUrl(video['preview'])}/>
                    <div className="about_video">
                        <div className="title">название: {video['title']}</div>
                        <div className="author">автор: {users[video['user']]}</div>
                        <div className="description">описание: {video['description']}</div>
                        <div className="likes">лайков: {video['likes']}</div>
                        <div className="views">просмотров: {video['views']}</div>
                    </div>
                </div>
            ))
            ) : (
                <div>Загрузка данных...</div>
            )}
        </div> 
    )

    return (
        <div className="main_page" style={styles.main_page}>
            <div className="all_videos" style={styles.all_videos}>
                <UsingArrayMap />
            </div>
 
            {<Menu/>}
        </div>
    )
}