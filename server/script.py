import secrets
from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_mysqldb import MySQL
from server.userClass import User
from server.userToken import UserToken
from server.database.dbClass import Database
from flask_cors import CORS
import hashlib

app = Flask(__name__)
api = Api(app)
CORS(app)
db = Database()

tokens = []
loggedUser = User

# working
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print("LOGIN - vypisujem co mi pride")
    print(data)
    email = data['name']
    print(email)
    password = data['password']
    if email == "" or email is None and password == "" or password is None:
        print(email)
        print(password)
        return jsonify({"status": "Empty email or password"})

    if not email or not password:
        print(email)
        print(password)
        return jsonify({"status": "Wrong email or password"})

    # encoding the password
    # encoder = hashlib.md5()
    # encoder.update(password.encode('utf-8'))
    # password2 = encoder.hexdigest()
    # print(password2)

    # overenie usera
    user = db.Login(email=email, password=password)
    print("userLogin")
    print(user)
    if user is not None:
        # creating User object
        loggedUser = User(id=user[0], fname=user[1], lname=user[2], mail=user[3], password=user[4], type=user[5])
        print(loggedUser.lname)  # control of creating User

        # generating token
        token = secrets.token_urlsafe()
        print("token: " + token)

        client = UserToken(user_id=loggedUser.id, user_token=token, user_login=loggedUser.mail)
        tokens.append(client)  # adding users token and id to

        return token
    else:
        return ""

# working
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print("REGISTER - vypisujem co mi pride ")
    print(data)

    name = data['name']
    surname = data['surname']
    email = data['email']
    password = data['password']
    typeUser = data['type']

    result = db.Register(name=name, surname=surname, email=email, password=password, type=typeUser)
    if result == "OK":
        return jsonify({"status": "OK"})
    else:
        return jsonify({"status": "Not registered"})

# not tried
@app.route("/logout", methods=["POST"])
def logout():
    i = 0
    data = request.get_json()
    print(data['token'])
    for element in tokens:
        if element.user_token == data['token'] and element.user_id == data['id']:
            del tokens[i]
            print("zmazalo token")
            break
        else:
            i += 1
    return jsonify({"status": "OK"})


def getLogin(token, id):
    print(token)
    for element in tokens:
        if element.user_token == token and element.user_id == id:
            login = element.user_login
            print(login)
            return login
    return None


if __name__ == '__main__':
    app.run(debug=True)
