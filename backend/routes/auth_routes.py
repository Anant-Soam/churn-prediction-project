from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from models.user_model import find_user_by_email, create_user

auth = Blueprint('auth', __name__)
bcrypt = Bcrypt()

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if find_user_by_email(data['email']):
        return jsonify({'message': 'User already exists'}), 400

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    create_user(data['email'], hashed_pw)
    return jsonify({'message': 'User registered successfully'}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = find_user_by_email(data['email'])

    if user and bcrypt.check_password_hash(user['password'], data['password']):
        access_token = create_access_token(identity=data['email'])
        return jsonify({'access_token': access_token})
    
    return jsonify({'message': 'Invalid credentials'}), 401
