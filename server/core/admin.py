from django.contrib import admin
from core import models

admin.site.register(models.Video)
admin.site.register(models.View)
admin.site.register(models.Like)
admin.site.register(models.Comment)