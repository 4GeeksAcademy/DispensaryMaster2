"""
This module takes care of starting the API Server, Loading the DB, and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from dotenv import load_dotenv
load_dotenv()



# Set environment
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Enable Cross-Origin Resource Sharing (CORS) with specific origin
CORS(app, resources={r"/*": {"origins": "https://shiny-broccoli-q79pvgr4wqp72qx9-3000.app.github.dev"}})

# JWT Configuration
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 7 * 24 * 60 * 60  # 7 days
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "your_default_secret_key")
JWTManager(app)

# Database Configuration
db_url = os.getenv("DATABASE_URL")
if db_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize Database and Migrations
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Admin Panel Setup
setup_admin(app)

# Custom CLI Commands
setup_commands(app)

# Register Blueprints
app.register_blueprint(api, url_prefix='/api')


# Error Handling
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Sitemap for Development
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Serve Static Files
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Avoid cache memory
    return response

# Additional Feature: Health Check Endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "Server is running"}), 200

# Run the App
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=(ENV == "development"))
