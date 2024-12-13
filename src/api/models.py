from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

# ---------------------
# User Model
# ---------------------

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password = db.Column(db.String(256), nullable=False)  # Store hashed passwords
    plan_id = db.Column(db.Integer, db.ForeignKey("plan.id"), nullable=True)  # basic, pro, enterprise
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    role = db.Column(db.String(20), nullable=False, default="customer") # 'user', 'admin', etc.
    plan=db.relationship("Plan",back_populates="users")
  
    __table_args__ = (
        db.CheckConstraint(
            role.in_(['admin', 'owner', 'manager', 'employee', 'customer']),
            name='valid_roles'
        ),
    )
    

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "plan_id": self.plan_id,
            "role": self.role
        }

class Plan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    features = db.Column(db.JSON, nullable=False)
    users = db.relationship("User", back_populates="plan")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "features": self.features,
            "users": [user.serialize()for user in self.users]
        }
    
# ---------------------
# Product Model
# ---------------------
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    strain = db.Column(db.String(100), nullable=True)
    thc_content = db.Column(db.Float, nullable=True)
    cbd_content = db.Column(db.Float, nullable=True)
    current_stock = db.Column(db.Integer, nullable=False)
    reorder_point = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Numeric(8, 2), nullable=False)
    supplier = db.Column(db.String(100), nullable=False)
    batch_number = db.Column(db.String(50), nullable=False)
    medical_benefits = db.Column(db.Text, nullable=True)
    test_results = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "strain": self.strain,
            "thc_content": self.thc_content,
            "cbd_content": self.cbd_content,
            "current_stock": self.current_stock,
            "reorder_point": self.reorder_point,
            "unit_price": float(self.unit_price),
            "supplier": self.supplier,
            "batch_number": self.batch_number,
            "test_results": self.test_results,
        }

# ---------------------
# OrderItem Model
# ---------------------
class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Numeric(8, 2), nullable=False)

    order = db.relationship('Order', backref='order_items', lazy=True)
    product = db.relationship('Product', backref='order_items', lazy=True)

    def __repr__(self):
        return f'<OrderItem Order: {self.order_id}, Product: {self.product_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "unit_price": float(self.unit_price),
        }

# ---------------------
# Order Model
# ---------------------
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')  # 'pending', 'completed', etc.
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    customer = db.relationship('Customer', backref='orders', lazy=True)

    def __repr__(self):
        return f'<Order {self.id} - {self.status}>'

    def serialize(self):
        return {
            "id": self.id,
            "customer_id": self.customer_id,
            "total_amount": float(self.total_amount),
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
    
    #PRESCRIPTION MANAGEMENT

class Prescription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    dosage = db.Column(db.String(50), nullable=False)
    frequency = db.Column(db.String(50), nullable=False)
    prescribed_date = db.Column(db.Date, default=datetime.utcnow)

    patient = db.relationship('Patient', backref='prescriptions')
    product = db.relationship('Product', backref='prescriptions')

    def serialize(self):
        return {
            "id": self.id,
            "patient_id": self.patient_id,
            "product_id": self.product_id,
            "dosage": self.dosage,
            "frequency": self.frequency,
            "prescribed_date": self.prescribed_date.isoformat(),
        }

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(100), unique=True, nullable=False)
    customer_name = db.Column(db.String(100), nullable=False)
    payment_method = db.Column(db.String(50))
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

# ---------------------
# Customer Model
# ---------------------
class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    phone = db.Column(db.String(20), nullable=False)
    membership_level = db.Column(db.String(20), nullable=False, default='standard')  # 'standard', 'premium', etc.
    verification_status = db.Column(db.String(20), nullable=False, default='pending')  # 'pending', 'verified'
    preferences = db.Column(db.JSON, nullable=True)

    def __repr__(self):
        return f'<Customer {self.first_name} {self.last_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone": self.phone,
            "membership_level": self.membership_level,
            "verification_status": self.verification_status,
            "preferences": self.preferences,
        }
    
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    medical_card_number = db.Column(db.String(50), unique=True, nullable=False)
    expiration_date = db.Column(db.Date, nullable=False)
    physician_name = db.Column(db.String(100), nullable=False)
    conditions = db.Column(db.Text, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone": self.phone,
            "medical_card_number": self.medical_card_number,
            "expiration_date": self.expiration_date.isoformat(),
            "physician_name": self.physician_name,
            "conditions": self.conditions,
        }

# ---------------------
# Business Model
# ---------------------
class Business(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zip_code = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f'<Business {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code,
        }

# ---------------------
# Compliance Model
# ---------------------
class Compliance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('business.id'), nullable=False)
    licenses = db.Column(db.JSON, nullable=False, default={})
    test_results = db.Column(db.JSON, nullable=False, default={})
    reports = db.Column(db.JSON, nullable=False, default={})
    audits = db.Column(db.JSON, nullable=False, default={})

    business = db.relationship('Business', backref='compliance', lazy=True)

    def __repr__(self):
        return f'<Compliance for Business {self.business.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "business_id": self.business_id,
            "licenses": self.licenses,
            "test_results": self.test_results,
            "reports": self.reports,
            "audits": self.audits,
        }
class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    issue_date = db.Column(db.DateTime, default=db.func.now())
    due_date = db.Column(db.DateTime, nullable=True)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(20), default="unpaid")  # Example: unpaid, paid, overdue

    customer = db.relationship('Customer', backref='invoices')
    order = db.relationship('Order', backref='invoice')

    def serialize(self):
        return {
            "id": self.id,
            "customer_id": self.customer_id,
            "order_id": self.order_id,
            "issue_date": self.issue_date,
            "due_date": self.due_date,
            "total_amount": float(self.total_amount),
            "status": self.status,
        }
    
class Education(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)  # e.g., "Dosing", "Strains"

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "category": self.category,
        }
