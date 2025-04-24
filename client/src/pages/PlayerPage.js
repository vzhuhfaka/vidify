import React, { useState, useEffect } from "react";
import styles from "../styles/PlayerPageStyle.css"
import {useParams} from "react-router-dom";
import ReactPlayer from 'react-player'
import { Menu } from "../components/DirectionMenu"
import { useHttp } from "../hooks/http.hook.js"


export const PlayerPage = () => {
    const { id } = useParams();
    const { request } = useHttp()
    const [ videoData, setVideoData ] = useState([])
    const [ username, setUsername ] = useState(null)
    const [ likeValue, setLikeValue ] = useState(-1)
    const [ countLikes, setCountLikes ] = useState(0)

    const getVideo = async () => {
        try {
            const data = await request('/api/v2/video/' + id, 'GET')
            setVideoData(data['video'])

        } catch (e) {
            console.log(e)
        }
    }

    const getUsername = async () => {
        try {
            const data = await request('/api/v1/user/' + videoData[0]['user'], 'GET')
            setUsername(data['username'])
            
        } catch (e) {
            console.log(e)
        }
    }

    const setLike = async () => {
        try {
            const data = await request(
                '/api/v2/set-like', 
                'PATCH', 
                {
                    'videoId': videoData[0]['id'],
                    'likeValue': likeValue
                }
            )
            setCountLikes(countLikes+=likeValue)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getVideo()
    }, [id])

    useEffect(() => {
        if (videoData.length != 0){
            getUsername()
            setCountLikes(videoData[0]['likes'])
        }
    }, [videoData])

    const previewUrl = (url) => {
        return "http://localhost:8000/media/" + url
    }

    const changeLike = () => {
        setLikeValue(likeValue===1 ? -1 : 1)
        setLike()
    }
    
    if (videoData.length === 0) {
        return <div>Загрузка данных...</div>
    }

    return (
        <div style={styles}>
            <div className="player">
            <ReactPlayer
                controls={true} 
                url={previewUrl(videoData[0]['video_file'])}
            />
            </div>
            <div className="data-about-video">
                <div>название: {videoData[0]['title']}</div>
                <div className="likes">нравится: {countLikes}</div>
                <div className="views">просмотров: {videoData[0]['views']}</div>
                <div className="author">автор: {username}</div>
                <div className="description">описание: {videoData[0]['description']}</div>
                <button className="isLike" onClick={changeLike}>Нравится: { likeValue==1 ? 0 : 1 }</button>
            </div>
            {<Menu/>}
        </div>
    )
}