import { getFromLocalStorage, saveCryptoInfoListToLocalStorage } from '../storage/storage.js';

// let cryptoListInfo = JSON.parse(localStorage.getItem("CryptoListInfo")) || [];
let cryptoListInfo = getFromLocalStorage("CryptoListInfo") || [];
console.log(cryptoListInfo)
let res = shouldUpdateCryptoList();

if (cryptoListInfo.length === 0) {
    saveCryptoInfoListToLocalStorage();
    console.log("saved")
} else if (res == true) {
    saveCryptoInfoListToLocalStorage();
} 

function shouldUpdateCryptoList(){
    const lastUpdate = getFromLocalStorage("CryptoListLastUpdate");

    //never has been updated 
    if (!lastUpdate){
        return true;
    }

    const now = Date.now();
    const oneDay = 24*60*60*1000;

    if (now - Number(lastUpdate) > oneDay){
        return true;
    }
} 