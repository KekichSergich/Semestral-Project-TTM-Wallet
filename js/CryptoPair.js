import { renderAllCryptoPairs } from './renderAllCryptoPairs.js';
import { getFromLocalStorage, saveToLocalStorage, saveCryptoPairToLocalStorage } from './storage.js';
import { closeModal } from './modalWindows.js';

export class CryptoPair{
    constructor(name, price, image){
        this.name = name;
        this._price = price;
        this.image = image;
        this.element = null;
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
        closeButton.addEventListener('click', () => this.delete());

        li.append(img,div,h6Name,h6Price,divTotalAmount,closeButton);

        ul.append(li);

        img.src = this.image;
        h6Name.textContent = `${(this.name).toUpperCase()}/USDT`;
        h6Price.textContent = this._price;
        closeButton.textContent = "x";

        let totalAmount = countTotalCryptoAmount(this.name);
        let totalAmountIn$ = totalAmount * this._price;

        divTotalAmount.textContent = "Total: " + totalAmountIn$.toFixed(2) + "$";
        divTotalAmount.dataset.name = this.name;

        this.element = li;
    }

    delete() {
        if (this.element) {
          this.element.remove();
          let pairs = getFromLocalStorage("storedCryptoPairs");

          pairs = pairs.filter(pair => pair.name !== this.name)
          localStorage.setItem("storedCryptoPairs", JSON.stringify(pairs));

          renderAllCryptoPairs();

        }
      }

    // delete(){
    //     const deleteButtons = document.querySelectorAll(".removeButton");
    //     const ul = document.querySelector(".currencies_grafs");
    //     activeCloseButton = null;


    //     deleteButtons.forEach(button => {
    //         button.addEventListener("click", (event) => {
    //             event.preventDefault;
    //             activeCloseButton = button;

    //             parentLi = activeCloseButton.closest("li");

    //         })
    //     })
    // }
    

    keepUpdatedPrice() {
        // bud jenom jednou
        // nebo kazdych 10 sekund

        // this.price = nova.cena
    }



}

export function updateTotalAmount(symbol){
    const ul = document.querySelector(".currencies_grafs");
    const liElements = ul.querySelectorAll("li");
    let baseSymbol = null;
    liElements.forEach(li =>{
        const h6Elements = li.querySelectorAll("h6");
        if (h6Elements.length > 0){
            const h6PairName =  h6Elements[0].textContent.trim();
            baseSymbol = h6PairName.split("/")[0].toLowerCase();
        }    

        if(baseSymbol == symbol){
            const totalAmount = countTotalCryptoAmount(symbol);
            const price = parseFloat(h6Elements[1].textContent.trim());
            const totalInUSD = totalAmount * price;

            const totalAmountDiv = li.querySelector(".totalAmount");
            if (totalAmountDiv){
                totalAmountDiv.textContent = totalInUSD.toFixed(2);
            }
        }

    })
    // const totalAmount = countTotalCryptoAmount(this.name);
    // const totalInUSD = totalAmount * this._price;
}

function countTotalCryptoAmount(name){
    let storedCryptoNotes = getFromLocalStorage("storedCryptoNotes");
    let totalAmount = 0;
    if (storedCryptoNotes != null){
        storedCryptoNotes.forEach(note => {
            if(name == note.name){
                totalAmount += note.amount;
            }
        });
    }
    

    return totalAmount;
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