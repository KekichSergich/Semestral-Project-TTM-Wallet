import { getFromLocalStorage } from "../storage/storage.js";

export function updateBalanceAmount() {
    const notes = getFromLocalStorage("storedCryptoNotes") || [];
    const cryptoInfo = getFromLocalStorage("CryptoListInfo") || [];

    const amountsBySymbol = {};
    for (const note of notes) {
        const symbol = note.name.toLowerCase();
        const amount = parseFloat(note.amount) || 0;
        if (!amountsBySymbol[symbol]) amountsBySymbol[symbol] = 0;
        amountsBySymbol[symbol] += amount;
    }
    let totalUSD = 0;

    for (const [symbol, amount] of Object.entries(amountsBySymbol)) {
        const coin = cryptoInfo.find(c => c.symbol.toLowerCase() === symbol);
        const currentPrice = coin ? parseFloat(coin.current_price) : 0;
        if (!isNaN(currentPrice)) {
            totalUSD += amount * currentPrice;
        }
    }

    const amountContainer = document.querySelector(".amount_area h3");
    if (amountContainer) {
        amountContainer.textContent = `${totalUSD.toFixed(2)}$`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateBalanceAmount();
});