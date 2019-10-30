from django.db import models


class SoccerLeaderboard(models.Model):
    id = models.AutoField(primary_key=True)
    twitter_id = models.IntegerField()
    score = models.IntegerField()
    date = models.DateTimeField()


class FootballLeaderboard(models.Model):
    id = models.AutoField(primary_key=True)
    twitter_id = models.IntegerField()
    score = models.IntegerField()
    date = models.DateTimeField()


class BasketballLeaderboard(models.Model):
    id = models.AutoField(primary_key=True)
    twitter_id = models.IntegerField()
    score = models.IntegerField()
    date = models.DateTimeField()


class User(models.Model):
    id = models.AutoField(primary_key=True)
    twitter_id = models.IntegerField()
    email = models.EmailField(max_length=20, null=True)
    screen_name = models.CharField(max_length=20)
    fname = models.CharField(max_length=20, null=True)
    lname = models.CharField(max_length=20, null=True)
    location = models.CharField(max_length=20, null=True)


class Activity(models.Model):
    id = models.AutoField(primary_key=True)
    twitter_id = models.IntegerField()
    hastags = models.TextField(null=True)
    location = models.CharField(max_length=20, null=True)