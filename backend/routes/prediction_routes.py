from flask import Blueprint, request, jsonify
from models.churn_model import predict_churn

predict_bp = Blueprint('predict', __name__)

@predict_bp.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    required_features = ['feature1', 'feature2', 'feature3', 'feature4']  # Modify as per dataset
    features = [data.get(feature, 0) for feature in required_features]
    
    result = predict_churn(features)
    return jsonify(result)
