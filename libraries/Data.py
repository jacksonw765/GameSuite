from REST import models


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

