import secrets
from flask import Flask, request, jsonify, json, make_response
from flask_restful import Api, Resource, reqparse
from flask_mysqldb import MySQL
from server.userClass import User
from server.userToken import UserToken
from server.database.dbClass import Database
from flask_cors import CORS
from flask_api import status
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

    # encoding the password
    # encoder = hashlib.md5()
    # encoder.update(password.encode('utf-8'))
    # password2 = encoder.hexdigest()
    # print(password2)

    # overenie usera
    verifedEmail = db.VerificationEmail(email=email)
    # print(verifedEmail[0])
    if verifedEmail is None:
        return " Wrong email ", status.HTTP_401_UNAUTHORIZED
    else:
        email = verifedEmail[0]
        verifedPassword = db.VerificationPass(email=email)
        if verifedPassword[0] == password:
            # vyberanie usera
            user = db.Login(email=email, password=password)
            print("userLogin")
            print(user)
            if user is not None:
                # creating User object
                loggedUser = User(id=user[0], fname=user[1], lname=user[2], mail=user[3], password=user[4],
                                  type=user[5])
                print(loggedUser.lname)  # control of creating User

                # generating token
                token = secrets.token_urlsafe()
                print("token: " + token)

                client = UserToken(user_id=loggedUser.id, user_token=token, user_login=loggedUser.mail)
                tokens.append(client)  # adding users token and id to

                print(tokens)

                return jsonify({"token": token})
            else:
                return "", status.HTTP_401_UNAUTHORIZED
        else:
            return "Wrong password ", status.HTTP_401_UNAUTHORIZED


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

# working
@app.route("/logout", methods=["POST"])
def logout():
    i = 0
    data = request.get_json()
    print(data)
    for element in tokens:
        print("cyklus for")
        if element.user_token == data['token'] and element.user_login == data['username']:
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


def isValidTokenAndUsername(token, email):
    print(token)
    print(tokens)
    for element in tokens:
        print(element)
        if element.user_token == token and element.user_login == email:
            return True
    return False


#working
@app.route("/sendForm", methods=["POST"])
def sendForm():
    data = request.get_json()
    print("SEND FORM - vypisujem co mi pride ")
    print(data)
    if data is None:
        return jsonify({"status": "prazdne prislo"}), status.HTTP_401_UNAUTHORIZED
    else:
        name = data['meno']
        result = db.SaveForm(data)
        print(result)
        return jsonify({"status": "OK"}), status.HTTP_200_OK




#working
@app.route("/userinfo", methods=["POST"])
def userinfo():
    token = ""
    email = ""
    if request.is_json:
        data = request.get_json()
        print("USER INFO - vypisujem co mi pride ")
        print(data)
        token = data["token"]
        email = data["name"]
    else:
        return jsonify({"status": "wrong request"})
    if isValidTokenAndUsername(token, email) is True:
        print("dostanem sa tuuuu USERINFO")
        userInfo = db.Userinfo(email=email)
        print(userInfo)

        userInfo2 = jsonify({"id": userInfo[0], "name": userInfo[1], "surname": userInfo[2], "email": userInfo[3], "password": userInfo[4], "type": userInfo[5]})
        print("JSON userinfo")
        print(userInfo2)

        return userInfo2
    else:
        return jsonify({"status": "wrong credentials"}), status.HTTP_401_UNAUTHORIZED


