import { CryptoPair } from '../components/CryptoPair.js';
import { getFromLocalStorage, saveCryptoPairToLocalStorage } from '../storage/storage.js';
import { saveCryptoInfoListToLocalStorage } from '../storage/storage.js';

// Render all crypto pairs to the UI
export async function renderAllCryptoPairs() {
    const ul = document.querySelector(".currencies_grafs");
    ul.innerHTML = ""; // Clear the list before rendering

    let storedPairs = getFromLocalStorage("storedCryptoPairs") || [];

    // === If no pairs are stored — create default ones ===
    if (storedPairs.length === 0) {
        let allCrypto = getFromLocalStorage("CryptoListInfo");

        // If crypto info list is not yet loaded, fetch and store it
        if (!allCrypto) {
            await saveCryptoInfoListToLocalStorage(); // fetch from API or source
            allCrypto = getFromLocalStorage("CryptoListInfo");
        }

        // List of default popular symbols to show initially
        const popularSymbols = ["btc", "eth", "xrp", "bnb", "ton"];

        // ✅ Create default pairs with valid prices
        const defaultPairs = allCrypto
            .filter(pair => popularSymbols.includes(pair.symbol.toLowerCase()))
            .map(pair => {
                const price = parseFloat(pair.current_price);
                return new CryptoPair(
                    pair.symbol.toLowerCase(),
                    isNaN(price) ? 0 : price,
                    pair.image
                );
            });

        // ✅ Save default pairs to localStorage as a single array
        localStorage.setItem("storedCryptoPairs", JSON.stringify(defaultPairs));

        // Render each default pair
        defaultPairs.forEach(pair => {
            pair.renderCryptoPair();
        });

        return;
    }

    // === If pairs already exist in localStorage ===
    storedPairs.forEach(pair => {
        const price = parseFloat(pair._price);
        const cryptoPair = new CryptoPair(
            pair.name.toLowerCase(),
            isNaN(price) ? 0 : price,
            pair.image
        );
        cryptoPair.renderCryptoPair();
    });
}

// Automatically render crypto pairs on page load
window.addEventListener("DOMContentLoaded", renderAllCryptoPairs);
