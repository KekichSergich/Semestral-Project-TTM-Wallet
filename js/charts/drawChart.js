import { getFromLocalStorage } from '../storage/storage.js';

// Retrieve cumulative amounts for a selected crypto pair
function getCumulativeAmountsForPair(pairName) {
    const storedNotes = getFromLocalStorage("storedCryptoNotes") || [];

    const filtered = storedNotes
        .filter(note => note.name === pairName)
        .map(note => ({ date: note.date, amount: parseFloat(note.amount) }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Calculate cumulative amount over time
    let total = 0;
    return filtered.map(entry => {
        total += entry.amount;
        return { date: entry.date, amount: total };
    }).slice(-14); // Limit to the last 14 records
}

// Render placeholder message when there's no data
function renderNoDataMessage(canvas) {
    const ctx = canvas.getContext("2d");
    const scale = window.devicePixelRatio || 1;

    const container = canvas.parentElement;
    const rect = container?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) {
        console.warn("Canvas container has zero size. Skipping no-data message.");
        return;
    }

    const width = rect.width;
    const height = rect.height;

    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.setTransform(scale, 0, 0, scale, 0, 0); // Apply scale transform

    ctx.fillStyle = "#bbb";
    ctx.font = `${18}px 'Segoe UI', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("No data to display", width / 2, height / 2);
}

// Draw chart axes and labels
function drawAxes(ctx, width, height, padding, graphWidth, graphHeight, data, yScale, xStep) {
    const maxAmount = Math.max(...data.map(d => d.amount), 1);
    const ySteps = 5;
    const stepValue = maxAmount / ySteps;

    // Draw axis lines
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw Y-axis labels and gridlines
    ctx.fillStyle = "#aaa";
    ctx.font = "12px 'Segoe UI'";
    ctx.textAlign = "right";

    for (let i = 0; i <= ySteps; i++) {
        const yVal = stepValue * i;
        const y = height - padding - yVal * yScale;
        ctx.fillText(yVal.toFixed(2), padding - 10, y + 4);

        ctx.beginPath();
        ctx.strokeStyle = "#444";
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Draw X-axis labels (dates)
    ctx.textAlign = "center";
    ctx.fillStyle = "#ddd";
    data.forEach((point, i) => {
        const x = padding + i * xStep;
        ctx.fillText(point.date.slice(5), x, height - padding + 15);
    });
}

// Main function to render the line chart
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = rect.width;
    const height = rect.height;
    const padding = 50;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    const maxAmount = Math.max(...data.map(d => d.amount), 1);
    const xStep = graphWidth / Math.max(1, data.length - 1);
    const yScale = graphHeight / maxAmount;

    const pointCoords = [];
    const duration = 600;
    const startTime = performance.now();

    // Draw animated graph path
    function drawGraphPath(progress) {
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
                const px = prev.x + (x - prev.x) * progress;
                const py = prev.y + (y - prev.y) * progress;
                ctx.lineTo(px, py);
            }
        });

        ctx.stroke();

        // Draw points and labels
        pointCoords.forEach(({ x, y, value }) => {
            ctx.fillStyle = "#4fc3f7";
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#fff";
            ctx.font = "11px 'Segoe UI'";
            ctx.textAlign = "center";
            ctx.fillText(value.toFixed(2), x, y - 10);
        });
    }

    // Animation loop
    function animateLine(now) {
        const progress = Math.min(1, (now - startTime) / duration);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.setTransform(scale, 0, 0, scale, 0, 0);

        drawAxes(ctx, width, height, padding, graphWidth, graphHeight, data, yScale, xStep);
        drawGraphPath(progress);

        if (progress < 1) requestAnimationFrame(animateLine);
    }

    animateLine(startTime);

    // Tooltip-like hover effect
    canvas.onmousemove = (e) => {
        const mouseX = (e.offsetX / canvas.clientWidth) * width;
        const mouseY = (e.offsetY / canvas.clientHeight) * height;

        const hovered = pointCoords.find(p =>
            Math.abs(p.x - mouseX) < 6 && Math.abs(p.y - mouseY) < 6
        );

        canvas.title = hovered ? `${hovered.value.toFixed(2)} BTC` : "";
    };
}

// Update chart when a new crypto pair is selected
export function updateCryptoChart(symbol) {
    const data = getCumulativeAmountsForPair(symbol);
    const canvas = document.getElementById("cryptoChartCanvas");

    if (data.length === 0) {
        renderNoDataMessage(canvas);
    } else {
        drawLineChart(data);
    }
}

// Populate select dropdown and render initial chart
export function refreshCryptoOptions() {
    const select = document.getElementById("cryptoOptions");
    const storedNotes = getFromLocalStorage("storedCryptoNotes") || [];
    const uniquePairs = [...new Set(storedNotes.map(n => n.name))];

    select.innerHTML = "";

    uniquePairs.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name.toUpperCase();
        select.appendChild(option);
    });

    if (uniquePairs.length > 0) {
        updateCryptoChart(uniquePairs[0]);
    } else {
        renderNoDataMessage(document.getElementById("cryptoChartCanvas"));
    }
}

// Initialize on page load
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
        renderNoDataMessage(document.getElementById("cryptoChartCanvas"));
    }

    // Handle change in selected crypto pair
    select.addEventListener("change", () => {
        updateCryptoChart(select.value);
    });

    // Redraw chart on window resize
    window.addEventListener("resize", () => {
        if (select.value) {
            updateCryptoChart(select.value);
        }
    });
});
