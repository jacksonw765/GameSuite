from REST import models
from libraries import Data


def create_new_user(email, username, location):
    retval = ''
    if is_username_in_use(username):
        retval = 'Username is already taken.'
    else:
        Data.save_user(username=username, email=email, location=location, name=None, uid=None, auth_type='user/pass')
        retval = "User added"
    return retval

def is_username_in_use(username):
    retval = ''
    try:
        retval = models.User.objects.filter(screen_name=username).exists()
    except Exception as e:
        print(e)
    return retval
