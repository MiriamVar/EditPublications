class User(object):
    id = 0
    username = ""
    fname = ""
    lname = ""
    mail = ""
    password = ""
    type = 0

    def __init__(self, id, username, fname, lname, mail, password, type):
        self.id = id
        self.username = username
        self.fname = fname
        self.lname = lname
        self.mail = mail
        self.password = password
        self.type = type