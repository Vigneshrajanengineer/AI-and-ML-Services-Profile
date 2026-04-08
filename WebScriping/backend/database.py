from pymongo import MongoClient
from config import MONGO_URI, DB_NAME

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

def save_result(url, data):
    db.results.insert_one({
        "url": url,
        "data": data
    })

def get_results():
    return list(db.results.find({}, {"_id": 0}))