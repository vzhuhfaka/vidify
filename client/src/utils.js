/*
Файл для частоиспользуемых функций
*/

export const previewUrl = (url) => {
    return "http://localhost:8000/media/" + url
}

export const videoUrl = (url) => {
    return "/main/player/" + url
} 