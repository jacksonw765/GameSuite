from REST import models
from libraries import Data


# this method was created with scaling in mind, it's prolly not the best but it should allow for more edge cases if discovered
def create_new_user(email, username, location):
    retval = 'User Added'
    Data.save_user(username=username, email=email, location=location, name=None, uid=None, auth_type='user_pass')
    return {'result': retval}

def is_username_in_use(username):
    retval = ''
    try:
        retval = models.User.objects.filter(screen_name=username).exists()
    except Exception as e:
        print(e)
    return retval
