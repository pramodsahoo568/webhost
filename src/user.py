import mysql.connector
from mysql.connector import Error


class User:
    def __init__(self, _id, username, password):
        self.id = _id
        self.username = username
        self.password = password

    # This method does not use any of the class member variables , so should be declared as class method
    @classmethod
    def find_user_by_name(cls, username):
        try:
            global connection
            connection = mysql.connector.connect(host='localhost',
                                                 database='restapidb',
                                                 user='root',
                                                 password='root')

            if connection.is_connected():
                print("Connected to MySQL Server version ")
                cursor = connection.cursor()
                #cursor.execute("select database();")

                select_query = "SELECT * FROM Users WHERE username=%s"

                cursor.execute(select_query,(username,))

                row = cursor.fetchone()
                if row:
                    # user = User(row[0], row[1], row[2])
                    user = User(*row)  # Optimisation  , it expands to row[0], row[1], row[2]
                else:
                    print("No User Found...")
                    user = None
                connection.close()
                return user

        except Error as e:
            print("Error while connecting to MySQL", e)
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
                print("MySQL connection is closed")

    @classmethod
    def find_user_by_id(cls, _id):
        print("find_user_by_id...")
        try:
            global connection
            connection = mysql.connector.connect(host='localhost',
                                                 database='restapidb',
                                                 user='root',
                                                 password='root')

            if connection.is_connected():
                print("Connected to MySQL Server version ")
                cursor = connection.cursor()
                cursor.execute("select database();")

                select_query = "SELECT * FROM Users WHERE ID=%s"
                cursor.execute(select_query, (_id,))
                row = cursor.fetchone()
                if row:
                    # user = User(row[0], row[1], row[2])
                    user = User(*row)  # Optimisation  , it expands to row[0], row[1], row[2]
                else:
                    user = None
                connection.close()
                return user

        except Error as e:
            print("Error while connecting to MySQL", e)
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
                print("MySQL connection is closed")
