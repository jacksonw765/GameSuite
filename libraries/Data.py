from REST import models
import datetime


def save_user(twitter_id, uid, username, email, name, location, auth_type):
    user = models.User()
    fname = None
    lname = None
    if name is not None:
        try:
            fname, lname = name.split()
        except ValueError:
            print("split failed but it cool we got it")
    user.twitter_id = twitter_id
    user.uid = uid
    user.email = email
    user.screen_name = username
    user.fname = fname
    user.lname = lname
    user.location = location
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

    highscore.twitter_id = uid
    highscore.score = score
    highscore.save()
