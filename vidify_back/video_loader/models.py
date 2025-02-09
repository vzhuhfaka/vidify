from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)


class Video(models.Model):
    title = models.CharField(max_length=100)
    video_file = models.FileField(upload_to='videos/')
    count_views = models.PositiveIntegerField(default=0)
    count_likes = models.PositiveIntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE)