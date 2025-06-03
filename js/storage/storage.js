import { CryptoNote } from '../components/CryptoNote.js';
import { CryptoPair } from '../components/CryptoPair.js';
import { getCryptoPairsList } from '../utils/getCryptoPairsList.js';

let table = document.getElementById("tableNotes");

// Save a single crypto note to local storage
export function saveCryptoNoteToStorage(cryptoNote) {
    let storedCryptoNotes = JSON.parse(localStorage.getItem("storedCryptoNotes")) || [];
    storedCryptoNotes.push(cryptoNote);
    localStorage.setItem("storedCryptoNotes", JSON.stringify(storedCryptoNotes));
}

// Save a crypto pair (with price and image) to local storage
export function saveCryptoPairToLocalStorage(cryptoPair) {
    let storedCryptoPairs = JSON.parse(localStorage.getItem("storedCryptoPairs")) || [];
    storedCryptoPairs.push(cryptoPair);
    localStorage.setItem("storedCryptoPairs", JSON.stringify(storedCryptoPairs));
}

// Remove a crypto note from storage by its unique ID
export function removeFromStorage(id) {
    let storedCryptoNotes = JSON.parse(localStorage.getItem("storedCryptoNotes")) || [];
    const filteredStoredCryptoNotes = storedCryptoNotes.filter(note => note.id != id);
    localStorage.setItem("storedCryptoNotes", JSON.stringify(filteredStoredCryptoNotes)); // ✅ FIX: use JSON.stringify
}

// Load saved crypto notes and render them into the table
export function loadCryptoNotesFromStorageToTable() {
    let storedCryptoNotes = JSON.parse(localStorage.getItem("storedCryptoNotes")) || [];

    storedCryptoNotes.forEach(note => {
        let cryptoNote = new CryptoNote(note.id, note.date, note.name, note.price, note.amount);
        cryptoNote.renderNote(); // Append to DOM
    });
}

// Automatically load notes on page load
document.addEventListener("DOMContentLoaded", loadCryptoNotesFromStorageToTable);

// Load saved crypto pairs and render them into the UL list
export function loadCryptoPairsFromLocalStorageToUl() {
    let storedCryptoPairs = JSON.parse(localStorage.getItem("storedCryptoPairs")) || [];

    storedCryptoPairs.forEach(pair => {
        let cryptoPair = new CryptoPair(pair.name, pair._price, pair.image);
        cryptoPair.renderCryptoPair();
    });
}

// Automatically load pairs on page load
document.addEventListener("DOMContentLoaded", loadCryptoPairsFromLocalStorageToUl);

// Get all rows of the notes table, excluding the header row (first row)
export function getRowsStartFromSecondRow() {
    let rows = Array.from(document.querySelectorAll("#tableNotes tr"));
    let rowsWithoutFirstRow = rows.slice(1);
    return rowsWithoutFirstRow;
}

// Utility to get data from local storage by key
export function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Utility to save data to local storage by key
export function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Clear all storage data and remove table rows (except header)
export function clearStorageData() {
    let rowsToDelete = getRowsStartFromSecondRow();

    localStorage.clear();
    rowsToDelete.forEach(row => {
        row.remove();
    });
}

// Fetch latest crypto info list (e.g., from API) and store it in local storage
export async function saveCryptoInfoListToLocalStorage() {
    const cryptoPairListOptions = await getCryptoPairsList();
    localStorage.setItem("CryptoListInfo", JSON.stringify(cryptoPairListOptions));
    localStorage.setItem("CryptoListLastUpdate", Date.now().toString());
}
