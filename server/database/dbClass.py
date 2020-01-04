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
                print("MySQL connection is closed")
                return userLogin

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

    def SaveForm(self, ):
        connection_object = self.connection_pool.get_connection()
        if connection_object.is_connected():
            db_info = connection_object.get_server_info()
            print("Connected to MySQL database using connection pool ... MySQL Server version on ", db_info)
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
            insert = cur.execute(queryForm, ())
            if connection_object.is_connected():
                cur.close()
                connection_object.close()
                print("MySQL connection is closed")
                return "OK"
