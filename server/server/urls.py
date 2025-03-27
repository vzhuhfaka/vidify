"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core.views import UserAPIView, ViewAPIView, VideoAPIView, LikeAPIView, CommentAPIView, AuthTokenAPI

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/user', UserAPIView.as_view()),
    path('api/video', VideoAPIView.as_view()),
    
    path('api/view', ViewAPIView.as_view()),
    path('api/like', LikeAPIView.as_view()),
    path('api/comment', CommentAPIView.as_view()),
    
    path('api/login', AuthTokenAPI.as_view())
]
