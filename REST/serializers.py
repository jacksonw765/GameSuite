from rest_framework import serializers
from REST import models


class FootballLeaderboardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.FootballLeaderboard
        fields = ['twitter_id', 'score', 'date']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.User
        fields = ['twitter_id', 'email', 'screen_name', 'fname', 'lname', 'location']


class ActivitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Activity
        fields = ['twitter_id', 'hastags', 'location']
