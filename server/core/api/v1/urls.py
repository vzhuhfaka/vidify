from django.contrib import admin
from django.urls import path
from core.api.v1.views import UserAPIView, VideoAPIView, AuthTokenAPI
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('user/<int:pk>', UserAPIView.as_view()),
    path('user', UserAPIView.as_view()),
    path('video/<int:pk>', VideoAPIView.as_view()),
    path('video', VideoAPIView.as_view()),
    
]