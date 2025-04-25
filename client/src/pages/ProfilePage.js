import React, { useState, useEffect } from "react";
import styles from "../styles/ProfilePageStyle.css"
import { Menu } from "../components/DirectionMenu"
import { Link } from "react-router-dom"
import { useHttp } from "../hooks/http.hook.js"
import { previewUrl, videoUrl } from "../utils.js";


export const ProfilePage = () => {
    const [data, setData] = useState([])
    const [IdForDelete, setIdForDelete] = useState(null)
    const {request} = useHttp()

    const getVideos = async () => {
        try{
            const userId = localStorage.getItem('userId')
            const getData = await request('/api/v3/all-user-video/' + userId)
            setData(getData['user_videos'])
        } catch (e) {
            console.log('error: ', e)
        }
    }
    
    const deleteVideo = async (id) => {
        try{
            if (id){
                const deleted = await request('/api/v3/video-by-id/' + id, 'DELETE')
                console.log(deleted)
                window.location.reload()
            }

        } catch (e) {
            console.log('error: ', e)
        }
    }

    const setDeleteVideo = event => {
        setIdForDelete(event.target.id)
    }

    useEffect(() => {
        deleteVideo(IdForDelete)
    }, [IdForDelete])

    // Получаем все видео авторизованного с сервера
    useEffect(() => {
        getVideos()
    }, [])
    
    const VideoList = () => (
        <div className="my_videos">
            {data.length > 0 ? (
                data.map((video, index) => (
                    <div className="item" key={index}>
                        <Link to={videoUrl(video['id'])}>
                            <img alt="preview" className="preview" src={previewUrl(video['preview'])}/>
                        </Link>
                        <div className="about_video">
                            <div className="title">{video['title']}</div>
                            <div className="description">{video['description']}</div>
                            <div className="stats">
                                <span>❤️ {video['likes']}</span>
                                <span>👁️ {video['views']}</span>
                            </div>
                            <button 
                                className="delete_video" 
                                id={video['id']} 
                                onClick={setDeleteVideo}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="loading">У вас пока нет видео</div>
            )}
        </div>
    )

    return (
        <div className="profile_page">
            <Link to={"/profile/add-video"} className="button_add">
                Добавить новое видео
            </Link>

            <VideoList />

            <Menu />
        </div>
    )
}