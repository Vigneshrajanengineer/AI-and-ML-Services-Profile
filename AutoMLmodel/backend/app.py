from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from .model import get_model, get_all_models
from .utils import load_data, split_data
import joblib
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- BASIC TRAIN --------
@app.post("/train/")
async def train_model(file: UploadFile, task: str = Form(...), algorithm: str = Form(...)):
    df = load_data(file.file)

    if task != "clustering":
        X, y = split_data(df, task)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

        model = get_model(task, algorithm)
        model.fit(X_train, y_train)
        score = model.score(X_test, y_test)

    else:
        X, _ = split_data(df, task)
        model = get_model(task, algorithm)
        model.fit(X)
        score = "Clustering Completed"

    os.makedirs("models", exist_ok=True)
    joblib.dump(model, "models/model.pkl")

    return {"accuracy": score}


# -------- AUTOML TRAIN --------
@app.post("/train_auto/")
async def train_auto(file: UploadFile):
    df = pd.read_csv(file.file)

    X = df.iloc[:, :-1]
    y = df.iloc[:, -1]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    models = get_all_models()

    results = {}
    best_model = None
    best_score = 0

    for name, model in models.items():
        model.fit(X_train, y_train)
        preds = model.predict(X_test)

        acc = accuracy_score(y_test, preds)

        results[name] = {
            "accuracy": acc,
            "precision": precision_score(y_test, preds, average='weighted', zero_division=0),
            "recall": recall_score(y_test, preds, average='weighted', zero_division=0),
            "f1": f1_score(y_test, preds, average='weighted', zero_division=0)
        }

        if acc > best_score:
            best_score = acc
            best_model = model

    os.makedirs("models", exist_ok=True)
    joblib.dump(best_model, "models/best_model.pkl")

    return {"best_model": str(best_model), "results": results}


# -------- CONFUSION MATRIX --------
@app.post("/confusion/")
async def confusion(file: UploadFile):
    df = pd.read_csv(file.file)

    X = df.iloc[:, :-1]
    y = df.iloc[:, -1]

    model = joblib.load("models/best_model.pkl")
    preds = model.predict(X)

    cm = confusion_matrix(y, preds)

    return {"matrix": cm.tolist()}


# -------- LIVE PREDICTION --------
class InputData(BaseModel):
    features: list

@app.post("/predict/")
def predict(data: InputData):
    model = joblib.load("models/best_model.pkl")
    prediction = model.predict([data.features])
    return {"prediction": prediction.tolist()}


# -------- DOWNLOAD MODEL --------
@app.get("/download/")
def download_model():
    return FileResponse("models/best_model.pkl", filename="model.pkl")