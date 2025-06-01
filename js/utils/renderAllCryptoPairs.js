import { CryptoPair } from '../components/CryptoPair.js';
import { getFromLocalStorage } from '../storage/storage.js';

export function renderAllCryptoPairs(){
    const ul = document.querySelector(".currencies_grafs");
    ul.innerHTML = ""

    let storedPairs = getFromLocalStorage("storedCryptoPairs") || [];
    storedPairs.forEach(pair => {
        const cryptoPair = new CryptoPair(pair.name, pair._price, pair.image);
        cryptoPair.renderCryptoPair();      
    });
}