#NESKUSAT
@app.route("/publications", methods=["POST"])
def publications():
    token = ""
    email = ""
    meno = ""
    priezvisko =""
    if request.is_json:
        data = request.get_json()
        print("PUBLICATIONS - vypisujem co mi pride ")
        print(data)
        token = data["token"]
        email = data["name"]
        meno = data["username"]
        priezvisko = data["surname"]
        print("meno a priezvisko")
        print(meno + priezvisko)
    else:
        return jsonify({"status": "wrong request"})
    if isValidTokenAndUsername(token, email) is True:
        print("dostanem sa tuuuu PUBLIKACIE")
        # autor = db.AuthorToPublications(email=email)
        # pubID = autor[2]
        publication = db.Publications(meno=meno, priezvisko=priezvisko)
        print(publication)
        pubs = []

        if publication is None:
            return jsonify({"status": "neexistuje zaznam"}), status.HTTP_200_OK
        else:
            for row in publication:
                print("printim row")
                print(row)
                row2 = jsonify({"id":row[0],"meno":row[1],"priezvisko": row[2],"titul": row[3], "percento":row[4],
                            "doktorand": row[5],"pracovisko": row[6],"ustav": row[7],"kontakt":row[8],"nazov": row[9],
                            "preklad":row[10], "skkey":row[11],"engkey":row[12],"kategoria":row[13],
                            "oblastiVyskumu": row[14],"cislog": row[15],"nazovg":row[16],"doplnokg":row[17],
                            "projektg":row[18],"agenturag":row[19],"www":row[20],"typ":row[21],"rok": row[22],
                            "rozsah": row[23],"isn": row[24],"datum":row[25],"code": row[26],"vstup": row[27],
                            "mon_miesto": row[28], "mon_vydavatelstvo": row[29],"mon_rok": row[30],"mon_rozsah": row[31],
                            "mon_pocetah":row[32],"mon_isbn":row[33],"kap_zdroj":row[34],"kap_miesto" :row[35],
                            "kap_vydavatelstvo": row[36],"kap_rok":row[37],"kap_pocetah":row[38],"kap_od": row[39],
                            "kap_do":row[40],"kap_isbn":row[41],"cas_zdroj":row[42],"cas_rocnik":row[43],
                            "cas_cislo":row[44],"cas_rok":row[45],"cas_od":row[46], "cas_do":row[47], "cas_issn":row[48],
                            "cas_krajina":row[49],"konf_nazov":row[50],"konf_miesto":row[51],"konf_cislo":row[52],
                            "konf_datum":row[53]})
                pubs.append(row2)

            print("json pole")
            print(pubs)
            if not pubs:
                return jsonify({"status": "neexistuje zaznam"}), status.HTTP_200_OK
            else:
                pubs2=json.dumps(pubs)
                return make_response(pubs2,200)

    else:
        return jsonify({"status": "wrong credentials"}), status.HTTP_401_UNAUTHORIZED


#nevyskusane
@app.route("/deletePub", methods=["POST"])
def deletePub():
    token = ""
    email = ""
    nazov = ""
    if request.is_json:
        data = request.get_json()
        print("DELETE - vypisujem co mi pride ")
        print(data)
        token = data["token"]
        email = data["name"]
        nazov = data["nazov"]
    else:
        return jsonify({"status": "wrong request"})
    if isValidTokenAndUsername(token, email) is True:
        print("dostanem sa tuuuu DELETE")
        deleteDone = db.DeletePub(nazov=nazov)
        if deleteDone is "OK":
            return jsonify({"status": "OK"}), status.HTTP_200_OK
        else:
            return jsonify({"status": "nepreslo"}), status.HTTP_401_UNAUTHORIZED
    else:
        return jsonify({"status": "wrong credentials"}), status.HTTP_401_UNAUTHORIZED


#working
@app.route("/updateUser", methods=["POST"])
def updateUser():
    oldName = ""
    name = ""
    surname = ""
    email = ""
    token = ""
    if request.is_json:
        data = request.get_json()
        print("UPDATE USER - vypisujem co mi pride ")
        print(data)
        oldName = data["oldName"]
        name = data["name"]
        surname = data["surname"]
        email = data["email"]
        token = data["token"]
    else:
        return jsonify({"status": "wrong request"})
    if isValidTokenAndUsername(token, email) is True:
        print("dostanem sa tuuuu UPDATE USER")
        update = db.UpdateUser(oldName=oldName,name=name,surname=surname,email=email)
        if update is "OK":
            return jsonify({"status": "OK"}), status.HTTP_200_OK
        else:
            return jsonify({"status": "wrong credentials of updated user"}), status.HTTP_401_UNAUTHORIZED
    else:
        return jsonify({"status": "wrong credentials"}), status.HTTP_401_UNAUTHORIZED


if __name__ == '__main__':
    app.run(debug=True)
