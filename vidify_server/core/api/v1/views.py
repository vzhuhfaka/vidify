from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.models import Video
from django.contrib.auth.models import User
from django.forms import model_to_dict
from core.ModelSerializers.UserSerializer import UserSerializer
from core.ModelSerializers.VideoSerializer import VideoSerializer
from core.logger_server_core import info, error
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import authenticate
from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404


class UserAPIView(APIView):
    """
    APIView для модели User
    """
    def get(self, request, pk=None):
        """
        Метод GET
        При запросе на адрес /api/v1/user функция вернет все записи из модели User
        При запросе на адрес /api/v1/user/<int:pk> вернет запись с pk=pk из модели User
        """
        if pk:
            user = get_object_or_404(User, pk=pk)
            return Response({'username': user.username})

        try:
            users = User.objects.all()
            
        except Exception as ex:
            error(__name__, f'GET UserAPI | {ex}')

        return Response({'users': UserSerializer(users, many=True).data})


    def post(self, request):
        """
        Метод POST
        При запросе на адрес /api/user создает запись в модели User(нужна авторизация по токену)
        """
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():

            # Проверка уникальности username/email
            if User.objects.filter(username=serializer.validated_data['username']).exists():
                return Response(
                    {'error': 'Пользователь с таким именем уже существует'},
                    status=status.HTTP_400_BAD_REQUEST)
            
            serializer.save()
            info(__name__, f'POST UserAPI | CREATED')

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthTokenAPI(ObtainAuthToken):
    """
    API для аутентификации
    """
    def post(self, request):
        """
        метод POST
        При запросе на адрес /api/login аутентифицирует 'username' и 'password' из request
        """
        # Получаем данные из запроса
        username = request.data.get('username')
        password = request.data.get('password')
        
        # Аутентифицируем пользователя
        user = authenticate(username=username, password=password)
        
        if not user:
            return Response({'error': 'Неверные данные'}, status=400)
        
        token, created = Token.objects.get_or_create(user=user)
        

        # Возвращаем ответ с токеном и данными пользователя
        return Response({
            'token': token.key,
            'userId': user.pk,
            'username': user.username,
            'email': user.email
        })


class VideoAPIView(APIView):
    """
    APIView для модели Video
    """
    def get(self, request, pk=None):
        """
        Метод GET
        При запросе на адрес /api/video вернет все записи из модели Video, а также json, где ключ - это pk, а значение username этого pk в User
        При запросе на адрес /api/video/<int:pk> вернет все записи определенного пользователя c pk=pk
        """
        if pk:
            user_videos = Video.objects.filter(user=pk)
            return Response({'user_videos': VideoSerializer(user_videos, many=True).data})
        
        videos = Video.objects.all()    
        videos_serialize = VideoSerializer(videos, many=True).data
        users = {}
        for i in videos_serialize:
            userId = get_object_or_404(User, pk=i['user'])
            users[i['user']] = userId.username
        return Response({'videos': videos_serialize, 'users': users})


    def post(self, request):
        """
        Метод POST
        При запросе на адрес /api/v1/video создает запись в модели Video
        """
        try:
            # Проверяем авторизирован ли пользователь
            if request.data['user'] == 'null':
                return Response({
                    'error': 'you need auth'
            }, status=status.HTTP_400_BAD_REQUEST)
            
            video_file = request.FILES.get('video_file')
            preview = request.FILES.get('preview')

            # Добавляем video_file в папку /videos из MEDIA_ROOT
            video_file_path = default_storage.save(f'videos/{video_file.name}', video_file)
            request.data['video_file'] = video_file_path

            # Добавляем preview в папку /previews из MEDIA_ROOT
            preview_path = default_storage.save(f'previews/{preview.name}', preview)
            request.data['preview'] = preview_path

            serializer = VideoSerializer(data=request.data)

            if serializer.is_valid():
                info(__name__, 'POST VideoAPIView | CREATED')
                serializer.save()


            return Response({
                'video_file created'
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            error(__name__, e)
            return Response({"error": str(e)}, status=400)
    
    def delete(self, request, pk):
        """
        Метод DELETE
        При запросе на адрес /api/video/<int:pk> удаляет запись из модели Video по id=pk
        """
        try:
            Video.objects.filter(id=pk).delete()
            return Response({'deleted': pk})
        except Exception as ex:
            print('error: ', ex)
    

