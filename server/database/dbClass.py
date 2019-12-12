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
            if (connection_object.is_connected()):
                cur1.close()
                connection_object.close()
                print("MySQL connection is closed")
                return userLogin