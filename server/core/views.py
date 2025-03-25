from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Video, View, Like, Comment
from django.contrib.auth.models import User
from django.forms import model_to_dict
from .ModelSerializers.UserSerializer import UserSerializer
from .ModelSerializers.VideoSerializer import VideoSerializer
from .ModelSerializers.ViewSerializer import ViewSerializer
from .ModelSerializers.LikeSerializer import LikeSerializer
from .ModelSerializers.CommentSerializer import CommentSerializer
from .logger_server_core import info, error
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated


class UserAPIView(APIView):
    def get(self, request):
        try:
            users = User.objects.all()
            info(__name__, 'GET UserAPI | OK')
        except Exception as ex:
            error(__name__, f'GET UserAPI | {ex}')
        return Response({'users': UserSerializer(users, many=True).data})

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Проверка уникальности username/email
            if User.objects.filter(username=serializer.validated_data['username']).exists():
                return Response(
                    {'error': 'Пользователь с таким именем уже существует'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            info(__name__, f'POST UserAPI | CREATED')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        error(__name__, 'POST UserAPI | Bad request')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthTokenAPI(ObtainAuthToken):
    def post(self, request):
        # Получаем данные из запроса
        username = request.data.get('username')
        password = request.data.get('password')
        
        # Аутентифицируем пользователя
        user = authenticate(username=username, password=password)
        
        if not user:
            error(__name__, 'POST AuthTokenAPI | ')
            return Response({'error': 'Invalid Credentials'}, status=400)
        
        # Получаем или создаем токен
        token, created = Token.objects.get_or_create(user=user)
        
        # Возвращаем ответ с токеном и данными пользователя
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'email': user.email
        })


class VideoAPIView(APIView):
    def get(self, request):
        videos = Video.objects.all()
        return Response({'videos': VideoSerializer(videos, many=True).data})
    
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Authentication required"}, status=401)

        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print('serializer is Fasle')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ViewAPIView(APIView):
    def get(self, request):
        views = View.objects.all()
        return Response({'views': ViewSerializer(views, many=True).data})
    
    def post(self, requset):
        post_new = View.objects.create(
            user=requset.data['user'],
            video=requset.data['video'],
            viewed_at=requset.data['viewed_at'],
        )
        return Response({'post': model_to_dict(post_new)})
    

class LikeAPIView(APIView):
    def get(self, request):
        likes = Like.objects.all()
        return Response({'views': LikeSerializer(likes, many=True).data})
    
    def post(self, requset):
        post_new = Like.objects.create(
            user=requset.data['user'],
            video=requset.data['video'],
            liked_at=requset.data['liked_at'],
        )
        return Response({'post': model_to_dict(post_new)})
    

class CommentAPIView(APIView):
    def get(self, request):
        comments = Comment.objects.all()
        return Response({'views': CommentSerializer(comments, many=True).data})
    
    def post(self, requset):
        post_new = Comment.objects.create(
            user=requset.data['user'],
            video=requset.data['video'],
            comment=requset.data['comment'],
            created_at=requset.data['created-at'],
            updated_at=requset.data['updated_at']
        )
        return Response({'post': model_to_dict(post_new)})