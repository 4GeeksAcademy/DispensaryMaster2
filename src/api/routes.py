from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token
from datetime import datetime, timedelta
from api.models import db, User, Product, Customer, Order, OrderItem, Invoice
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from marshmallow import Schema, fields, validate, ValidationError
from reportlab.pdfgen import canvas
from flask_cors import CORS

# Create Blueprint
api = Blueprint('api', __name__)
CORS(api, resources={r"/api/*": {"origins": "https://shiny-broccoli-q79pvgr4wqp72qx9-3000.app.github.dev"}})

# ---------------------
# Error Handling Helper
# ---------------------
def handle_errors(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except ValidationError as e:
            return jsonify({"error": "Validation error", "details": e.messages}), 400
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    return decorated_function

# ---------------------
# Validation Schemas
# ---------------------
class ProductSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    category = fields.Str(required=True)
    current_stock = fields.Integer(required=True, validate=validate.Range(min=0))
    reorder_point = fields.Integer(required=True, validate=validate.Range(min=0))
    unit_price = fields.Decimal(required=True, validate=validate.Range(min=0))

class CustomerSchema(Schema):
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    email = fields.Email(required=True)
    phone = fields.Str(required=True)

class OrderSchema(Schema):
    customer_id = fields.Integer(required=True)
    items = fields.List(fields.Dict(keys=fields.Str(), values=fields.Int()), required=True)

# ---------------------
# Authentication Routes
# ---------------------
@api.route('/login', methods=['POST'])
@handle_errors
def login():
    data = request.json
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing email or password"}), 400

    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        token = create_access_token(identity=user.id)
        return jsonify({"message": "Login successful", "access_token": token, "user": user.serialize()}), 200
    return jsonify({"error": "Invalid email or password"}), 401

@api.route("/signup", methods=["POST"])
def create_signup():
    try:
        # Extract email, password, and role from the request
        email = request.json.get("email")
        password = request.json.get("password")
        role_name = request.json.get("role", "customer")  # Default role is "user" if not provided

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Check if user already exists
        if User.query.filter_by(email=email).first():
            return jsonify({"error": "User already exists"}), 400

        # Fetch the role from the database
        # role = Role.query.filter_by(name=role_name).first()
        # if not role:
        #     return jsonify({"error": "Invalid role"}), 400

        # Create a new user
        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password=hashed_password, role=role_name, is_active=False)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully", "user": new_user.serialize()}), 201
    except Exception as e:
        api.logger.error(f"Signup error: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500


# @api.route("/roles", methods=["GET"])
# def get_roles():
#     roles = Role.query.all()
#     return jsonify([role.serialize() for role in roles]), 200


# @api.route('/roles/seed', methods=['POST'])
# def seed_roles():
#     roles = [
#         {"id": 1, "name": "admin", "description": "Full access to the system."},
#         {"id": 2, "name": "user", "description": "Standard user with basic access."},
#         {"id": 3, "name": "manager", "description": "Elevated privileges to manage specific features."},
#         {"id": 4, "name": "guest", "description": "Limited access for viewing information."},
#     ]
    
#     for role_data in roles:
#         if not Role.query.filter_by(id=role_data["id"]).first():
#             role = Role(**role_data)
#             db.session.add(role)

#     db.session.commit()
#     return jsonify({"message": "Roles seeded successfully"}), 201

# @api.route("/admin-only", methods=["GET"])
# @jwt_required()
# def admin_only():
#     try:
#         user_id = get_jwt_identity()
#         user = User.query.get(user_id)

#         if not user or user.role.name != "admin":
#             return jsonify({"error": "Access denied"}), 403

#         return jsonify({"message": "Welcome, admin!"}), 200
#     except Exception as e:
#         api.logger.error(f"Admin-only access error: {str(e)}")
#         return jsonify({"error": "Internal Server Error"}), 500

# @api.route("/users/<int:user_id>/role", methods=["PUT"])
# @jwt_required()
# def update_user_role(user_id):
#     try:
#         new_role_name = request.json.get("role")
#         if not new_role_name:
#             return jsonify({"error": "Role name is required"}), 400

#         user = User.query.get_or_404(user_id)
#         new_role = Role.query.filter_by(name=new_role_name).first()

#         if not new_role:
#             return jsonify({"error": "Invalid role"}), 400

#         user.role_id = new_role.id
#         db.session.commit()

#         return jsonify({"message": "User role updated successfully", "user": user.serialize()}), 200
#     except Exception as e:
#         api.logger.error(f"Role update error: {str(e)}")
#         return jsonify({"error": "Internal Server Error"}), 500



# ---------------------
# Product Routes
# ---------------------
@api.route('/products', methods=['GET'])
@jwt_required()
@handle_errors
def get_products():
    products = Product.query.all()
    return jsonify([product.serialize() for product in products]), 200

@api.route('/products/<int:id>', methods=['GET'])
@jwt_required()
@handle_errors
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.serialize()), 200

@api.route('/products', methods=['POST'])
@jwt_required()
@handle_errors
def create_product():
    schema = ProductSchema()
    data = schema.load(request.json)
    product = Product(**data)
    db.session.add(product)
    db.session.commit()
    return jsonify(product.serialize()), 201

@api.route('/products/<int:id>', methods=['PUT'])
@jwt_required()
@handle_errors
def update_product(id):
    schema = ProductSchema()
    product = Product.query.get_or_404(id)
    data = schema.load(request.json, partial=True)
    for key, value in data.items():
        setattr(product, key, value)
    db.session.commit()
    return jsonify(product.serialize()), 200

@api.route('/products/<int:id>', methods=['DELETE'])
@jwt_required()
@handle_errors
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200

