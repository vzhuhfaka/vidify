from core.ModelSerializers.VideoSerializer import VideoSerializer
from core.ModelSerializers.UserSerializer import UserSerializer
from core.models import Video
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate
from django.core.files.storage import default_storage


class AuthAPI(ObtainAuthToken):
    """API для аутентификации пользователя"""
    def post(self, request):
        """Аутентифицирует 'username' и 'password' из request"""
        # Получаем данные из запроса
        username = request.data.get('username')
        password = request.data.get('password')

        # Аутентифицируем пользователя
        user = authenticate(username=username, password=password)

        if not user:
            return Response({'error': 'Неверные данные'}, status=status.HTTP_400_BAD_REQUEST)
        
        token, created = Token.objects.get_or_create(user=user)

        # Возвращаем ответ с токеном и данными пользователя
        return Response({
            'token': token.key,
            'userId': user.pk,
            'username': user.username,
            'email': user.email
        }, status=status.HTTP_200_OK)
    

class UserAPI(APIView):
    """API для работы с учетными записями в модели User"""
    def post(self, request):
        """Добавляет нового пользователя"""
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Проверка уникальности username/email
            if User.objects.filter(username=serializer.validated_data['username']).exists():
                return Response(
                    {'error': 'Пользователь с таким именем уже существует'},
                    status=status.HTTP_400_BAD_REQUEST)
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserVideoAPI(APIView):
    """API для работы с моделью Video, которая привязана к пользователю"""
    def get(self, request, user_id=None):
        """Получает записи"""
        if user_id:
            user_videos = Video.objects.filter(user=user_id)
            return Response({'user_videos': VideoSerializer(user_videos, many=True).data}, status=status.HTTP_200_OK)
        return Response({'error': 'user_id not found'}, status=status.HTTP_400_BAD_REQUEST)


class VideoAPI(APIView):
    """API для работы с моделью Video"""
    def get(self, request, video_id=None):
        """Получает записи"""
        if video_id:  # если запрос по id
            user_videos = Video.objects.filter(id=video_id)
            return Response({'video': VideoSerializer(user_videos, many=True).data}, status=status.HTTP_200_OK)
        
        videos = Video.objects.all()    
        videos_serialize = VideoSerializer(videos, many=True).data
        return Response({'videos': videos_serialize}, status=status.HTTP_200_OK)
    
    def post(self, request):
        """Добавляет запись"""
        try:
            # Проверяем авторизирован ли пользователь
            if request.data['user'] == 'null':
                return Response(
                    {'error': 'you need auth'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            video_file = request.FILES.get('video_file')
            preview = request.FILES.get('preview')

            # Добавляем video_file в папку /videos из MEDIA_ROOT
            video_file_path = default_storage.save(f'videos/{video_file.name}', video_file)
            request.data['video_file'] = video_file_path  # заменяем файл на путь к нему

            # Добавляем preview в папку /previews из MEDIA_ROOT
            preview_path = default_storage.save(f'previews/{preview.name}', preview)
            request.data['preview'] = preview_path  # заменяем файл на путь к нему

            serializer = VideoSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()

            return Response({
                'video_file created'
            }, status=status.HTTP_201_CREATED)
        
        except Exception as ex:
            return Response({"error": str(ex)}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, video_id):
        """Удаляет запись"""
        try:
            Video.objects.filter(id=video_id).delete()
            return Response({'deleted': video_id}, status=status.HTTP_200_OK)
        except Exception as ex:
            print('error: ', ex)

