import secrets
from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_mysqldb import MySQL
from server.userClass import User
from server.database.dbClass import Database
from flask_cors import CORS
import hashlib


app = Flask(__name__)
api = Api(app)
CORS(app)
db = Database()


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
        response1 = jsonify({"message": "blud"})
        return response1

    # encoding the password
    # encoder = hashlib.md5()
    # encoder.update(password.encode('utf-8'))
    # password2 = encoder.hexdigest()
    # print(password2)


    #overenie usera
    user = db.Login(email=email, password=password)
    print("userLogin")
    print(user)
    if user is not None:
        token = secrets.token_urlsafe()
        print("token: " + token)
        return token
    else:
        return jsonify({"message": "User is None"})


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

    db.Register(name=name, surname=surname, email=email, password=password, type=typeUser)
    return jsonify({"status": "OK"})

#
# @app.route('/logout', methods = ['POST'])
# def login():
#     return 'logout'


if __name__ == '__main__':
    app.run(debug=True)