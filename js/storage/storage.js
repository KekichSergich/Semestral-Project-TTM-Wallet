import { CryptoNote } from '../components/CryptoNote.js';
import { CryptoPair } from '../components/CryptoPair.js';
import { getCryptoPairsList } from '../utils/getCryptoPairsList.js';
 
let table = document.getElementById("tableNotes");

export function saveCryptoNoteToStorage(cryptoNote){
    let storedCryptoNotes = JSON.parse(localStorage.getItem("storedCryptoNotes")) || [];
    storedCryptoNotes.push(cryptoNote);
    localStorage.setItem("storedCryptoNotes", JSON.stringify(storedCryptoNotes));
}

export function saveCryptoPairToLocalStorage(cryptoPair){
    let storedCryptoPairs = JSON.parse(localStorage.getItem("storedCryptoPairs"))  || [];
    storedCryptoPairs.push(cryptoPair);
    localStorage.setItem("storedCryptoPairs", JSON.stringify(storedCryptoPairs));   
}

export function removeFromStorage(id){
    let storedCryptoNotes = JSON.parse(localStorage.getItem("storedCryptoNotes")) || [];
    const filteredStoredCryptoNotes = storedCryptoNotes.filter(note => note.id != id);
    localStorage.setItem("storedCryptoNotes", JSON.parse(filteredStoredCryptoNotes));
}

export function loadCryptoNotesFromStorageToTable(){
    let storedCryptoNotes = JSON.parse(localStorage.getItem("storedCryptoNotes")) || [];

    storedCryptoNotes.forEach(note => {
        let cryptoNote = new CryptoNote(note.id, note.date, note.name, note.price, note.amount);
        cryptoNote.renderNote();
    });
}



document.addEventListener("DOMContentLoaded", loadCryptoNotesFromStorageToTable);

export function loadCryptoPairsFromLocalStorageToUl(){
    let storedCryptoPairs = JSON.parse(localStorage.getItem("storedCryptoPairs")) || [];

    storedCryptoPairs.forEach(pair => {
        let cryptoPair = new CryptoPair(pair.name, pair._price, pair.image);
        cryptoPair.renderCryptoPair();
    })
}

document.addEventListener("DOMContentLoaded", loadCryptoPairsFromLocalStorageToUl);

//get all tds of rows starting from second row, because we need to delete all information, not the cell's name.
export function getRowsStartFromSecondRow(){
    let rows = Array.from(document.querySelectorAll("#tableNotes tr"));
    let rowsWithoutFirstRow = rows.slice(1);
    return rowsWithoutFirstRow;
    
}

export function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  
  export function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

export function clearStorageData(){
    let rowsToDelete = getRowsStartFromSecondRow();

    localStorage.clear();
    rowsToDelete.forEach(row => {
        row.remove(); 
    });
}

export async function saveCryptoInfoListToLocalStorage(){
    const cryptoPairListOptions = await getCryptoPairsList();
    localStorage.setItem("CryptoListInfo", JSON.stringify(cryptoPairListOptions));
    localStorage.setItem("CryptoListLastUpdate", Date.now().toString());
}



