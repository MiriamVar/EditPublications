from flask import Flask, request
from flask_restful import Api, Resource, reqparse
from flask_mysqldb import MySQL
from server.userClass import User
import hashlib


app = Flask(__name__)
api = Api(app)
# skusanie ci funguje ... funguje :D
# @app.route('/get_messages', methods = ['POST'])
# def get_messages():
#     json = request.get_json()
#     if json['user'] == "larry":
#         return jsonify({'messages':['test1', 'test2']})
#
#     return jsonify({'error':' no user found'})


@app.route('/login', methods = ['POST'])
def login():
    data = request.get_json()
    email = data['mail']
    password = data['password']
    if email == User.mail and password == User.password:
        encoder = hashlib.md5()
        encoder.update(password.encode('utf-8'))
        password2 = encoder.hexdigest()
        print(password2)

    if not email or not password:
        return 'not login or password (urobit message)'

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