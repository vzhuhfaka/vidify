from rest_framework import serializers

class LikeModel:
    def __init__(self, user, video, liked_at):
        self.user = user
        self.video = video
        self.viewed_at = liked_at


class LikeSerializer(serializers.Serializer):
    user = serializers.IntegerField()
    video = serializers.IntegerField()
    liked_at = serializers.DateTimeField()
