import { generateUnicId } from '../utils/generateUnicId.js';
import { saveCryptoNoteToStorage } from '../storage/storage.js';
import { updateTotalAmount } from './CryptoPair.js';
import { closeModal } from './modalWindows.js';
import { updateCryptoChart, refreshCryptoOptions } from '../charts/drawChart.js';
import { updatePieChart } from '../charts/drawPieChart.js';
import { renderAllCryptoPairs } from '../utils/renderAllCryptoPairs.js';


export class CryptoNote {
    constructor(id, date, name, price, amount){
        this.id = id;
        this.date = date;
        this.name = name;
        this.price = price;
        this.amount = amount;
    }

    // handleEvent nebo AddEventListener s pouyitim bind

    static addCryptoNoteToTable(){
        const cryptoNoteID = generateUnicId();
        const cryptoNoteDate = document.getElementById("date").value;
        const cryptoNoteName = document.getElementById("cryptoName").value;
        const cryptoNotePrice = document.getElementById("price").value;
        const cryptoNoteAmount = document.getElementById("amount").value;

        if(!cryptoNoteID || !cryptoNoteDate || !cryptoNoteName || !cryptoNotePrice || !cryptoNoteAmount){
            alert("Fill all fields!");
            return;
        }

        const newCryptoNote = new CryptoNote(cryptoNoteID, cryptoNoteDate, cryptoNoteName, parseFloat(cryptoNotePrice), parseFloat(cryptoNoteAmount));
        newCryptoNote.renderNote();
        // rovnou napsat vloyeni do stranky

        saveCryptoNoteToStorage(newCryptoNote);

        let modalWindow = document.getElementById("modalWindow");

        setTimeout(() => {
            closeModal(modalWindow);
        }, 100);

        updateTotalAmount(cryptoNoteName);
        updateCryptoChart(cryptoNoteName); 
        refreshCryptoOptions();
        updatePieChart();
    }

    renderNote() {
    const tables = document.querySelectorAll(".tableBody");

    tables.forEach(table => {
        const row = table.insertRow();
        const newCryptoNoteEntries = Object.entries(this);

        newCryptoNoteEntries.forEach(([key, value]) => {
            let cell = row.insertCell();
            cell.innerText = value;
        });
    });
}


    remove() {}

    
    // renderNote, vloyit tr element na stranku
    // renderNote bude taky pridavat listener na odstraneni
    // jehoy callback bude obsahovat neco jako this.remove()

    // new Graph(div.element.kam.se.ma.vykreslit, data.predat,zde.nebo.vycist.z.localstorage)
}

// addEventListener na ten formular 

// addEventListener na resetData

// asi yvolit jine reseni
// na krizku pro smazani si ulozit do dataset.id - uniqueId
// event.target.dataset.id -- id paru co chci smazat