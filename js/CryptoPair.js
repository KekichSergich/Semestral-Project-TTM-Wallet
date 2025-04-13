class CryptoPair{
    constructor(name, price, image){
        this.name = name;
        this._price = price;
        this.image = image;

        // this.keepUpdatedPrice()
    }

    set price(price){
        this._price = price;
    }

    static addNewCryptoPair(){
        const name = document.getElementById("pairName").value;
        const price = document.getElementById("pairPrice").value;
        const image = document.getElementById("imageSrc").value;

        if (!name || !price || !image){
            alert("Fill all fields!");
            return;
        }

        const cryptoPair = new CryptoPair(name, price, image);

        saveCryptoPairToLocalStorage(cryptoPair);
        cryptoPair.renderCryptoPair();

        let modalWindow = document.getElementById("addNewPairModalWindow");
        closeModal(modalWindow);
    }

    renderCryptoPair(){
        console.log("rendering...")
        const ul = document.querySelector(".currencies_grafs");
        const li = document.createElement("li");
        const img = document.createElement("img");
        const div = document.createElement("div");
        const h6Name = document.createElement("h6");
        const h6Price = document.createElement("h6");
        const divTotalAmount = document.createElement("div");
        const closeButton = document.createElement("span");

        divTotalAmount.classList.add("totalAmount");
        divTotalAmount.classList.add("generalClassTotalAmount");
        closeButton.classList.add("removeButton");

        li.append(img,div,h6Name,h6Price,divTotalAmount,closeButton);

        ul.append(li);

        img.src = this.image;
        h6Name.textContent = `${(this.name).toUpperCase()}/USDT`;
        h6Price.textContent = this._price;
        closeButton.textContent = "x";
    }

    keepUpdatedPrice() {
        // bud jenom jednou
        // nebo kazdych 10 sekund

        // this.price = nova.cena
    }



}

function countTotalCryptoAmount(name){
    
}

let addPairButtonSubmit = document.getElementById("addPairButton");

addPairButtonSubmit.addEventListener("click", function(event){
    event.preventDefault();
    CryptoPair.addNewCryptoPair();

})






// addEventListener na posunuti a callback definovany zde nebo jinde

// getPriceByName(name) {
//     const CryptoListInfo = getFromLocalStorage("CryptoListInfo");
//     let price = null;

//     for (let coin of CryptoListInfo) {
//         if (coin.symbol === name) {
//             let pairPriceInput = document.getElementById("pairPrice");
//             price = coin.price;
//             pairPriceInput.textContent = price;
//             break;
//         }
//     }

//     return price;
// }

// getImageByName(name) {
//     const CryptoListInfo = getFromLocalStorage("CryptoListInfo");
//     let image = null;

//     for (let coin of CryptoListInfo) {
//         if (coin.symbol === name) {
//             image = coin.image;
//             break;
//         }
//     }

//     return image;
// }

// setCryptoDataByName(name){
//     const price = getPriceByName(name);
//     const image = getImageByName(name)

//     if (price !== null) this.price = price;
//     if (image !== null) this.image = image;
// }

// set price(price){
//     this._price = price;
// }

// set image(image){
//     this._image = image;
//     // update price on the page
// }