# ---------------------
# Customer Routes
# ---------------------
@api.route('/customers', methods=['GET'])
@jwt_required()
@handle_errors
def get_customers():
    customers = Customer.query.all()
    return jsonify([customer.serialize() for customer in customers]), 200

@api.route('/customers/<int:id>', methods=['GET'])
@jwt_required()
@handle_errors
def get_customer(id):
    customer = Customer.query.get_or_404(id)
    return jsonify(customer.serialize()), 200

@api.route('/customers', methods=['POST'])
@jwt_required()
@handle_errors
def create_customer():
    schema = CustomerSchema()
    data = schema.load(request.json)
    if Customer.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400
    customer = Customer(**data)
    db.session.add(customer)
    db.session.commit()
    return jsonify(customer.serialize()), 201

@api.route('/patients', methods=['POST'])
def add_patient():
    data = request.json
    new_patient = Patient(**data)
    db.session.add(new_patient)
    db.session.commit()
    return jsonify(new_patient.serialize()), 201

@api.route('/patients/<int:id>', methods=['GET'])
def get_patient(id):
    patient = Patient.query.get_or_404(id)
    return jsonify(patient.serialize()), 200

@api.route('/prescriptions', methods=['POST'])
def create_prescription():
    data = request.json
    new_prescription = Prescription(**data)
    db.session.add(new_prescription)
    db.session.commit()
    return jsonify(new_prescription.serialize()), 201


# ---------------------
# Order Routes
# ---------------------
@api.route('/orders', methods=['GET'])
@jwt_required()
@handle_errors
def get_orders():
    orders = Order.query.all()
    return jsonify([order.serialize() for order in orders]), 200

@api.route('/orders/<int:id>', methods=['GET'])
@jwt_required()
@handle_errors
def get_order(id):
    order = Order.query.get_or_404(id)
    return jsonify(order.serialize()), 200

@api.route('/orders', methods=['POST'])
@jwt_required()
@handle_errors
def create_order():
    schema = OrderSchema()
    data = schema.load(request.json)
    order = Order(customer_id=data['customer_id'], total_amount=0)
    db.session.add(order)
    db.session.flush()  # Get order ID before committing

    total_amount = 0
    for item in data['items']:
        product = Product.query.get_or_404(item['product_id'])
        total_price = product.unit_price * item['quantity']
        order_item = OrderItem(order_id=order.id, product_id=product.id, quantity=item['quantity'], unit_price=total_price)
        db.session.add(order_item)
        total_amount += total_price

    order.total_amount = total_amount
    db.session.commit()
    return jsonify(order.serialize()), 201

@api.route('/purchase', methods=['POST'])
def process_purchase():
    data = request.json
    patient = Patient.query.get(data['patient_id'])
    if patient.expiration_date < datetime.utcnow():
        return jsonify({"error": "Medical card expired"}), 400
    # Continue with purchase processing...

@api.route('/compliance/reports', methods=['GET'])
def generate_compliance_report():
    transactions = Transaction.query.all()
    report = [{
        "id": t.id,
        "order_id": t.order_id,
        "amount": t.amount,
        "date": t.date.isoformat()
    } for t in transactions]
    return jsonify(report), 200

@api.route('/recommendations', methods=['POST'])
def recommend_products():
    symptoms = request.json.get('symptoms', [])
    products = Product.query.filter(Product.medical_benefits.ilike(f"%{symptoms}%")).all()
    return jsonify([p.serialize() for p in products]), 200

@api.route('/education', methods=['GET'])
def get_education():
    resources = Education.query.all()
    return jsonify([r.serialize() for r in resources]), 200

# ---------------------
# Analytics Routes
# ---------------------
@api.route('/analytics', methods=['GET'])
@jwt_required()
@handle_errors
def get_analytics():
    analytics_type = request.args.get('type', 'sales')

    if analytics_type == 'sales':
        orders = Order.query.filter(Order.status == 'completed').all()
        total_sales = sum(float(order.total_amount) for order in orders)
        order_count = len(orders)
        return jsonify({"total_sales": total_sales, "order_count": order_count}), 200
    


    elif analytics_type == 'inventory':
        low_stock_products = Product.query.filter(Product.current_stock <= Product.reorder_point).all()
        return jsonify({"low_stock_count": len(low_stock_products), "low_stock_products": [p.serialize() for p in low_stock_products]}), 200

    else:
        return jsonify({"error": "Invalid analytics type"}), 400
    
@api.route('/analytics/medical', methods=['GET'])
def get_medical_analytics():
    total_patients = Patient.query.count()
    total_prescriptions = Prescription.query.count()
    most_common_conditions = db.session.query(Patient.conditions, db.func.count(Patient.conditions)).group_by(Patient.conditions).all()

    return jsonify({
        "total_patients": total_patients,
        "total_prescriptions": total_prescriptions,
        "most_common_conditions": most_common_conditions,
    }), 200
    

        
# @api.route('/dashboard/metrics', methods=['GET'])
# @jwt_required()
# @handle_errors
# def get_analytics():
#     analytics_type = request.args.get('type', 'sales')

#     if analytics_type == 'sales':
#         orders = Order.query.filter(Order.status == 'completed').all()
#         total_sales = sum(float(order.total_amount) for order in orders)
#         order_count = len(orders)
#         return jsonify({"total_sales": total_sales, "order_count": order_count}), 200

#     elif analytics_type == 'inventory':
#         low_stock_products = Product.query.filter(Product.current_stock <= Product.reorder_point).all()
#         return jsonify({"low_stock_count": len(low_stock_products), "low_stock_products": [p.serialize() for p in low_stock_products]}), 200

#     else:
#         return jsonify({"error": "Invalid analytics type"}), 400
