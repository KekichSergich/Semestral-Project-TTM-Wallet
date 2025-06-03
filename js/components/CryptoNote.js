import { renderAllCryptoPairs } from '../utils/renderAllCryptoPairs.js';
import { getFromLocalStorage, saveToLocalStorage, saveCryptoPairToLocalStorage } from '../storage/storage.js';
import { closeModal } from './modalWindows.js';
import { listenToOverflowUpdates, triggerOverflowUpdate } from '../utils/overflowObserver.js';
import { playDeleteSound } from '../utils/playDeleteSound.js';

// CryptoPair class to represent each crypto asset in the UI
export class CryptoPair {
    constructor(name, price, image) {
        this.name = name;
        this._price = parseFloat(price);
        this.image = image;
        this.element = null;
    }

    set price(price) {
        this._price = parseFloat(price);
    }

    // Add a new pair from modal input fields
    static addNewCryptoPair() {
        const name = document.getElementById("pairName").value;
        const price = document.getElementById("pairPrice").value;
        const image = document.getElementById("imageSrc").value;

        if (!name || !price || !image) {
            alert("Fill all fields!");
            return;
        }

        const cryptoPair = new CryptoPair(name, price, image);
        saveCryptoPairToLocalStorage(cryptoPair);
        cryptoPair.renderCryptoPair();

        let modalWindow = document.getElementById("addNewPairModalWindow");
        closeModal(modalWindow);
    }

    // Render the pair element into the DOM
    renderCryptoPair() {
        const ul = document.querySelector(".currencies_grafs");
        const li = document.createElement("li");
        const img = document.createElement("img");
        const div = document.createElement("div");
        const h6Name = document.createElement("h6");
        const h6Price = document.createElement("h6");
        const divTotalAmount = document.createElement("div");
        const closeButton = document.createElement("span");

        divTotalAmount.classList.add("totalAmount", "generalClassTotalAmount");
        closeButton.classList.add("removeButton");
        closeButton.addEventListener('click', () => this.delete());

        li.append(img, div, h6Name, h6Price, divTotalAmount, closeButton);
        ul.append(li);

        img.src = this.image;
        h6Name.textContent = `${this.name.toUpperCase()}/USDT`;
        h6Price.textContent = isNaN(this._price) ? "0" : this._price.toFixed(2);
        closeButton.textContent = "x";

        let totalAmount = countTotalCryptoAmount(this.name);
        let totalAmountIn$ = totalAmount * (isNaN(this._price) ? 0 : this._price);

        divTotalAmount.textContent = "Total: " + totalAmountIn$.toFixed(2) + "$";
        divTotalAmount.dataset.name = this.name;

        this.element = li;
    }

    // Remove pair from DOM and local storage
    delete() {
        if (this.element) {
            this.element.remove();
            let pairs = getFromLocalStorage("storedCryptoPairs");
            pairs = pairs.filter(pair => pair.name !== this.name);
            localStorage.setItem("storedCryptoPairs", JSON.stringify(pairs));

            renderAllCryptoPairs();
            triggerOverflowUpdate();
            playDeleteSound();
        }
    }
}

// Update the total amount in USD for a given symbol
export function updateTotalAmount(symbol) {
    const ul = document.querySelector(".currencies_grafs");
    const liElements = ul.querySelectorAll("li");

    liElements.forEach(li => {
        const h6Elements = li.querySelectorAll("h6");
        if (h6Elements.length > 0) {
            const h6PairName = h6Elements[0].textContent.trim();
            const baseSymbol = h6PairName.split("/")[0].toLowerCase();

            if (baseSymbol === symbol) {
                const totalAmount = countTotalCryptoAmount(symbol);
                const price = parseFloat(h6Elements[1].textContent.trim());
                const totalInUSD = totalAmount * (isNaN(price) ? 0 : price);

                const totalAmountDiv = li.querySelector(".totalAmount");
                if (totalAmountDiv) {
                    totalAmountDiv.textContent = "Total: " + totalInUSD.toFixed(2) + "$";
                }
            }
        }
    });
}

// Count the total amount of a crypto asset from all saved notes
function countTotalCryptoAmount(name) {
    let storedCryptoNotes = getFromLocalStorage("storedCryptoNotes");
    let totalAmount = 0;
    if (storedCryptoNotes != null) {
        storedCryptoNotes.forEach(note => {
            if (name.toLowerCase() === note.name.toLowerCase()) {
                totalAmount += parseFloat(note.amount) || 0;
            }
        });
    }
    return totalAmount;
}

// Handle submit click for adding a new pair
let addPairButtonSubmit = document.getElementById("addPairButton");
addPairButtonSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    CryptoPair.addNewCryptoPair();
});

// Scroll controls for horizontal slider
const leftBtn = document.querySelector(".scroll-button.left");
const rightBtn = document.querySelector(".scroll-button.right");
const wrapper = document.querySelector(".slider-wrapper");

let isOverflowing = false;
let currentPos = 0;
let ul;
let ulArray;
let totalIndexes;
let visibleIndexes;

document.addEventListener("DOMContentLoaded", () => {
    ul = document.querySelector(".currencies_grafs");

    // Update overflow state
    const updateOverflow = () => {
        isOverflowing = ul.scrollWidth > wrapper.clientWidth;
    };
    listenToOverflowUpdates(updateOverflow);

    // Observe changes in the crypto list
    const observer = new MutationObserver(() => {
        updateOverflow();

        if (isOverflowing) {
            leftBtn.addEventListener("click", moveLeft);
            rightBtn.addEventListener("click", moveRight);
        } else {
            leftBtn.removeEventListener("click", moveLeft);
            rightBtn.removeEventListener("click", moveRight);

            if (ul.style.left != "0px") {
                currentPos = 0;
                ul.style.left = "0px";
            }
        }
    });

    observer.observe(ul, { childList: true, subtree: true });

    // Scroll the list to the left with smooth animation
    function moveLeft() {
        let leftUlPos = ul.getBoundingClientRect().left;
        let firstItem = ul.firstElementChild;
        let firstItemPos = firstItem.getBoundingClientRect().left;

        console.log(leftUlPos, firstItemPos);

        let lastItem = ul.lastElementChild;

        if (firstItemPos > leftUlPos) {
            ul.insertBefore(lastItem, firstItem);

            lastItem.style.position = 'absolute';
            lastItem.style.left = -lastItem.offsetWidth + 'px';

            setTimeout(() => {
                lastItem.style.transition = 'left 0.5s ease-in-out';
                lastItem.style.left = '0px';
            }, 0);

            currentPos += 270;
            ul.style.left = currentPos + "px";
        }
    }

    // Scroll the list to the right (move first item to end)
    function moveRight() {
        let firstItem = ul.firstElementChild;
        ul.append(firstItem);
    }
});
