import { getFromLocalStorage } from '../storage.js';

// Extract and compute cumulative amounts for the selected crypto pair
function getCumulativeAmountsForPair(pairName) {
    const storedNotes = getFromLocalStorage("storedCryptoNotes") || [];

    const filtered = storedNotes
        .filter(note => note.name === pairName)
        .map(note => ({ date: note.date, amount: parseFloat(note.amount) }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    let total = 0;
    return filtered.map(entry => {
        total += entry.amount;
        return { date: entry.date, amount: total };
    }).slice(-14);
}

// Render fallback message with HiDPI scaling and proper centering
function renderNoDataMessage(canvas) {
    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;

    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform for accurate centering
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.scale(scale, scale); // Apply scale only to drawing, not to canvas dimensions
    ctx.fillStyle = "#bbb";
    ctx.font = "600 18px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("No data to display", rect.width / 2, rect.height / 2);
}

// Main chart rendering function
function drawLineChart(data) {
    const canvas = document.getElementById("cryptoChartCanvas");
    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();

    const scale = window.devicePixelRatio || 1;
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    const width = rect.width;
    const height = rect.height;
    const padding = 50;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    ctx.clearRect(0, 0, width, height);

    const maxAmount = Math.max(...data.map(d => d.amount), 1);
    const xStep = graphWidth / (data.length - 1);
    const yScale = graphHeight / maxAmount;

    // Draw axes
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw Y axis grid and labels
    const ySteps = 5;
    ctx.fillStyle = "#aaa";
    ctx.font = "12px 'Segoe UI'";
    ctx.textAlign = "right";
    const stepValue = maxAmount / ySteps;

    for (let i = 0; i <= ySteps; i++) {
        const y = height - padding - i * stepValue * yScale;
        ctx.fillText((stepValue * i).toFixed(2), padding - 10, y + 4);
        ctx.beginPath();
        ctx.strokeStyle = "#444";
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Draw X axis labels
    ctx.textAlign = "center";
    ctx.fillStyle = "#ddd";
    data.forEach((point, i) => {
        const x = padding + i * xStep;
        const y = height - padding + 15;
        ctx.fillText(point.date.slice(5), x, y);
    });

    // Line animation
    const pointCoords = [];
    let progress = 0;
    const duration = 600;
    const startTime = performance.now();

    function drawGraphPath(p) {
        ctx.beginPath();
        ctx.strokeStyle = "#bf8fee";
        ctx.lineWidth = 2.5;

        data.forEach((point, i) => {
            const x = padding + i * xStep;
            const y = height - padding - point.amount * yScale;
            pointCoords.push({ x, y, value: point.amount });

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                const prev = pointCoords[i - 1];
                ctx.lineTo(
                    prev.x + (x - prev.x) * p,
                    prev.y + (y - prev.y) * p
                );
            }
        });

        ctx.stroke();

        // Points and labels
        pointCoords.forEach(({ x, y, value }) => {
            ctx.fillStyle = "#4fc3f7";
            ctx.fillRect(x - 2, y - 2, 4, 4);
            ctx.fillStyle = "#fff";
            ctx.font = "11px 'Segoe UI'";
            ctx.textAlign = "center";
            ctx.fillText(value.toFixed(2), x, y - 8);
        });
    }

    function animateLine(now) {
        progress = Math.min(1, (now - startTime) / duration);
        ctx.clearRect(padding, padding, graphWidth, graphHeight);
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        drawGraphPath(progress);

        if (progress < 1) {
            requestAnimationFrame(animateLine);
        }
    }

    animateLine(performance.now());

    // Hover tooltip
    canvas.onmousemove = (e) => {
        const mouseX = (e.offsetX / canvas.clientWidth) * width;
        const mouseY = (e.offsetY / canvas.clientHeight) * height;

        const hovered = pointCoords.find(p =>
            Math.abs(p.x - mouseX) < 6 && Math.abs(p.y - mouseY) < 6
        );

        canvas.title = hovered ? `${hovered.value.toFixed(2)} BTC` : "";
    };
}

export function updateCryptoChart(symbol) {
    const data = getCumulativeAmountsForPair(symbol);
    const canvas = document.getElementById("cryptoChartCanvas");

    if (data.length === 0) {
        renderNoDataMessage(canvas);
    } else {
        drawLineChart(data);
    }
}

export function refreshCryptoOptions() {
    const select = document.getElementById("cryptoOptions");
    const storedNotes = getFromLocalStorage("storedCryptoNotes") || [];

    const uniquePairs = [...new Set(storedNotes.map(n => n.name))];

    // Clear existing options
    select.innerHTML = "";

    // Recreate options
    uniquePairs.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name.toUpperCase();
        select.appendChild(option);
    });

    // If at least one, render chart for the first one
    if (uniquePairs.length > 0) {
        updateCryptoChart(uniquePairs[0]);
    } else {
        const canvas = document.getElementById("cryptoChartCanvas");
        renderNoDataMessage(canvas);
    }
}



document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("cryptoOptions");
    const storedNotes = getFromLocalStorage("storedCryptoNotes") || [];

    const uniquePairs = [...new Set(storedNotes.map(n => n.name))];

    uniquePairs.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name.toUpperCase();
        select.appendChild(option);
    });

    if (uniquePairs.length > 0) {
        updateCryptoChart(uniquePairs[0]);
    } else {
        const canvas = document.getElementById("cryptoChartCanvas");
        renderNoDataMessage(canvas);
    }

    select.addEventListener("change", () => {
        updateCryptoChart(select.value);
    });
});
