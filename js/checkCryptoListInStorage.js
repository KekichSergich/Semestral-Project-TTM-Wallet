let cryptoListInfo = JSON.parse(localStorage.getItem("CryptoListInfo")) || [];
console.log(cryptoListInfo)

if (cryptoListInfo.length === 0) {
    saveCryptoInfoListToLocalStorage();
    console.log("saved")
} else {
    shouldUpdateCryptoList();
}

setInterval(saveCryptoInfoListToLocalStorage, 86400000);

function shouldUpdateCryptoList(){
    lastUpdate = localStorage.getItem("CryptoListLastUpdate");

    //never has been updated 
    if (!lastUpdate){
        return true;
    }

    const now = Date.now();
    const oneDay = 24*60*60*1000;

    return now - Number(lastUpdate) > oneDay;
}