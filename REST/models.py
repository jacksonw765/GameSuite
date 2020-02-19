import datetime

from django.db import models


class SoccerLeaderboard(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.TextField(max_length=60)
    score = models.IntegerField()
    date = models.DateTimeField()


class FootballLeaderboard(models.Model):
    id = models.AutoField(primary_key=True)
    uid = models.TextField(max_length=60, null=True)
    score = models.IntegerField(null=True)
    date = models.DateTimeField(auto_now_add=True)


class BasketballLeaderboard(models.Model):
    id = models.AutoField(primary_key=True)
    uid = models.TextField(max_length=60, null=True)
    score = models.IntegerField(null=True)
    date = models.DateTimeField(auto_now_add=True, null=True)


class User(models.Model):
    id = models.AutoField(primary_key=True)
    twitter_id = models.IntegerField(null=True)
    uid = models.CharField(max_length=50, null=True)
    email = models.EmailField(max_length=40, null=True)
    screen_name = models.CharField(max_length=20, null=True)
    fname = models.CharField(max_length=20, null=True)
    lname = models.CharField(max_length=20, null=True)
    location = models.CharField(max_length=20, null=True)
    auth_type = models.CharField(max_length=10, null=True)
    date = models.DateTimeField(default=datetime.datetime.now)


class Activity(models.Model):
    id = models.AutoField(primary_key=True)
    twitter_id = models.IntegerField(null=True)
    hashtags = models.TextField(max_length=100, null=True)
    location = models.CharField(max_length=20, null=True)


class Settings(models.Model):
    id = models.AutoField(primary_key=True)
    server_running = models.BooleanField(default=False)
    interval = models.IntegerField(null=True)
    hashtags = models.TextField(max_length=100, null=True)


class Logger(models.Model):
    id = models.AutoField(primary_key=True)
    exception = models.TextField(null=True, max_length=100)
    message = models.TextField(null=True, max_length=100)
    date = models.DateTimeField(default=datetime.datetime.now)
    code = models.IntegerField(null=False)
