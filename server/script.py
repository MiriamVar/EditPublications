import secrets
from flask import Flask, request, jsonify, json
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

        if publication is None:
            return jsonify({"status": "neexistuje zaznam"}), status.HTTP_401_UNAUTHORIZED
        else:
            pubs = jsonify({"id":publication[0],"meno":publication[1],"priezvisko": publication[2],"titul": publication[3], "percento":publication[4],
                            "doktorand": publication[5],"pracovisko": publication[6],"ustav": publication[7],"kontakt":publication[8],
                            "nazov": publication[9],"preklad":publication[10], "skkey":publication[11],"engkey":publication[12],
                            "kategoria":publication[13], "oblastiVyskumu": publication[14],"cislog": publication[15],"nazovg":publication[16],
                            "doplnokg":publication[17],"projektg":publication[18],"agenturag":publication[19],"www":publication[20],
                            "typ":publication[21],"rok": publication[22],"rozsah": publication[23],"isn": publication[24],"datum":publication[25],
                            "code": publication[26],"vstup": publication[27],"mon_miesto": publication[28], "mon_vydavatelstvo": publication[29],
                            "mon_rok": publication[30],"mon_rozsah": publication[31],"mon_pocetah":publication[32],"mon_isbn":publication[33],
                            "kap_zdroj":publication[34],"kap_miesto" :publication[35],"kap_vydavatelstvo": publication[36],"kap_rok":publication[37],
                            "kap_pocetah":publication[38],"kap_od": publication[39], "kap_do":publication[40],"kap_isbn":publication[41],
                            "cas_zdroj":publication[42],"cas_rocnik":publication[43],"cas_cislo":publication[44],"cas_rok":publication[45],
                            "cas_od":publication[46], "cas_do":publication[47], "cas_issn":publication[48], "cas_krajina":publication[49],
                            "konf_nazov":publication[50],"konf_miesto":publication[51],"konf_cislo":publication[52],"konf_datum":publication[53]})
            print(pubs)
            return pubs, status.HTTP_200_OK

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
        print("USER INFO - vypisujem co mi pride ")
        print(data)
        token = data["token"]
        email = data["name"]
        nazov = data["nazov"]
    else:
        return jsonify({"status": "wrong request"})
    if isValidTokenAndUsername(token, email) is True:
        print("dostanem sa tuuuu USERINFO")
        deleteDone = db.DeletePub(nazov=nazov)
        if deleteDone is "OK":
            return jsonify({"status": "OK"}), status.HTTP_200_OK
        else:
            return jsonify({"status": "vazba user a publiakacie nie je"}), status.HTTP_401_UNAUTHORIZED
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
