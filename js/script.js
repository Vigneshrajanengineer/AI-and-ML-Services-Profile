// ================= NEURAL NETWORK =================
const canvas = document.getElementById("neuralCanvas");

if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = 900;
    canvas.height = 400;

    const layers = [4, 6, 3];
    let neurons = [];
    let connections = [];
    const layerSpacing = canvas.width / (layers.length + 1);

    layers.forEach((count, layerIndex) => {
        const x = layerSpacing * (layerIndex + 1);
        const ySpacing = canvas.height / (count + 1);
        for (let i = 0; i < count; i++) {
            neurons.push({ x, y: ySpacing * (i + 1), layer: layerIndex });
        }
    });

    for (let i = 0; i < neurons.length; i++) {
        for (let j = 0; j < neurons.length; j++) {
            if (neurons[j].layer === neurons[i].layer + 1) {
                connections.push({ from: neurons[i], to: neurons[j], offset: Math.random() });
            }
        }
    }

    function animate(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        connections.forEach(c => {
            ctx.beginPath();
            ctx.moveTo(c.from.x, c.from.y);
            ctx.lineTo(c.to.x, c.to.y);
            ctx.strokeStyle = `rgba(0,200,255,${(Math.sin(time*0.002 + c.offset*10)+1)/2})`;
            ctx.stroke();
        });

        neurons.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 8, 0, Math.PI*2);
            ctx.fillStyle = "#0078d4";
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate(0);
}

// ================= CAROUSEL =================
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-track img');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (track) {
    let index = 0;
    function updateCarousel() {
        const width = slides[0].clientWidth;
        track.style.transform = `translateX(-${index * width}px)`;
    }
    nextBtn.onclick = () => { index=(index+1)%slides.length; updateCarousel(); };
    prevBtn.onclick = () => { index=(index-1+slides.length)%slides.length; updateCarousel(); };
}

// ================= THANK YOU BUTTON =================
const wishBtn = document.getElementById("wishBtn");
const thankYouSection = document.getElementById("thankYouSection");

if (wishBtn) {
    wishBtn.onclick = () => {
        setTimeout(()=>{
            thankYouSection.style.display="block";
            thankYouSection.scrollIntoView({behavior:"smooth"});
        },800);
    };
}

// ================= AI FACE + VOICE =================
const aiAgent = document.getElementById("aiAgent");

function speak(text){
    const speech = new SpeechSynthesisUtterance(text);

    aiAgent.style.display="flex";
    aiAgent.classList.add("speaking");

    speech.onend=()=>{
        aiAgent.classList.remove("speaking");
        setTimeout(()=>aiAgent.style.display="none",1000);
    };

    window.speechSynthesis.speak(speech);
}

window.onload = ()=>{
    speak("Welcome to Vignesh AI portfolio website. How can I assist you?");
};

// ================= CHATBOT =================
const chatToggle=document.getElementById("chatToggle");
const chatbotBox=document.getElementById("chatbotBox");
const closeChat=document.getElementById("closeChat");
const sendBtn=document.getElementById("sendBtn");
const userInput=document.getElementById("userInput");
const chatMessages=document.getElementById("chatMessages");

if(chatToggle){
    chatToggle.onclick=()=>chatbotBox.style.display="flex";
    closeChat.onclick=()=>chatbotBox.style.display="none";

    function addMessage(msg,className){
        const div=document.createElement("div");
        div.className=className;
        div.textContent=msg;
        chatMessages.appendChild(div);
        chatMessages.scrollTop=chatMessages.scrollHeight;
    }

    function botReply(text){
        text=text.toLowerCase();
        if(text.includes("profile")) return "Opening profile page.";
        if(text.includes("vision")) return "Computer Vision includes object detection and OCR.";
        return "Please explore the website for more details.";
    }

    sendBtn.onclick=()=>{
        const text=userInput.value.trim();
        if(!text) return;
        addMessage(text,"user-message");
        userInput.value="";
        setTimeout(()=>{
            const reply=botReply(text);
            addMessage(reply,"bot-message");
            speak(reply);
        },600);
    };
}
