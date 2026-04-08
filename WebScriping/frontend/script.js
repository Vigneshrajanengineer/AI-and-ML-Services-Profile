let scrapedData = null;

async function scrapeData() {
    const url = document.getElementById("url").value;
    const type = document.getElementById("type").value;

    if (!url) {
        alert("Please enter a URL");
        return;
    }

    document.getElementById("output").innerText = "⏳ Scraping...";

    try {
        const response = await fetch("https://your-backend-url/scrape", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url, type })
        });

        const data = await response.json();
        scrapedData = data;

        document.getElementById("output").innerText =
            JSON.stringify(data, null, 2);

    } catch (error) {
        document.getElementById("output").innerText =
            "❌ Error: " + error.message;
    }
}

function downloadJSON() {
    if (!scrapedData) {
        alert("No data to download!");
        return;
    }

    const blob = new Blob([JSON.stringify(scrapedData, null, 2)], {
        type: "application/json"
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "scraped_data.json";
    a.click();
}