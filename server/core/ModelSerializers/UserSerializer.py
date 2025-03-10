from rest_framework import serializers

class UserModel:
    def __init__(self, username, password, email,
                    created_at, updated_at):
        self.username = username
        self.password = password
        self.email = email
        self.created_at = created_at
        self.updated_at = updated_at


class UserSerializer(serializers.Serializer):
    username = serializers.TimeField()
    password = serializers.CharField()
    email = serializers.EmailField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
