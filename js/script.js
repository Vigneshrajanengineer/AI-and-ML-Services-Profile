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