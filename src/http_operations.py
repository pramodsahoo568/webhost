from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask import  render_template

import os

# init app with Flask
app = Flask(__name__)

dict_temp = {"Temperature": 30}

basedir = os.path.abspath(os.path.dirname(__file__))
print('base dir: ', basedir)
# Database configuration

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'sqltest.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Initialize MarshMallow
marshm = Marshmallow(app)


# Product class/model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    qty = db.Column(db.Integer)

    def __init__(self, name, qty):
        self.name = name
        self.qty = qty


# Product Schema
class ProductSchema(marshm.Schema):
    class Meta:
        fields = ('id', 'name', 'qty')


# init Schema
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)


#create route for Product
@app.route('/product', methods=['POST'])
def add_product():
    print('add_product...')
    print('JSON request: ', request.json)
    name = request.json['name']
    qty = request.json['qty']

    product = Product(name, qty)
    db.session.add(product)
    db.session.commit()
    return product_schema.jsonify(product)


@app.route('/products', methods=['GET'])
def get_products():
    products= Product.query.all()
    result=products_schema.dump(products)
    return jsonify(result)


@app.route('/product/<id>', methods=['GET'])
def get_product(id):
    product= Product.query.get(id)
    return product_schema.jsonify(product)

# update product
@app.route('/product/<id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get(id)

    name = request.json['name']
    qty = request.json['qty']

    product.name = name
    product.qty = qty

    db.session.commit()
    return product_schema.jsonify(product)

#delete product
@app.route('/product/<id>', methods=['DELETE'])
def delete_product(id):
    product= Product.query.get(id)
    db.session.delete(product)
    db.session.commit()
    return product_schema.jsonify(product)

@app.route('/')
def homepage():
    return render_template("index.html")


# Run Server
if __name__ == "__main__":
    app.run(port = 7000, debug=True)

'''
@app.route('/', methods=['GET'])
def getjsondata():
    return jsonify(dict_temp)
'''
