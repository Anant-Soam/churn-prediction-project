from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Configuration
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client["churn_prediction"]
collection = db["customers"]

@app.route("/")
def home():
    return "Flask server is running!"


# User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check if user already exists
    if collection.find_one({'email': data['email']}):
        return jsonify({'message': 'User already exists'}), 400

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    user_data = {
        'full_name': data['full_name'],
        'email': data['email'],
        'password': hashed_pw,
        'phone': data['phone'],
        'age': data['age'],
        'gender': data['gender'],
        'company': data['company']
    }

    collection.insert_one(user_data)
    return jsonify({'message': 'User registered successfully'}), 201


# ✅ Updated User Login (Now Works Correctly!)
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # 🛑 Validate input
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    # 🔍 Find user in MongoDB
    user = collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "Invalid email or password"}), 400  # User not found

    # 🔐 Compare hashed password
    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid email or password"}), 400  # Password incorrect

    # ✅ Generate JWT token
    access_token = create_access_token(identity=email)
    return jsonify({"message": "Login successful", "token": access_token}), 200


# Predict Route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("Received Data:", data)  # ✅ Debugging step

    # Simulate model prediction for testing
    prediction = "Churn" if float(data["monthlyCharges"]) > 50 else "No Churn"
    
    return jsonify({"prediction": prediction})


# Protected Route Example
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'logged_in_as': current_user})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
