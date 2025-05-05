from pymongo import MongoClient

client = MongoClient('your_mongodb_uri')
db = client['churn_db']
users_collection = db['users']

def create_user(email, password):
    users_collection.insert_one({'email': email, 'password': password})

def find_user_by_email(email):
    return users_collection.find_one({'email': email})
