from rest_framework.views import APIView
from rest_framework.response import Response
from core.models import Video
from django.contrib.auth.models import User
from core.ModelSerializers.VideoSerializer import VideoSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status


class VideoAPIView(APIView):
    """
    APIView для модели Video
    """
    def get(self, request, pk=None):
        """
        Метод GET
        При запросе на адрес /api/video вернет все записи из модели Video, а также json, где ключ - это pk, а значение username этого pk в User
        При запросе на адрес /api/video/<int:pk> вернет запись с id=pk
        """
        if pk:
            user_videos = Video.objects.filter(id=pk)
            return Response({'video': VideoSerializer(user_videos, many=True).data})
        
        videos = Video.objects.all()    
        videos_serialize = VideoSerializer(videos, many=True).data
        users = {}
        for i in videos_serialize:
            userId = get_object_or_404(User, pk=i['user'])
            users[i['user']] = userId.username
        return Response({'videos': videos_serialize, 'users': users})
    

class LikeAPI(APIView):
    """
    APIView для лайков под видео
    """
    def patch(self, request):
        try:
            videoId = request.data['videoId']
            newLikeValue = request.data['likeValue']
            currentLikeValue = Video.objects.get(id=videoId).likes
            Video.objects.filter(id=videoId).update(likes=currentLikeValue+newLikeValue)
            return Response({'like': newLikeValue}, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response({"error": str(ex)}, status=400)