import { CryptoPair } from '../components/CryptoPair.js';
import { getFromLocalStorage, saveCryptoPairToLocalStorage } from '../storage/storage.js';
import { saveCryptoInfoListToLocalStorage } from '../storage/storage.js';

export async function renderAllCryptoPairs() {
    const ul = document.querySelector(".currencies_grafs");
    ul.innerHTML = "";

    let storedPairs = getFromLocalStorage("storedCryptoPairs") || [];

    // === Если нет пар — создаём дефолтные ===
    if (storedPairs.length === 0) {
        let allCrypto = getFromLocalStorage("CryptoListInfo");
        if (!allCrypto) {
            await saveCryptoInfoListToLocalStorage();
            allCrypto = getFromLocalStorage("CryptoListInfo");
        }

        const popularSymbols = ["btc", "eth", "xrp", "bnb", "ton"];

        // ✅ Создаём дефолтные пары с валидной ценой
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

        // ✅ Сохраняем их в хранилище ОДНИМ массивом
        localStorage.setItem("storedCryptoPairs", JSON.stringify(defaultPairs));

        // Рендерим
        defaultPairs.forEach(pair => {
            pair.renderCryptoPair();
        });

        return;
    }
  
    // === Если уже есть пары в localStorage ===
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

window.addEventListener("DOMContentLoaded", renderAllCryptoPairs);