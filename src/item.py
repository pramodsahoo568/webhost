from flask import Flask, request
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import jwt_required


import mysql.connector
from mysql.connector import Error

from registeruser import UserRegister


# class student inherit Student.
class Item(Resource):
    @jwt_required
    def get(self, name):
        '''for item in items:
            if item['name'] == name:
                return item
        '''
        # Replace above for loop with optimised filter and lambda
        item = self.find_item_by_name(name)
        if item:
            return item
        return {"Message:": "Item Not Found"}, 404


    def find_item_by_name(self, name):
        connection = mysql.connector.connect(host='localhost',
                                             database='restapidb',
                                             user='root',
                                             password='root')

        if connection.is_connected():
            print("Connected to MySQL Server version ")
            cursor = connection.cursor()
            # cursor.execute("select database();")

            select_query = "SELECT * FROM Items WHERE name=%s"

            cursor.execute(select_query, (name,))

            row = cursor.fetchone()
            connection.close()
            if row:
                # user = User(row[0], row[1], row[2])
                # item = User(*row)  # Optimisation  , it expands to row[0], row[1], row[2]
                return {"Item": {"name": row[0], "price": row[1]}}

    def post(self, name):
        data = request.get_json()
        item = self.insert_item(data, name)
        if item:
            return  item, 201

        return {"message": "An error occurred inserting the item."}, 500 # 201 for Resource Created

    def insert_item(self,data,name):
        item = {'name': name, 'price': data['price']}
        # items.append(item)
        # for bad request return 400
        global connection
        connection = mysql.connector.connect(host='localhost',
                                             database='restapidb',
                                             user='root',
                                             password='root')

        if connection.is_connected():
            print("Connected to MySQL Server version ")
            cursor = connection.cursor()
            query = "INSERT INTO Items (name, price) VALUES (%s, %s)"  # ID is  Primary Key , No need to send value
            cursor.execute(query, (name, data['price']))
            connection.commit()
            connection.close()
            return  item

    def delete(self, name):
        connection = mysql.connector.connect(host='localhost',
                                             database='restapidb',
                                             user='root',
                                             password='root')
        if connection.is_connected():
            print("Connected to MySQL Server version ")
            cursor = connection.cursor()
            # cursor.execute("select database();")

            select_query = "DELETE FROM Items WHERE name=%s"
            cursor.execute(select_query, (name,))
            connection.commit()
            connection.close()
            return {"message": "Item Deleted..."}

    # Put used to create Resource if not Exist, Update  the Resource if Resource Exist.
    def put(self, name):
        parser = reqparse.RequestParser()
        # Used for Json Payload data Validation
        parser.add_argument(
            'price', type=float,
            required=True,
            help='This field can not be Blank'
        )
        data = parser.parse_args()
        item = self.find_item_by_name(name)
        # Create a New Item if Item is None
        if item is None:
            self.insert_item(data,name)
            item = {'name': name, 'price': data['price']}
            return item
        else:
            self.update_item(data,name)
            item = {'name': name, 'price': data['price']}
            return item

    def update_item(self,data,name):
        connection = mysql.connector.connect(host='localhost',
                                             database='restapidb',
                                             user='root',
                                             password='root')
        if connection.is_connected():
            print("Connected to MySQL Server version ")
            cursor = connection.cursor()
            # cursor.execute("select database();")

            select_query = "UPDATE  Items  SET price=%s WHERE name=%s"
            cursor.execute(select_query, (data['price'],name,))
            connection.commit()
            connection.close()



class ItemList(Resource):
    def get(self):
        print('Itemlist get..')
        connection = mysql.connector.connect(host='localhost',
                                             database='restapidb',
                                             user='root',
                                             password='root')

        if connection.is_connected():
            print("Connected to MySQL Server version ")
            cursor = connection.cursor()
            select_query = "SELECT * FROM Items"
            cursor.execute(select_query)
            rows = cursor.fetchall()
            items = []
            for row in rows:
                items.append({'name':row[0], 'price':row[1]})
            connection.close()
            return {'items': items}
