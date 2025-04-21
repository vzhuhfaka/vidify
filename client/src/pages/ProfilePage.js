import React, { useState, useEffect } from "react";
import styles from "../styles/ProfilePageStyle.css"
import { Menu } from "../components/DirectionMenu"
import { Link } from "react-router-dom"
import { useHttp } from "../hooks/http.hook.js"

export const ProfilePage = () => {
    const [data, setData] = useState([])
    const [IdForDelete, setIdForDelete] = useState(null)
    const {request} = useHttp()

    const getVideos = async () => {
        try{
            const gotData = await request('/api/v1/video/6')
            setData(gotData['user_videos'])
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

    const deleteVideo = async (id) => {
        try{
            if (id){
                const deleted = await request('/api/video/' + id, 'DELETE')
                console.log(deleted)
                window.location.reload()
            }
            
        } catch (e) {
            console.log('error: ', e)
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
                        <div className="description">описание: {video['description']}</div>
                        <div className="likes">лайков: {video['likes']}</div>
                        <div className="views">просмотров: {video['views']}</div>
                        <button className="delete_video" id={video['id']} onClick={setDeleteVideo}>Удалить </button>
                    </div>
                </div>
            ))
            ) : (
                <div>Загрузка данных...</div>
            )}
        </div>
    )

    return (
        <div className="profile_page" style={styles.main_page}>
            <Link to={"/profile/add-video"} className="button_add">Добавить новую запись</Link>

            <div className="my_videos" style={styles.all_videos}>
                <UsingArrayMap />
            </div>

            {<Menu/>}
        </div>
    )
}