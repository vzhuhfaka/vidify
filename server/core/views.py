from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from django.forms import model_to_dict
from .serializers import UserSerializer

class VideoAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        return Response({'users': UserSerializer(users, many=True).data})
    
    def post(self, request):
        post_new = User.objects.create(
            username=request.data['username'],
            password=request.data['password'],
            email=request.data['email'],
            created_at=request.data['created_at'],
            updated_at=request.data['updated_at']
        )
        return Response({'post': model_to_dict(post_new)})