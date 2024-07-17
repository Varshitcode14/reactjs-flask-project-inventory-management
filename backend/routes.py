from app import app, db
from flask import request, jsonify
from models import Products

# Health check route
@app.route('/')
def home():
    return "Hello, this is the Stock Management API!"

# Get all products
@app.route('/api/products', methods=['GET'])
def get_all_products():
    try:
        products = Products.query.all()
        result = [product.to_json() for product in products]
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Create a product
@app.route('/api/products', methods=['POST'])
def create_product():
    try:
        data = request.json

        required_fields = ['name', 'category', 'description', 'quantity', 'price']
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f'Missing required field: {field}'}), 400

        name = data.get('name')
        category = data.get('category')
        description = data.get('description')
        quantity = data.get('quantity')
        price = data.get('price')

        new_product = Products(name=name, category=category, description=description, quantity=quantity, price=price)
        db.session.add(new_product)
        db.session.commit()

        return ({"msg":"Product Created!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Delete a product
@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    try:
        product = Products.query.get(id)
        if not product:
            return jsonify({"error": "Product not found"}), 404

        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/products/<int:id>', methods=['PATCH'])
def update_product(id):
    try:
        product = Products.query.get(id)
        if product is None:
            return jsonify({"error": "Product not found"}), 404

        data = request.json

        # Update fields if present in the request data, otherwise keep the existing values
        product.name = data.get("name", product.name)
        product.category = data.get("category", product.category)
        product.description = data.get("description", product.description)
        product.quantity = data.get("quantity", product.quantity)
        product.price = data.get("price", product.price)

        db.session.commit()
        return jsonify(product.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500