async function uploadFile() {
    let file = document.getElementById("fileInput").files[0];
    let formData = new FormData();
    formData.append("file", file);

    let res = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData
    });

    let data = await res.json();
    document.getElementById("dataPreview").innerHTML = data.html;
}

async function handleMissing() {
    await fetch("/handle_missing");
}

async function removeDuplicates() {
    await fetch("/remove_duplicates");
}

async function encode() {
    await fetch("/encode");
}

async function scale() {
    await fetch("/scale");
}

async function download() {
    window.location.href = "/download";
}