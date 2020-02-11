from libraries import UserAuth
import itertools

class HashtagTracker:

    def track_user_hashtags(self):
        json = []
        self.user_auth = UserAuth.UserAuth()
        screen_names = self.user_auth.get_twitter_usernames()
        for screen_name in screen_names:
            hashtags = self.user_auth.get_recent_hashtag_data(screen_name=screen_name)
            json.append({'id': screen_name, 'hashtags': hashtags})
        return json
