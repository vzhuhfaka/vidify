# Generated by Django 5.1.6 on 2025-03-26 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_alter_video_video_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='video_file',
            field=models.CharField(max_length=255),
        ),
    ]
