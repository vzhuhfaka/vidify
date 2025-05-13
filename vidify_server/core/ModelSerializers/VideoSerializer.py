from rest_framework import serializers
from core.models import Video


class VideoSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Video
        fields = ['id', 'username', 'user', 'video_file', 'preview', 'title', 'description', 'views', 'likes']