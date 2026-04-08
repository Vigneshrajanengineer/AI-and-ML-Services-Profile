from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import ScrapeRequest
from scraper import scrape_data
from database import save_result, get_results

app = FastAPI()

# CORS (IMPORTANT for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Web Scraper API Running"}

@app.post("/scrape")
def scrape(req: ScrapeRequest):
    data = scrape_data(req.url, req.type)

    if "error" not in data:
        save_result(req.url, data)

    return {
        "status": "success",
        "data": data
    }

@app.get("/history")
def history():
    return {
        "results": get_results()
    }