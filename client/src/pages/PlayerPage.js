import React, { useState, useEffect } from "react";
import styles from "../styles/PlayerPageStyle.css"
import {useParams} from "react-router-dom";
import ReactPlayer from 'react-player'
import { Menu } from "../components/DirectionMenu"
import { useHttp } from "../hooks/http.hook.js"
import { previewUrl } from "../utils.js"

export const PlayerPage = () => {
    const { id } = useParams();
    const { request } = useHttp()
    const [videoData, setVideoData] = useState(null)
    const [loading, setLoading] = useState(true)

    const getVideo = async () => {
        try {
            setLoading(true)
            const data = await request('/api/v3/video-by-id/' + id, 'GET')
            setVideoData(data['video'][0])
        } catch (e) {
            console.error("Ошибка загрузки видео:", e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getVideo()
    }, [id])
    
    if (loading) {
        return (
            <div className="player_page">
                <div className="loading">Загрузка видео...</div>
                <Menu />
            </div>
        )
    }

    if (!videoData) {
        return (
            <div className="player_page">
                <div className="loading">Видео не найдено</div>
                <Menu />
            </div>
        )
    }

    return (
        <div className="player_page">
            <div className="player_container">
                <ReactPlayer
                    className="player"
                    controls={true}
                    width="100%"
                    height="100%"
                    url={previewUrl(videoData['video_file'])}
                    config={{
                        file: {
                            attributes: {
                                controlsList: 'nodownload'
                            }
                        }
                    }}
                />
            </div>
            
            <div className="video_info">
                <h1 className="video_title">{videoData['title']}</h1>
                
                <div className="video_stats">
                    <div className="video_stat">
                        <span>❤️ {videoData['likes']}</span>
                    </div>
                    <div className="video_stat">
                        <span>👁️ {videoData['views']}</span>
                    </div>
                </div>
                
                <div className="video_author">
                    <span>Автор: {videoData['username']}</span>
                </div>
                
                <div className="video_description">
                    {videoData['description']}
                </div>
            </div>
            
            <Menu />
        </div>
    )
}