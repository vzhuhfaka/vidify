from rest_framework import serializers
from core.models import Video, User


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['video_file', 'title', 'description', 'views', 'likes']