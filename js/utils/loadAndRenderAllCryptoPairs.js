import { CryptoPair } from "../components/CryptoPair.js";
import { getFromLocalStorage } from "../storage/storage.js";

export function loadAndRenderAllCryptoPairs() {
    const ul = document.querySelector(".currencies_grafs");
    ul.innerHTML = ""; 

    const storedPairs = getFromLocalStorage("storedCryptoPairs") || [];

    storedPairs.forEach(pairData => {
        const pair = new CryptoPair(pairData.name, pairData._price, pairData.image);
        pair.renderCryptoPair();
    });
}
