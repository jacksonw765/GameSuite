from REST import models


class SignInUsernamePassword:

    def create_new_user(self, email, username):
        self.retval = ''
        if self.is_username_in_use(username):
            self.retval = 'Username is already taken.'


    def is_username_in_use(self, username):
        try:
            retval = models.User.objects.filter(screen_name=username).exists()
        except Exception as e:
            print(e)