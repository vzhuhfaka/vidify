import React, { useState, useEffect } from "react";
import styles from "../styles/PlayerPageStyle.css"
import {useParams} from "react-router-dom";
import ReactPlayer from 'react-player'
import { Menu } from "../components/DirectionMenu"
import { useHttp } from "../hooks/http.hook.js"


export const PlayerPage = () => {
    const { id } = useParams();
    const { request } = useHttp()
    const [videoData, setVideoData] = useState([])

    const getVideo = async () => {
        try {
            const data = await request('api/v1/video/' + id, 'GET')
            setVideoData(data)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getVideo()
    }, [id])

    const previewUrl = (url) => {
        return "http://localhost:8000/media/" + url
    }
    return (
        <div style={styles}>
            <div className="player">
            <ReactPlayer
                controls={true} 
                url={previewUrl(videoData['video_file'])}
            />
            </div>

            {<Menu/>}
        </div>
    )
}