import { clearStorageData, getFromLocalStorage } from "../storage/storage.js";
import { renderAllCryptoPairs } from "../utils/renderAllCryptoPairs.js";
import { triggerOverflowUpdate } from "../utils/overflowObserver.js";
import { updateCryptoChart } from "../charts/drawChart.js";
import { updatePieChart } from "../charts/drawPieChart.js";
import { updateBalanceAmount } from "../utils/updateBalance.js";

const resetDataButton = document.querySelectorAll(".resetButton");

function resetData() {

    let cryptoNotes = getFromLocalStorage("storedCryptoNotes");
    let symbols = cryptoNotes.map(note => note.name);
    console.log(symbols)

    document.querySelectorAll(".tableNotes").forEach(tbody => {
        tbody.innerHTML = "";
    });
    // Clear localStorage
    clearStorageData();

    // Re-render crypto pairs if needed
    renderAllCryptoPairs();

    // Trigger overflow listener (e.g., for scroll buttons)
    triggerOverflowUpdate();

    symbols.forEach(symbol => {
        updateCryptoChart(symbol);
    });

    updatePieChart();

    updateBalanceAmount();
}

resetDataButton.forEach(button => {
  button.addEventListener("click", resetData);
});
