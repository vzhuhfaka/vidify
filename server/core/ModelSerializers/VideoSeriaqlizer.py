from rest_framework import serializers

class VideoModel:
    def __init__(self, user, video_file, title, 
                 description, views, likes,
                 created_at, updated_at):
        self.user = user
        self.video_file = video_file
        self.title = title
        self.description = description
        self.views = views
        self.likes = likes
        self.created_at = created_at
        self.updated_at = updated_at


class VideoSerializer(serializers.Serializer):
    user = serializers.IntegerField()
    video_file = serializers.FileField()
    title = serializers.CharField()
    description = serializers.CharField()
    views = serializers.CharField()
    likes = serializers.IntegerField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
