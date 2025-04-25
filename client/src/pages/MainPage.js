import styles from "../styles/MainPageStyle.css"
import React, { useEffect, useState } from "react";
import { Menu } from "../components/DirectionMenu"
import { useHttp } from "../hooks/http.hook.js"
import { Link } from "react-router-dom"
import { previewUrl, videoUrl } from "../utils.js";


export const MainPage = () => {
    const {request} = useHttp()
    const [data, setData] = useState([])

    // Получаем все видео с сервера
    const getVideos = async () => {
        try{
            const videodata = await request('/api/v3/all-video', 'GET')
            setData(videodata['videos'])

        } catch (e) {
            console.log('getVideos | error: ', e)
        }
    }

    useEffect(() => {
        getVideos()
    }, [])

    const VideoList = () => (
        <div className="all_videos">
            {data.length > 0 ? (
                data.map((video, index) => (
                    <div className="item" key={index}>
                        <Link to={videoUrl(video['id'])}>
                            <img alt="preview" className="preview" src={previewUrl(video['preview'])}/>
                        </Link>
                        <div className="about_video">
                            <div className="title">{video['title']}</div>
                            <div className="author">Автор: {video['username']}</div>
                            <div className="description">{video['description']}</div>
                            <div className="stats">
                                <span className="likes">❤️ {video['likes']}</span>
                                <span className="views">👁️ {video['views']}</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="loading">Загрузка данных...</div>
            )}
        </div> 
    )

    return (
        <div className="main_page">
            <VideoList />
            {<Menu/>}
        </div>
    )
}