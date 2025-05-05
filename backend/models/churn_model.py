import pickle
import numpy as np

# Load the trained model
model = pickle.load(open('model.pkl', 'rb'))

def predict_churn(features):
    features_array = np.array(features).reshape(1, -1)
    prediction = model.predict(features_array)
    probability = model.predict_proba(features_array)[:, 1]
    return {'churn': bool(prediction[0]), 'probability': probability[0]}
