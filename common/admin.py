from django.contrib import admin

# Register your models here.
from django.contrib import admin
from REST import models

admin.site.register(models.User)
admin.site.register(models.FootballLeaderboard)