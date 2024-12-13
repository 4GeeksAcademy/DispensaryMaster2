# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask import Blueprint, request, jsonify
# from app.models import Product
# from app.db import db

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# # Assuming the Product model is already defined as provided earlier
# # Initialize the database
# db.create_all()

# # ---------------------
# # Add a New Product
# # ---------------------
# @app.route('/api/products', methods=['POST'])
# def add_product():
#     data = request.json
#     try:
#         product = Product(
#             name=data['name'],
#             category=data['category'],
#             strain=data.get('strain'),
#             thc_content=data.get('thc_content'),
#             cbd_content=data.get('cbd_content'),
#             current_stock=data['current_stock'],
#             reorder_point=data['reorder_point'],
#             unit_price=data['unit_price'],
#             supplier=data['supplier'],
#             batch_number=data['batch_number'],
#             test_results=data.get('test_results')
#         )
#         db.session.add(product)
#         db.session.commit()
#         return jsonify(product.serialize()), 201
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# # ---------------------
# # Update a Product
# # ---------------------
# @app.route('/api/products/<int:product_id>', methods=['PUT'])
# def update_product(product_id):
#     data = request.json
#     product = Product.query.get(product_id)
#     if not product:
#         return jsonify({"error": "Product not found"}), 404
#     try:
#         product.name = data.get('name', product.name)
#         product.category = data.get('category', product.category)
#         product.strain = data.get('strain', product.strain)
#         product.thc_content = data.get('thc_content', product.thc_content)
#         product.cbd_content = data.get('cbd_content', product.cbd_content)
#         product.current_stock = data.get('current_stock', product.current_stock)
#         product.reorder_point = data.get('reorder_point', product.reorder_point)
#         product.unit_price = data.get('unit_price', product.unit_price)
#         product.supplier = data.get('supplier', product.supplier)
#         product.batch_number = data.get('batch_number', product.batch_number)
#         product.test_results = data.get('test_results', product.test_results)
#         db.session.commit()
#         return jsonify(product.serialize()), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# # ---------------------
# # Delete a Product
# # ---------------------
# @app.route('/api/products/<int:product_id>', methods=['DELETE'])
# def delete_product(product_id):
#     product = Product.query.get(product_id)
#     if not product:
#         return jsonify({"error": "Product not found"}), 404
#     try:
#         db.session.delete(product)
#         db.session.commit()
#         return jsonify({"message": "Product deleted"}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# # ---------------------
# # Get All Products
# # ---------------------
# @app.route('/api/products', methods=['GET'])
# def get_products():
#     products = Product.query.all()
#     return jsonify([product.serialize() for product in products]), 200

# # ---------------------
# # Get Low-Stock Alerts
# # ---------------------
# @app.route('/api/products/low-stock', methods=['GET'])
# def get_low_stock_products():
#     low_stock_products = Product.query.filter(Product.current_stock <= Product.reorder_point).all()
#     return jsonify([product.serialize() for product in low_stock_products]), 200

# if __name__ == '__main__':
#     app.run(debug=True)
