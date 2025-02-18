from django.db import models

# Модель пользователя
class User(models.Model):
    username = models.TextField(max_length=30, blank=False, unique=True)
    password = models.TextField(max_length=100, blank=False)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

# Модель видео
class Video(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video_file = models.FileField(upload_to='videos/')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

# Модель просмотров
class View(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    viewed_at = models.DateTimeField(auto_now_add=True)

# Модель лайков
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)

# Модель комментариев
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
