import { CryptoPair } from '../components/CryptoPair.js';
import { getFromLocalStorage, saveCryptoPairToLocalStorage } from '../storage/storage.js';
import { saveCryptoInfoListToLocalStorage } from '../storage/storage.js';

export async function renderAllCryptoPairs() {
    const ul = document.querySelector(".currencies_grafs");
    ul.innerHTML = "";

    let storedPairs = getFromLocalStorage("storedCryptoPairs") || [];

    if (storedPairs.length === 0) {
        // Загружаем список всех криптовалют из API, если ещё не загружен
        let allCrypto = getFromLocalStorage("CryptoListInfo");
        if (!allCrypto) {
            await saveCryptoInfoListToLocalStorage(); // загружает и сохраняет в localStorage
            allCrypto = getFromLocalStorage("CryptoListInfo");
        }

        // 4 популярные валюты по symbol
        const popularSymbols = ["btc", "eth", "xrp", "bnb", "ton"];

        const defaultPairs = allCrypto
            .filter(pair => popularSymbols.includes(pair.symbol.toLowerCase()))
            .map(pair => new CryptoPair(pair.symbol, pair.price, pair.image)); // image должен быть валидным

        defaultPairs.forEach(pair => {
            saveCryptoPairToLocalStorage(pair);
            pair.renderCryptoPair();
        });

        return; // уже всё отрисовали
    }

    // Рендерим сохранённые пары
    storedPairs.forEach(pair => {
        const cryptoPair = new CryptoPair(pair.name, pair._price, pair.image);
        cryptoPair.renderCryptoPair();
    });
}
