from django.contrib import admin
from django.urls import path
from core.views import UserAPIView, ViewAPIView, VideoAPIView, LikeAPIView, CommentAPIView, AuthTokenAPI
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/<int:pk>', UserAPIView.as_view()),
    path('api/user', UserAPIView.as_view()),
    path('api/video/<int:pk>', VideoAPIView.as_view()),
    path('api/video', VideoAPIView.as_view()),
    path('api/view', ViewAPIView.as_view()),
    path('api/like', LikeAPIView.as_view()),
    path('api/comment', CommentAPIView.as_view()),
    path('api/login', AuthTokenAPI.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)