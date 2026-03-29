const BASE_URL = "http://127.0.0.1:8000";

// -------- BASIC TRAIN --------
async function trainModel() {
    const file = document.getElementById("fileUpload").files[0];
    const task = document.getElementById("task").value;
    const algo = document.getElementById("algorithm").value;

    let formData = new FormData();
    formData.append("file", file);
    formData.append("task", task);
    formData.append("algorithm", algo);

    let res = await fetch(`${BASE_URL}/train/`, {
        method: "POST",
        body: formData
    });

    let data = await res.json();
    document.getElementById("result").innerHTML = "Accuracy: " + data.accuracy;
}

// -------- AUTOML --------
async function trainAuto() {
    const file = document.getElementById("fileUpload").files[0];

    let formData = new FormData();
    formData.append("file", file);

    let res = await fetch(`${BASE_URL}/train_auto/`, {
        method: "POST",
        body: formData
    });

    let data = await res.json();

    let output = `<h3>Best Model: ${data.best_model}</h3>`;

    for (let model in data.results) {
        let r = data.results[model];
        output += `
        <p><b>${model}</b><br>
        Accuracy: ${r.accuracy}<br>
        Precision: ${r.precision}<br>
        Recall: ${r.recall}<br>
        F1: ${r.f1}</p>`;
    }

    document.getElementById("result").innerHTML = output;
}

// -------- PREDICT --------
async function predict() {
    const input = document.getElementById("inputValues").value;
    let values = input.split(",").map(Number);

    let res = await fetch(`${BASE_URL}/predict/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ features: values })
    });

    let data = await res.json();
    document.getElementById("result").innerHTML = "🔮 Prediction: " + data.prediction;
}

// -------- DOWNLOAD --------
function downloadModel() {
    window.open(`${BASE_URL}/download/`);
}