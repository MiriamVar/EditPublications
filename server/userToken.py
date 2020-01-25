class UserToken(object):
    user_id = 0
    user_token = ""
    user_login = ""

    def __init__(self, user_id, user_token, user_login):
        self.user_id = user_id
        self.user_token = user_token
        self.user_login = user_login
