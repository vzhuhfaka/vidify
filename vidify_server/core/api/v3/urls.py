from django.urls import path
from core.api.v3.views import UserVideoAPI, VideoAPI, VideoByIdAPI, DeleteVideoByIdAPI, UserAPI, AuthAPI, LikeAPI

urlpatterns = [
    path('video-by-id/<int:video_id>', DeleteVideoByIdAPI.as_view()),
    path('video-by-id', VideoByIdAPI.as_view()),
    path('all-video', VideoAPI.as_view()),
    path('all-user-video/<int:user_id>', UserVideoAPI.as_view()),
    path('add-video', VideoAPI.as_view()),
    path('register', UserAPI.as_view()),
    path('login', AuthAPI.as_view()),
    path('set-like', LikeAPI.as_view()),
]