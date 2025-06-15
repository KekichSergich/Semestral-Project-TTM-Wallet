import { getFromLocalStorage } from "../storage/storage.js";

// Updates the total balance amount displayed on the page (in USD)
export function updateBalanceAmount() {
    // Get saved crypto notes and price info from localStorage
    const notes = getFromLocalStorage("storedCryptoNotes") || [];
    const cryptoInfo = getFromLocalStorage("CryptoListInfo") || [];

    // Aggregate amounts by crypto symbol
    const amountsBySymbol = {};
    for (const note of notes) {
        const symbol = note.name.toLowerCase();
        const amount = parseFloat(note.amount) || 0;

        if (!amountsBySymbol[symbol]) amountsBySymbol[symbol] = 0;
        amountsBySymbol[symbol] += amount;
    }

    let totalUSD = 0;

    // Convert each crypto amount to USD using the current price
    for (const [symbol, amount] of Object.entries(amountsBySymbol)) {
        const coin = cryptoInfo.find(c => c.symbol.toLowerCase() === symbol);
        const currentPrice = coin ? parseFloat(coin.current_price) : 0;

        if (!isNaN(currentPrice)) {
            totalUSD += amount * currentPrice;
        }
    }

    // Display the total USD amount in the designated container
    const amountContainer = document.querySelector(".amount_area h3");
    if (amountContainer) {
        amountContainer.textContent = `${totalUSD.toFixed(2)}$`;
    }
}

// Automatically update balance when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateBalanceAmount();
});
