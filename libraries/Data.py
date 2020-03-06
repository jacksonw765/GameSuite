import csv
import subprocess

import firebase_admin
from django.http import HttpResponse
from django.utils import timezone
from firebase_admin import credentials
from firebase_admin import auth
from libraries import GSLogger

from REST import models
import datetime


def save_user(twitter_id, uid, username, email, name, location, auth_type):
    user = models.User()
    N_A = 'N/A'
    fname = None
    lname = None
    if name is not None:
        try:
            fname, lname = name.split()
        except ValueError:
            print("split failed but it cool we got it")
    user.twitter_id = twitter_id
    user.uid = uid
    if email is not None:
        user.email = email
    else:
        user.email = N_A
    if username is not None:
        user.screen_name = username
    else:
        user.screen_name = N_A
    user.fname = fname
    user.lname = lname
    if location is not None:
        user.location = location
    else:
        user.location = N_A
    user.auth_type = auth_type
    user.date = datetime.datetime.now(tz=timezone.utc)
    user.save()


def save_highscore(uid, score, game):
    highscore = None
    instance = None
    if game == 'football':
        highscore = models.FootballLeaderboard()
        instance = models.FootballLeaderboard.objects
    elif game == 'basketball':
        highscore = models.BasketballLeaderboard()
        instance = models.BasketballLeaderboard.objects
    elif game == 'soccer':
        highscore = models.SoccerLeaderboard()
        instance = models.SoccerLeaderboard.objects

    if instance.filter(uid=uid).count() > 0:
        instance.update(score=score)
    else:
        highscore.score = score
        highscore.uid = uid
        highscore.save()


def reset_database():
    retval = 'Database reset success'
    try:
        cred = credentials.Certificate("execserver/scripts/firebase_secret_auth.json")
        firebase_admin.initialize_app(cred)
    except Exception as exp:
        GSLogger.log_event('app already initialized?' + str(exp))
    try:
        for user in auth.list_users().iterate_all():
            print("Deleting user " + user.uid)
            auth.delete_user(user.uid)
        models.BasketballLeaderboard.objects.all().delete()
        models.SoccerLeaderboard.objects.all().delete()
        models.FootballLeaderboard.objects.all().delete()
        models.User.objects.all().delete()
        models.Settings.objects.all().delete()
    except Exception as e:
        retval = 'Database reset failed: ' + str(e)
        print(e)
    return retval


def get_saved_highscore(uid, game):
    instance = None
    retval = ''
    if game == 'football':
        instance = models.FootballLeaderboard.objects
    elif game == 'basketball':
        instance = models.BasketballLeaderboard.objects
    elif game == 'soccer':
        instance = models.SoccerLeaderboard.objects
    try:
        retval = instance.filter(uid=uid).values_list('score', flat=True)[0]
    except Exception as e:
        pass
    return retval


def export_database():
    response = HttpResponse(content_type='text/csv')

    response['Content-Disposition'] = 'attachment; filename="export.csv"'
    writer = csv.writer(response)
