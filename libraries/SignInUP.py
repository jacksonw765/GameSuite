from REST import models
from libraries import Data


# this method was created with scaling in mind, it's prolly not the best but it should allow for more edge cases if discovered
def create_new_user(email, username, uid, location):
    Data.save_user(username=username, email=email, location=location, name=None, uid=uid, auth_type='user_pass')
    return {'result': 'User Added'}

def is_username_in_use(username):
    retval = True
    try:
        retval = models.User.objects.filter(screen_name=username).exists()
    except Exception as e:
        print(e)
    return retval
