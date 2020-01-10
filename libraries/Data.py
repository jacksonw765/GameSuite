from REST import models
import datetime

def save_user(uid, handle, email, name, location):
        user = models.User()
        fname, lname = name.split()
        user.twitter_id = uid
        user.email = email
        user.screen_name = handle
        user.fname = fname
        user.lname = lname
        user.location = location
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
        #highscore.date = datetime.datetime
        highscore.save()

