from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_mysqldb import MySQL
from server.userClass import User
from server.database.dbClass import Database
import hashlib


app = Flask(__name__)
api = Api(app)
db = Database()
# skusanie ci funguje ... funguje :D
# @app.route('/get_messages', methods = ['POST'])
# def get_messages():
#     json = request.get_json()
#     if json['user'] == "larry":
#         return jsonify({'messages':['test1', 'test2']})
#
#     return jsonify({'error':' no user found'})


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    if email == "" or email is None and password == "" or password is None:
        return jsonify({"message": "blud"})

    # encoding the password
    # encoder = hashlib.md5()
    # encoder.update(password.encode('utf-8'))
    # password2 = encoder.hexdigest()
    # print(password2)


    #overenie usera
    user = db.Login(email=email, password=password)
    print("userLogin")
    print(user)

    return 'login'


# @app.route('/register', methods = ['POST'])
# def login():
#     return 'register'
#
#
# @app.route('/logout', methods = ['POST'])
# def login():
#     return 'logout'


if __name__ == '__main__':
    app.run(debug=True)