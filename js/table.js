import { clearStorageData } from "./storage.js";
import { loadAndRenderAllCryptoPairs } from "./loadAndRenderAllCryptoPairs.js";
import { triggerOverflowUpdate } from "./overflowObserver.js";
import { updateCryptoChart } from "./charts/drawChart.js";

const resetDataButton = document.getElementById("resetDataButton");

function resetData() {
    // Clear localStorage
    clearStorageData();

    // Re-render crypto pairs if needed
    loadAndRenderAllCryptoPairs();

    // Trigger overflow listener (e.g., for scroll buttons)
    triggerOverflowUpdate();

    // Clear chart area and show "No data" message
    const canvas = document.getElementById("cryptoChartCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#aaa";
    ctx.font = "16px Segoe UI";
    ctx.textAlign = "center";
    ctx.fillText("No data to display", canvas.width / 2, canvas.height / 2);

    // Optionally clear the select dropdown
    const select = document.getElementById("cryptoOptions");
    select.innerHTML = "";
}

resetDataButton.addEventListener("click", resetData);
