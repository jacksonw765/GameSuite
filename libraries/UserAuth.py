import twitter
from REST import models
from libraries import Data


class UserAuth:
    # these keys should NOT be directly commited or we should do some sort of encryption

    def __init__(self):
        self.up_auth = 'user_pass'
        self.twitter_auth = 'twitter'

        api_key = "q6Q0ftJXNC4IluHPNt9Y9Rroj"
        secret = "HdxwPaPb9bd1eKwjTCbeIhVcPb9wcb9e7ThwApvqx0pJokJDQk"
        access_token = "1169646741693566976-0Ac8ujDhAOKqwA5vj8xnFsvMsBBfWi"
        token_secret = "Pd6tTpTB2zsg8h6KczrReeLWeYCBDbZrtgL31JtK8HhT5"
        self.api = twitter.Api(consumer_key=api_key, consumer_secret=secret, access_token_key=access_token,
                               access_token_secret=token_secret)

    def get_user_handle(self, uid):
        retval = ''
        try:
            twitter_id = models.User.objects.filter(uid=uid).values_list("twitter_id", flat=True)[0]
            output = self.api.GetUser(user_id=twitter_id)
            retval = output.screen_name
        except Exception as e:
            retval = 'Unable to retrieve'
            print(e)
        return retval

    def get_user_auth_screen_name(self, uid):
        retval = ''
        try:
            retval = models.User.objects.filter(uid=uid).values_list('screen_name', flat=True)[0]
        except Exception as e:
            print(e)
            retval = "Unable to retrieve"
        return retval


    def get_username(self, uid):
        retval = ''
        try:
            retval = models.User.objects.filter(uid=uid).values_list('screen_name', flat=True)[0]
        except Exception as e:
            retval = 'Unable to retrieve'
            print(e)
        return retval

    def get_user_location(self, twitter_id):
        self.retval = ''
        try:
            output = self.api.GetUser(user_id=twitter_id)
            self.retval = output.location
        except Exception as e:
            self.retval = ''
            print(e)
        return self.retval

    def check_uid_exists(self, uid):
        retval = ''
        try:
            retval = models.User.objects.filter(uid=uid).exists()
        except Exception as e:
            print(e)
        return retval

    def get_twitter_screen_name(self, twitter_id):
        output = self.api.GetUser(user_id=twitter_id)
        screen_name = output.screen_name
        return screen_name

    def get_required_signin_data(self, twitter_id):
        retval = ''
        try:
            output = self.api.GetUser(user_id=twitter_id)
            uid = twitter_id
            screen_name = output.screen_name
            location = output.location
            name = output.name
            retval = {'uid': uid, 'screen_name': screen_name, 'location': location, 'name': name}
            print(retval)
        except Exception as e:
            print('error{}'.format(e))
        return retval

    def create_new_user(self, twitter_id, name, email, username, uid, location, auth_type):
        Data.save_user(username=username, email=email, location=location, name=name, uid=uid, auth_type=auth_type, twitter_id=twitter_id)
        return {'result': 'User Added'}

    def is_username_in_use(self, username):
        retval = True
        try:
            retval = models.User.objects.filter(screen_name=username).exists()
        except Exception as e:
            print(e)
        return retval

    def get_auth_type(self, uid):
        retval = models.User.objects.filter(uid=uid).values_list("auth_type", flat=True)
        return retval[0]

    def get_user_most_recent_add(self):
        retval = models.User.objects.values_list('screen_name').order_by('date')
        return list(retval)

    def get_user_auth_type(self):
        retval = models.User.objects.values_list('auth_type', flat=True)
        return list(retval)

    def get_user_locations(self):
        retval = models.User.objects.values_list('location', flat=True)
        return list(retval)

    def get_football_scores(self):
        retval = []
        entry_set = list(models.FootballLeaderboard.objects.values().order_by('-score'))
        print(entry_set)
        for score in entry_set:
            username = self.get_username(score['uid'])
            auth_type = self.get_auth_type(score['uid'])
            entry = {'uid': score['uid'], 'score': score['score'], 'username': username, 'auth_type': auth_type}
            retval.append(entry)
        return retval

    def get_soccer_scores(self):
        retval = []
        entry_set = list(models.SoccerLeaderboard.objects.values().order_by('-score'))
        print(entry_set)
        for score in entry_set:
            username = self.get_username(score['uid'])
            auth_type = self.get_auth_type(score['uid'])
            entry = {'uid': score['uid'], 'score': score['score'], 'username': username, 'auth_type': auth_type}
            retval.append(entry)
        return retval

    def get_basketball_scores(self):
        retval = []
        entry_set = list(models.BasketballLeaderboard.objects.values().order_by('-score'))
        print(entry_set)
        for score in entry_set:
            username = self.get_username(score['uid'])
            auth_type = self.get_auth_type(score['uid'])
            entry = {'uid': score['uid'], 'score': score['score'], 'username': username, 'auth_type': auth_type}
            retval.append(entry)
        return retval

    def get_hashtag_data(self, hashtag, count=5):
        result = self.api.GetSearch(raw_query='q=%23bearcats', return_json=True, count=count)






