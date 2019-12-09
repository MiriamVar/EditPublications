class User(object):
    id = 0
    fname = ""
    lname = ""
    mail = ""
    password = ""
    type = 0

    def __init__(self, id, fname, lname, mail, password, type):
        self.id = id
        self.fname = fname
        self.lname = lname
        self.mail = mail
        self.password = password
        self.type = type