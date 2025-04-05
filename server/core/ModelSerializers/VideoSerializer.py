from rest_framework import serializers
from core.models import Video, User


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'user', 'video_file', 'preview', 'title', 'description', 'views', 'likes']