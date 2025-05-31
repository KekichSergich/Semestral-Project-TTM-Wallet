import { getFromLocalStorage } from '..storage.js';

export function drawPieChart() {
    const canvas = document.getElementById("cryptoPieCanvas");
    const ctx = canvas.getContext("2d");

    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;

    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    const storedNotes = getFromLocalStorage("storedCryptoNotes") || [];

    if (storedNotes.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#bbb";
        ctx.font = "600 18px 'Segoe UI'";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("No data to display", rect.width / 2, rect.height / 2);
        return;
    }

    // Суммируем количество по криптовалютам
    const totals = {};
    for (const note of storedNotes) {
        const name = note.name;
        const amount = parseFloat(note.amount);
        if (!totals[name]) {
            totals[name] = 0;
        }
        totals[name] += amount;
    }

    const entries = Object.entries(totals);
    const totalAmount = entries.reduce((sum, [_, val]) => sum + val, 0);

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) / 2 - 30;

    let startAngle = 0;

    const colors = ["#4fc3f7", "#ff8a65", "#81c784", "#9575cd", "#f06292", "#ffd54f"];

    entries.forEach(([name, amount], i) => {
        const angle = (amount / totalAmount) * Math.PI * 2;
        const endAngle = startAngle + angle;

        // Draw pie slice
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.fillStyle = colors[i % colors.length];
        ctx.arc(cx, cy, radius, startAngle, endAngle);
        ctx.fill();

        // Draw label
        const midAngle = startAngle + angle / 2;
        const labelX = cx + Math.cos(midAngle) * (radius + 20);
        const labelY = cy + Math.sin(midAngle) * (radius + 20);
        ctx.fillStyle = "#fff";
        ctx.font = "12px 'Segoe UI'";
        ctx.textAlign = "center";
        ctx.fillText(`${name.toUpperCase()} (${amount.toFixed(2)})`, labelX, labelY);

        startAngle = endAngle;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    drawPieChart(); // рисуем при загрузке
});