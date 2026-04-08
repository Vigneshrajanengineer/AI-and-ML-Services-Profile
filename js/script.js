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
            const y = ySpacing * (i + 1);
            neurons.push({ x, y, layer: layerIndex });
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
            const pulse = (Math.sin(time * 0.002 + c.offset * 10) + 1) / 2;
            ctx.strokeStyle = `rgba(0,200,255,${pulse})`;
            ctx.stroke();
        });

        neurons.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = "#0078d4";
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate(0);

}
// ================= Carousel =================

const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-track img');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (track && slides.length > 0) {

    let index = 0;

    function updateCarousel() {
        const width = slides[0].clientWidth;
        track.style.transform = `translateX(-${index * width}px)`;
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
}
// ================= Thank You Section =================

const wishBtn = document.getElementById("wishBtn");
const thankYouSection = document.getElementById("thankYouSection");

if (wishBtn) {
    wishBtn.addEventListener("click", function () {

        setTimeout(() => {
            thankYouSection.style.display = "block";
            thankYouSection.scrollIntoView({ behavior: "smooth" });
        }, 800);

    });
}

