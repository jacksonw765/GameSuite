from django.db import models


class SoccerLeaderboard:
    id = models.AutoField(primary_key=True)
    twitter_id = models.IntegerField(max_length=10)
    score = models.IntegerField(max_length=10)
    date = models.DateTimeField()


class FootballLeaderboard:
    id = models.AutoField(primary_key=True)
    twitter_id = models.IntegerField(max_length=10)
    score = models.IntegerField(max_length=10)
    date = models.DateTimeField()


class BasketballLeaderboard:
    id = models.AutoField(primary_key=True)
    twitter_id = models.IntegerField(max_length=10)
    score = models.IntegerField(max_length=10)
    date = models.DateTimeField()


class User:
    id = models.AutoField(primary_key=True)
    twitter_id = models.IntegerField(max_length=10)
    email = models.EmailField(max_length=20, null=True)
    screen_name = models.CharField(max_length=20)
    fname = models.CharField(max_length=20, null=True)
    lname = models.CharField(max_length=20, null=True)
    location = models.CharField(max_length=20, null=True)


class Activity:
    id = models.AutoField(primary_key=True)
    twitter_id = models.IntegerField(max_length=10)
    hastags = models.TextField(null=True)
    location = models.CharField(max_length=20, null=True)