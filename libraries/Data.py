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
    user.date = datetime.datetime.now()
    user.save()


def save_highscore(uid, score, game):
    highscore = None
    if game == 'football':
        highscore = models.FootballLeaderboard()
    if game == 'basketball':
        highscore = models.BasketballLeaderboard()
    if game == 'soccer':
        highscore = models.SoccerLeaderboard()

    highscore.uid = uid
    highscore.score = score
    highscore.save()
