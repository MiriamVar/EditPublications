import flask_mysqldb
import mysql.connector
from mysql.connector import pooling
from server.database.config import dbConf


class Database(object):
    def __init__(self):
        self.connection_pool = mysql.connector.pooling.MySQLConnectionPool(
            pool_name="pynative_pool", pool_size=5, pool_reset_session=True,
            host=dbConf["host"], port=dbConf["port"], database=dbConf["database"],
            user=dbConf["user"], password=dbConf["password"])

    connection_pool = mysql.connector.pooling.MySQLConnectionPool(
        pool_name="pynative_pool", pool_size=5, pool_reset_session=True,
        host=dbConf["host"], port=dbConf["port"], database=dbConf["database"],
        user=dbConf["user"], password=dbConf["password"])

    def Login(self, email, password):
        connection_object = self.connection_pool.get_connection()
        if connection_object.is_connected():
            db_info = connection_object.get_server_info()
            print("Connected to MySQL database using connection pool ... MySQL Server version on ", db_info)
            cur1 = connection_object.cursor()
            queryLogin = "select * from pouzivatel where email = %s and password =%s;"
            cur1.execute(queryLogin, (email, password))
            userLogin = cur1.fetchone()
            if connection_object.is_connected():
                cur1.close()
                connection_object.close()
                print("UserLogin from db")
                print(userLogin)
                print("MySQL connection is closed")
                return userLogin

    def VerificationEmail(self, email):
        connection_object = self.connection_pool.get_connection()
        if connection_object.is_connected():
            db_info = connection_object.get_server_info()
            print("Connected to MySQL database using connection pool ... MySQL Server version on ", db_info)
            cur1 = connection_object.cursor()
            queryVerEmail = "select pouzivatel.email from pouzivatel where email = %s;"
            cur1.execute(queryVerEmail, (email,))
            userEmail = cur1.fetchone()
            if connection_object.is_connected():
                cur1.close()
                connection_object.close()
                print("Verified email from db")
                print(userEmail)
                print("MySQL connection is closed")
                return userEmail

    def VerificationPass(self, email):
        connection_object = self.connection_pool.get_connection()
        if connection_object.is_connected():
            db_info = connection_object.get_server_info()
            print("Connected to MySQL database using connection pool ... MySQL Server version on ", db_info)
            cur1 = connection_object.cursor()
            queryVerPass = "select password from pouzivatel where email = %s;"
            cur1.execute(queryVerPass, (email,))
            userPass = cur1.fetchone()
            if connection_object.is_connected():
                cur1.close()
                connection_object.close()
                print("verifed pass from db")
                print(userPass)
                print("MySQL connection is closed")
                return userPass

    def Register(self, name, surname, email, password, type):
        connection_object = self.connection_pool.get_connection()
        if connection_object.is_connected():
            db_info = connection_object.get_server_info()
            print("Connected to MySQL database using connection pool ... MySQL Server version on ", db_info)
            cur = connection_object.cursor()
            queryRegister = "insert into pouzivatel (meno, priezvisko, email, password, typ) values (%s,%s,%s,%s,%s)"
            insert = cur.execute(queryRegister, (name, surname, email, password, type))
            if connection_object.is_connected():
                cur.close()
                connection_object.close()
                print("MySQL connection is closed")
                return "OK"

    def SaveForm(self, data):
        connection_object = self.connection_pool.get_connection()
        if connection_object.is_connected():
            db_info = connection_object.get_server_info()
            print("Connected to MySQL database using connection pool ... MySQL Server version on ", data)
            cur = connection_object.cursor()
            queryForm = "insert into publikacie (meno, priezvisko, titul, percento, doktorand, pracovisko, ustav, " \
                        "kontakt, nazov, preklad, skkey, engkey, kategoria, oblastVyskumu, cislog, nazovg, " \
                        "doplnokg, projektg, agenturag, www, typ, rok, rozsah, isn, datum, code, vstup, " \
                        "mon_miesto, mon_vydavatelstvo, mon_rok, mon_rozsah, mon_pocetah, mon_isbn, kap_zdroj, " \
                        "kap_miesto, kap_vydavatelstvo, kap_rok, kap_pocetah, kap_od, kap_do, kap_isbn, " \
                        "cas_zdroj, cas_rocnik, cas_cislo, cas_rok, cas_od, cas_do, cas_issn, cas_krajina, " \
                        "konf_nazov, konf_miesto, konf_cislo, konf_datum) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s," \
                        "%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s," \
                        "%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            insert = cur.execute(queryForm, (data['meno'], data['priezvisko'], data['titul'], data['percento'],
                                             data['doktorand'], data['pracovisko'],data['ustav'], data['kontakt'],
                                             data['nazov'], data['preklad'], data['skkey'], data['engkey'],
                                             data['kategoria'], data['oblastVyskumu'], data['cislog'], data['nazovg'],
                                             data['doplnokg'], data['projektg'], data['agenturag'], data['www'],
                                             data['typ'], data['rok'],data['rozsah'], data['isn'], data['datum'],
                                             data['code'], data['vstup'], data['mon_miesto'],data['mon_vydavatelstvo'],
                                             data['mon_rok'], data['mon_rozsah'], data['mon_pocetah'],data['mon_isbn'],
                                             data['kap_zdroj'], data['kap_miesto'], data['kap_vydavatelstvo'],
                                             data['kap_rok'], data['kap_pocetah'], data['kap_od'], data['kap_do'],
                                             data['kap_isbn'], data['cas_zdroj'], data['cas_rocnik'], data['cas_cislo'],
                                             data['cas_rok'], data['cas_od'],data['cas_do'], data['cas_issn'],
                                             data['cas_krajina'], data['konf_nazov'],data['konf_miesto'],
                                             data['konf_cislo'],data['konf_datum']))
            if connection_object.is_connected():
                cur.close()
                connection_object.close()
                print("MySQL connection is closed")
                return "OK"

    def InsertAutorAndPublication(self, email, id):
        connection_object = self.connection_pool.get_connection()
        if connection_object.is_connected():
            db_info = connection_object.get_server_info()
            print("Connected to MySQL database using connection pool ... MySQL Server version on ", db_info)
            cur1 = connection_object.cursor()
            queryInsertAutor = "insert into autor_publikacie columns(username,publikaciaID) values(%,%s);"
            cur1.execute(queryInsertAutor, (email,id))
            autorInsert = cur1.fetchone()
            if connection_object.is_connected():
                cur1.close()
                connection_object.close()
                print("MySQL connection is closed")
                return "OK"

    def Userinfo(self, email):
        connection_object = self.connection_pool.get_connection()
        if connection_object.is_connected():
            db_info = connection_object.get_server_info()
            print("Connected to MySQL database using connection pool ... MySQL Server version on ", db_info)
            cur1 = connection_object.cursor()
            queryUserInfo = "select * from pouzivatel where email = %s;"
            cur1.execute(queryUserInfo, (email,))
            userInfo = cur1.fetchone()
            if connection_object.is_connected():
                cur1.close()
                connection_object.close()
                print("UserInfo from db")
                print(userInfo)
                print("MySQL connection is closed")
                return userInfo

    def AuthorToPublications(self, email):
        connection_object = self.connection_pool.get_connection()
        if connection_object.is_connected():
            db_info = connection_object.get_server_info()
            print("Connected to MySQL database using connection pool ... MySQL Server version on ", db_info)
            cur1 = connection_object.cursor()
            queryAutor = "select * from autor_publikacie where username = %s;"
            cur1.execute(queryAutor, (email,))
            autorInfo = cur1.fetchone()
            if connection_object.is_connected():
                cur1.close()
                connection_object.close()
                print("AutorInfo from db")
                print(autorInfo)
                print("MySQL connection is closed")
                return autorInfo

    def Publications(self, meno):
        connection_object = self.connection_pool.get_connection()
        if connection_object.is_connected():
            db_info = connection_object.get_server_info()
            print("Connected to MySQL database using connection pool ... MySQL Server version on ", db_info)
            cur1 = connection_object.cursor()
            queryPublications = "select * from publikacie where meno = %s;"
            cur1.execute(queryPublications, (meno,))
            publications = cur1.fetchone()
            if connection_object.is_connected():
                cur1.close()
                connection_object.close()
                print("Publications from db")
                print(publications)
                print("MySQL connection is closed")
                return publications

    def DeletePub(self, nazov):
        connection_object = self.connection_pool.get_connection()
        if connection_object.is_connected():
            db_info = connection_object.get_server_info()
            print("Connected to MySQL database using connection pool ... MySQL Server version on ", db_info)
            cur1 = connection_object.cursor()
            deletePub = "delete from publikacie where meno = %s"
            cur1.execute(deletePub, (nazov,))
            deletePub= cur1.fetchone()
            if connection_object.is_connected():
                cur1.close()
                connection_object.close()
                print("MySQL connection is closed")
                return "OK"

    def UpdateUser(self, oldName, name, surname, email):
        connection_object = self.connection_pool.get_connection()
        if connection_object.is_connected():
            db_info = connection_object.get_server_info()
            print("Connected to MySQL database using connection pool ... MySQL Server version on ", db_info)
            cur4 = connection_object.cursor()
            queryChangeUser = "update pouzivatel set meno= %s, priezvisko= %s, email= %s where email = %s"
            update = cur4.execute(queryChangeUser, (name, surname, email, oldName))
            print("vypisujem update")
            print("affected rows = {}".format(cur4.rowcount))
            if (connection_object.is_connected()):
                cur4.close()
                connection_object.close()
                print("MySQL connection is closed")
                print("changing done")
                return "OK"