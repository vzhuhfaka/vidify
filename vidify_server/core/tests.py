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


def create_user_and_video(client):
    data_for_reg = {
        'username': 'testuser',
        'password': 'testpassword'
    }
    client.post('/api/v3/register', data_for_reg)

    data_for_create_video = {
        'video_file': open('vidify_server/core/test_files/test_video.mp4', 'rb'),
        'preview': open('vidify_server/core/test_files/test_preview.jpg', 'rb'),
        'title': 'Test Video',
        'description': 'Test Description',
        'views': 0,
        'likes': 0,
        'user': 1,
    }
    client.post('/api/v3/add-video', data_for_create_video)

def create_like_for_video(client):
    data_for_create_like = {
        'user_id': 1,
        'video_id': 1,
        'new_likes': 100
    }
    client.post('/api/v3/set-like', data_for_create_like)


class VideoAPITestCase(TestCase):
    def test_post_create_video(self):
        """Тест на создание видео"""
        client = Client()
        data = {
            'video_file': open('vidify_server/core/test_files/test_video.mp4', 'rb'),
            'preview': open('vidify_server/core/test_files/test_preview.jpg', 'rb'),
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
        
        # Сначала создаем пользователя и видео для теста
        create_user_and_video(client)

        one_video = client.post('/api/v3/video-by-id', {
            'video_id': 1,
            'user_id': 1
        })

        self.assertEqual(one_video.status_code, 200)

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


class LikeAPITestCase(TestCase):
    def test_post_set_like(self):
        """Тест на добавление лайка к видео"""
        client = Client()
        # Создаем пользователя и видео для теста
        create_user_and_video(client)
        data = {
            'user_id': 1,
            'video_id': 1,
            'new_likes': 100
        }
        req = client.post('/api/v3/set-like', data)
        self.assertEqual(req.status_code, 200)

    def test_delete_set_like(self):
        """Тест на удаление лайка к видео"""
        client = Client()
        # Создаем пользователя и видео для теста
        create_user_and_video(client)
        create_like_for_video(client)

        data = {
            'user_id': 1,
            'video_id': 1,
            'new_likes': 98
        }
        req = client.delete('/api/v3/set-like', data, content_type='application/json')
        self.assertEqual(req.status_code, 200)