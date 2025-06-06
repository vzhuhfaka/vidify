# Generated by Django 5.1.6 on 2025-03-10 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.TextField(max_length=30, unique=True),
        ),
        migrations.AlterField(
            model_name='video',
            name='video_file',
            field=models.FilePathField(),
        ),
    ]
