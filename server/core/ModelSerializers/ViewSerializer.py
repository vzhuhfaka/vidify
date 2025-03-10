from rest_framework import serializers

class ViewModel:
    def __init__(self, user, video, viewed_at):
        self.user = user
        self.video = video
        self.viewed_at = viewed_at


class ViewSerializer(serializers.Serializer):
    user = serializers.IntegerField()
    video = serializers.IntegerField()
    viewed_at = serializers.DateTimeField()
