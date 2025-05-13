from django.urls import path
from core.api.v2.views import VideoAPIView, LikeAPI
from django.urls import path


urlpatterns = [
    path('video/<int:pk>', VideoAPIView.as_view()),
    path('set-like', LikeAPI.as_view())
]