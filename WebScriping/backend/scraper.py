import requests
from bs4 import BeautifulSoup

def scrape_data(url: str, data_type: str):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")

        if data_type == "text":
            return soup.get_text(strip=True)[:3000]

        elif data_type == "links":
            return [a.get("href") for a in soup.find_all("a") if a.get("href")]

        elif data_type == "images":
            return [img.get("src") for img in soup.find_all("img") if img.get("src")]

        elif data_type == "tables":
            tables = []
            for table in soup.find_all("table"):
                rows = []
                for tr in table.find_all("tr"):
                    cols = [td.get_text(strip=True) for td in tr.find_all(["td", "th"])]
                    rows.append(cols)
                tables.append(rows)
            return tables

        else:
            return {"error": "Invalid type"}

    except Exception as e:
        return {"error": str(e)}