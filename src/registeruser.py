from flask_restful import Resource, reqparse
import mysql.connector
from mysql.connector import Error
from user import User


class UserRegister(Resource):
    TABLE_NAME = 'User'

    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )

    def post(self):
        # Get Data from Request Parser
        data = UserRegister.parser.parse_args()

        # Find User in Database
        if User.find_user_by_name(data['username']):
            return {"message": "User with that username already exists."}, 400
        try:
            global connection
            connection = mysql.connector.connect(host='localhost',
                                                 database='restapidb',
                                                 user='root',
                                                 password='root')

            if connection.is_connected():
                print("Connected to MySQL Server version ")
                cursor = connection.cursor()
                # cursor.execute("select database();")
                select_query = "INSERT INTO  Users VALUES(null, %s, %s)"
                cursor.execute(select_query, (data['username'], data['password']))
                connection.commit()
        except Error as e:
            print("Error while connecting to MySQL", e)
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

        return {"username": data['username']}, 201


