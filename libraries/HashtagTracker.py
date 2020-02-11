from libraries import UserAuth


class HashtagTracker:

    def track_user_hashtags(self):
        json = []
        self.user_auth = UserAuth.UserAuth()
        ids = self.user_auth.get_twitter_ids()
        for id in ids:
            screen_name = self.user_auth.get_username(id)
            hashtags = self.user_auth.get_recent_hashtag_data(screen_name=screen_name)
            print(hashtags)
            json.append({'id': id, 'hashtags': hashtags})
        return json
