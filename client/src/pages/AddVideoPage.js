import styles from "../styles/AddVideoPageStyle.css"
import React, { useContext, useState } from "react";
import { Menu } from "../components/DirectionMenu"
import { AuthContext } from "../context/AuthContext";

export const AddVideoPage = () => {
    const { token, isAuthenticated, userId } = useContext(AuthContext)
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [form, setForm] = useState({
        title: '',
        description: '',
        likes: 0,
        views: 0
    })

    const fileChangeHandler = event => {
        setSelectedFile(event.target.files[0])
    }

    const previewChangeHandler = event => {
        setPreview(event.target.files[0])
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const uploadHandler = async () => {
        try{
            const formData = new FormData()

            if (selectedFile){
                formData.append('video_file', selectedFile)
            } else {
                alert('Необходимо выбрать video файл')
            }
            if (preview) {
                formData.append('preview', preview)
            } else {
                alert('Необходимо выбрать preview файл')
            }

            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('views', form.views);
            formData.append('likes', form.likes);
            formData.append('user', userId)

            const res = await fetch('/api/video', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()

            console.log(data)
        } catch (e) {
            console.error('upload error: ', e)
        }
    }

    const check = () => {
        console.log(isAuthenticated, token, userId)
    }

    return (
        <div className="add_video_page" style={styles.add_video_page}>
            <div className="add_video_form">
                <input className="item title" name="title" onChange={changeHandler} type="text" placeholder="Введите название" />
                <input className="item description" name="description" onChange={changeHandler} type="text" placeholder="Введите описание" />
                <div>video file</div>
                <input className="item select_video_file" name='file' onChange={fileChangeHandler} type="file" accept=".mp4, .mp3"/>
                <div>preview</div>
                <input className="item select_preview" name='preview' onChange={previewChangeHandler} type='file' accept=".png, .jpg"/>
                <button onClick={uploadHandler}>Загрузить</button>
                <button onClick={check}>check auth</button>
            </div>
            {<Menu/>}
        </div>
    )
}
