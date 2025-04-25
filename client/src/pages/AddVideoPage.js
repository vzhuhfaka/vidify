import styles from "../styles/AddVideoPageStyle.css"
import React, { useContext, useState } from "react";
import { Menu } from "../components/DirectionMenu"
import { AuthContext } from "../context/AuthContext";

export const AddVideoPage = () => {
    const { userId } = useContext(AuthContext)
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [form, setForm] = useState({
        title: '',
        description: '',
        likes: 0,
        views: 0
    })
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(null)

    const fileChangeHandler = event => {
        const file = event.target.files[0]
        setSelectedFile(file)
        setError(null)
    }

    const previewChangeHandler = event => {
        const file = event.target.files[0]
        setPreview(file)
        setError(null)
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const uploadHandler = async () => {
        if (!selectedFile) {
            setError('Необходимо выбрать видео файл')
            return
        }
        if (!preview) {
            setError('Необходимо выбрать превью')
            return
        }
        if (!form.title.trim()) {
            setError('Введите название видео')
            return
        }

        try {
            setUploading(true)
            setError(null)
            
            const formData = new FormData()
            formData.append('video_file', selectedFile)
            formData.append('preview', preview)
            formData.append('title', form.title)
            formData.append('description', form.description)
            formData.append('views', form.views)
            formData.append('likes', form.likes)
            formData.append('user', userId)

            const res = await fetch('/api/v3/add-video', {
                method: 'POST',
                body: formData
            })
            
            const data = await res.json()
            
            if (!res.ok) {
                throw new Error(data.message || 'Ошибка загрузки')
            }
            
            console.log('Видео успешно загружено:', data)
            alert('Видео успешно загружено!')
            // Можно добавить редирект или сброс формы
            
        } catch (e) {
            console.error('Upload error:', e)
            setError(e.message || 'Произошла ошибка при загрузке')
        } finally {
            setUploading(false)
        }
    }

    
    return (
        <div className="add_video_page">
            <div className="add_video_form">
                <h2>Добавить новое видео</h2>
                
                <input 
                    className="item title" 
                    name="title" 
                    onChange={changeHandler} 
                    type="text" 
                    placeholder="Название видео" 
                    value={form.title}
                />
                
                <textarea 
                    className="item description" 
                    name="description" 
                    onChange={changeHandler} 
                    placeholder="Описание видео" 
                    rows="4"
                    value={form.description}
                />
                
                <div className="file_input_container">
                    <label>Видео файл</label>
                    <div className="file_input_wrapper">
                        <label className="file_input_button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            {selectedFile ? selectedFile.name : "Выберите видео файл"}
                            <input 
                                className="file_input" 
                                name='file' 
                                onChange={fileChangeHandler} 
                                type="file" 
                                accept=".mp4,.mov,.avi"
                            />
                        </label>
                    </div>
                </div>
                
                <div className="file_input_container">
                    <label>Превью (изображение)</label>
                    <div className="file_input_wrapper">
                        <label className="file_input_button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {preview ? preview.name : "Выберите изображение"}
                            <input 
                                className="file_input" 
                                name='preview' 
                                onChange={previewChangeHandler} 
                                type='file' 
                                accept=".jpg,.jpeg,.png"
                            />
                        </label>
                    </div>
                    {preview && (
                        <div className="preview_container">
                            <img 
                                src={URL.createObjectURL(preview)} 
                                alt="Предпросмотр" 
                                className="preview_image"
                            />
                            <div className="file_name">{preview.name}</div>
                        </div>
                    )}
                </div>
                
                {error && <div style={{color: '#f44336', fontSize: '14px'}}>{error}</div>}
                
                <button 
                    className="upload_button" 
                    onClick={uploadHandler}
                    disabled={uploading}
                >
                    {uploading ? 'Загрузка...' : 'Загрузить видео'}
                </button>
            </div>
            
            <Menu />
        </div>
    )
}