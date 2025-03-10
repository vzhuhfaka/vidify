from rest_framework import serializers

class CommentModel:
    def __init__(self, user, video, comment, created_at, updated_at):
        self.user = user
        self.video = video
        self.comment = comment
        self.created_at = created_at
        self.updated_at = updated_at


class CommentSerializer(serializers.Serializer):
    user = serializers.IntegerField()
    video = serializers.IntegerField()
    comment = serializers.CharField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
