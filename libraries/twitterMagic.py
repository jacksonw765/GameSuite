import twitter


class TwitterMagic:
    # these keys should NOT be directly commited or we should do some sort of encryption
    def __init__(self):
        api_key = "q6Q0ftJXNC4IluHPNt9Y9Rroj"
        secret = "HdxwPaPb9bd1eKwjTCbeIhVcPb9wcb9e7ThwApvqx0pJokJDQk"
        access_token = "1169646741693566976-0Ac8ujDhAOKqwA5vj8xnFsvMsBBfWi"
        token_secret = "Pd6tTpTB2zsg8h6KczrReeLWeYCBDbZrtgL31JtK8HhT5"
        self.api = twitter.Api(consumer_key=api_key, consumer_secret=secret, access_token_key=access_token,
                          access_token_secret=token_secret)

    def get_user_handle(self, uid):
        if uid is not None:
            try:
                output = self.api.GetUser(user_id=uid)
                print(output)
                return output
            except Exception as e:
                print("big error{}".format(e))
        else:
            print("val cannot be null")
