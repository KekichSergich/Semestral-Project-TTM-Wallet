import { getFromLocalStorage } from "../storage/storage.js";
import { generateColor } from "../utils/generateColor.js";

export function drawPieChart() {
    // Get canvas and context
    const canvas = document.getElementById("cryptoPieCanvas");
    const ctx = canvas.getContext("2d");
    const legendContainer = document.getElementById("pieLegend");

    // Scale canvas for high-DPI displays
    const scale = window.devicePixelRatio || 1;
    const displayWidth = canvas.offsetWidth;
    const displayHeight = canvas.offsetHeight;
    canvas.width = displayWidth * scale;
    canvas.height = displayHeight * scale;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    // Retrieve stored crypto data from local storage
    const storedNotes = getFromLocalStorage("storedCryptoNotes") || [];
    const cryptoInfo = getFromLocalStorage("CryptoListInfo") || [];

    // Clear previous legend
    legendContainer.innerHTML = "";

    // If no data is available, show placeholder message
    if (storedNotes.length === 0 || cryptoInfo.length === 0) {
        drawNoData(ctx, displayWidth, displayHeight);
        return;
    }

    // Step 1: Aggregate total crypto amount per symbol
    const amountBySymbol = {};
    for (const note of storedNotes) {
        const symbol = note.name.toLowerCase();
        const amount = parseFloat(note.amount) || 0;
        if (!amountBySymbol[symbol]) amountBySymbol[symbol] = 0;
        amountBySymbol[symbol] += amount;
    }

    // Step 2: Multiply amount by current price to get value
    const totals = {};
    for (const [symbol, totalAmount] of Object.entries(amountBySymbol)) {
        const coin = cryptoInfo.find(c => c.symbol.toLowerCase() === symbol);
        if (!coin || !coin.current_price) continue;

        const price = parseFloat(coin.current_price);
        if (isNaN(price)) continue;

        const value = totalAmount * price;
        totals[symbol.toUpperCase()] = value;
    }

    // Prepare filtered and formatted data for rendering
    const activeEntries = Object.entries(totals)
        .filter(([_, amount]) => amount > 0)
        .map(([name, amount]) => ({ name, amount, active: true }));

    // If no valid entries, show placeholder
    if (activeEntries.length === 0) {
        drawNoData(ctx, displayWidth, displayHeight);
        return;
    }

    // Generate a unique color for each slice
    const colors = activeEntries.map(() => generateColor());

    const cx = displayWidth / 2;
    const cy = displayHeight / 2;
    const radius = Math.min(displayWidth, displayHeight) / 2 - 10;

    // Draw the pie chart with animation
    function animatePieChart(progress) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const total = activeEntries.filter(e => e.active).reduce((sum, e) => sum + e.amount, 0);
        let startAngle = 0;

        activeEntries.forEach((entry, i) => {
            if (!entry.active) return;

            const angle = (entry.amount / total) * Math.PI * 2;
            const endAngle = startAngle + angle * progress;

            // Draw pie slice
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.fillStyle = colors[i % colors.length];
            ctx.arc(cx, cy, radius, startAngle, endAngle);
            ctx.fill();

            // Calculate and draw percentage label
            const midAngle = startAngle + (endAngle - startAngle) / 2;
            const labelX = cx + Math.cos(midAngle) * radius * 0.6;
            const labelY = cy + Math.sin(midAngle) * radius * 0.6;
            const percent = (entry.amount / total * 100).toFixed(1);

            ctx.fillStyle = "#fff";
            ctx.font = "bold 12px 'Segoe UI'";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`${percent}%`, labelX, labelY);

            startAngle += angle;
        });
    }

    // Animation settings
    const duration = 800;
    const startTime = performance.now();

    function animateFrame(now) {
        const progress = Math.min(1, (now - startTime) / duration);
        animatePieChart(progress);
        if (progress < 1) requestAnimationFrame(animateFrame);
    }

    // Start animation
    requestAnimationFrame(animateFrame);

    // Create interactive legend
    activeEntries.forEach((entry, i) => {
        const color = colors[i % colors.length];

        const item = document.createElement("div");
        item.style.display = "flex";
        item.style.alignItems = "center";
        item.style.marginBottom = "8px";
        item.style.fontSize = "14px";
        item.style.color = "#ddd";
        item.style.cursor = "pointer";

        const colorBox = document.createElement("span");
        colorBox.style.width = "14px";
        colorBox.style.height = "14px";
        colorBox.style.marginRight = "8px";
        colorBox.style.backgroundColor = color;
        colorBox.style.borderRadius = "2px";
        colorBox.style.display = "inline-block";

        const label = document.createElement("span");
        label.textContent = `${entry.name} ($${entry.amount.toFixed(2)})`;

        item.appendChild(colorBox);
        item.appendChild(label);
        legendContainer.appendChild(item);

        // Toggle slice visibility on click
        item.addEventListener("click", () => {
            entry.active = !entry.active;
            item.style.opacity = entry.active ? "1" : "0.4";
            animatePieChart(1);
        });
    });
}

// Draw a placeholder message when there's no data
function drawNoData(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#bbb";
    ctx.font = "600 18px 'Segoe UI'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("No data to display", width / 2, height / 2);
}

// Public function to manually update the pie chart
export function updatePieChart() {
    drawPieChart();
}

// Automatically draw the pie chart when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    drawPieChart();
});
