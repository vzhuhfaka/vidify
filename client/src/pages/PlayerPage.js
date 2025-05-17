import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/PlayerPageStyle.css"
import {useParams} from "react-router-dom";
import ReactPlayer from 'react-player'
import { Menu } from "../components/DirectionMenu"
import { useHttp } from "../hooks/http.hook.js"
import { previewUrl } from "../utils.js"
import { AuthContext } from "../context/AuthContext.js";

export const PlayerPage = () => {
    const { id } = useParams();
    const { request } = useHttp()
    const [videoData, setVideoData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [likeStatus, setLikeStatus] = useState(false)
    const [serverLikeStatus, setServerLikeStatus] = useState(false)
    const { userId } = useContext(AuthContext)
    const [likes, setLikes] = useState(0)

    const getVideo = async () => {
        try {
            if (userId === null) {
                setLoading(false)
                return
            }
            setLoading(true)
            const data = await request('/api/v3/video-by-id', 'POST', {
                'video_id': id,
                'user_id': userId
            })
            setVideoData(data['video'][0])
            setLikeStatus(data['like_status'])
            setServerLikeStatus(data['like_status'])
            setLikes(data['video'][0]['likes'])
        } catch (e) {
            console.error("Ошибка загрузки видео:", e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getVideo()
    }, [id, userId])
    
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

    const handleLike = () => {
        try {
            if (userId === null) {
                return
            }
            if (serverLikeStatus && !likeStatus){
                request('/api/v3/set-like', 'DELETE', {
                    'video_id': id,
                    'user_id': userId,
                    'new_likes': likes
                })
            } else if (!serverLikeStatus && likeStatus){
                request('/api/v3/set-like', 'POST', {
                    'video_id': id,
                    'user_id': userId,
                    'new_likes': likes
                })
            }
        } catch (e) {
            console.error("Ошибка при обновлении лайка: ", e)
        }
    }

    window.addEventListener('beforeunload', handleLike)

    return (
        <div className="player_page">
            <Menu />
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
                    <div className="video_stat" onClick={() => {
                    
                        setLikeStatus(!likeStatus);
                        setLikes(likeStatus ? likes - 1 : likes + 1)
                        }}>
                        <div className="like_stat">{likeStatus ?
                            <span className="heart heart-filled">❤</span> : <span className="heart heart-empty">❤</span>}
                        </div> <div>{likes}</div>
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
            
            
        </div>
    )
}