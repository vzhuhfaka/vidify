from django.test import Client, TestCase


class UserAPITestCase(TestCase):
    def test_post_login_user(self):
        """Тест на регистрацию пользователя""" 
        client = Client()
        data = {
            'username': 'testuser',
            'password': 'testpassword',
        }
        req = client.post('/api/v3/register', data)
        self.assertEqual(req.status_code, 201)


class AuthAPITestCase(TestCase):
    def test_post_register_user(self):
        """Тест на авторизацию пользователя"""
        client = Client()
        data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        client.post('/api/v3/register', data)  # Создадим пользователя для проверки логина
        req = client.post('/api/v3/login', data)
        self.assertEqual(req.status_code, 200)


class UserVideoAPITestCase(TestCase):
    def test_get_user_videos(self):
        """Тест на получение всех видео пользователя"""
        client = Client()
        user_videos = client.get('/api/v3/all-user-video/1')
        self.assertEqual(user_videos.status_code, 200)


class VideoAPITestCase(TestCase):
    def test_post_create_video(self):
        """Тест на создание видео"""
        client = Client()
        data = {
            'video_file': open('core/test_files/test_video.mp4', 'rb'),
            'preview': open('core/test_files/test_preview.jpg', 'rb'),
            'title': 'Test Video',
            'description': 'Test Description',
            'views': 0,
            'likes': 0,
            'user': 1,
        }
        req = client.post('/api/v3/add-video', data)
        self.assertEqual(req.status_code, 201)
        
    def test_get_one_video(self):
        """Тест на получение одного видео по id"""
        client = Client()
        one_video = client.get('/api/v3/video-by-id/1')
        many_videos = client.get('/api/v3/all-video')
        self.assertEqual(one_video.status_code, 200)
        self.assertEqual(many_videos.status_code, 200)
    
    def test_get_many_videos(self):
        """Тест на получение всех видео"""
        client = Client()
        user_videos = client.get('/api/v3/all-video')
        self.assertEqual(user_videos.status_code, 200)
    
    def test_delete_video(self):
        """Тест на удаление видео по id"""
        client = Client()
        delete_video = client.delete('/api/v3/video-by-id/1')
        self.assertEqual(delete_video.status_code, 200)

