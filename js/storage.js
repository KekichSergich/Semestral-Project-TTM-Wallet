function saveCryptoNoteToStorage(cryptoNote){
    let storedCryptoNotes = JSON.parse(localStorage.getItem("storedCryptoNotes")) || [];
    storedCryptoNotes.push(cryptoNote);
    localStorage.setItem("storedCryptoNotes", JSON.stringify(storedCryptoNotes));
}

function removeFromStorage(id){
    let storedCryptoNotes = JSON.parse(localStorage.getItem("storedCryptoNotes")) || [];
    const filteredStoredCryptoNotes = storedCryptoNotes.filter(note => note.id != id);
    localStorage.setItem("storedCryptoNotes", JSON.parse(filteredStoredCryptoNotes));
}

function clearStorageData(){
    localStorage.clear()
}

function loadCryptoNotesFromStorageToTable(){
    let storedCryptoNotes = JSON.parse(localStorage.getItem("storedCryptoNotes")) || [];
    let table = document.getElementById("tableNotes");
    // let rows = table.rows;

    storedCryptoNotes.forEach(note => {
        let cryptoNote = new CryptoNote(note.id, note.date, note.price, note.amount);
        cryptoNote.addCryptoNoteToTable();
    });
}

document.addEventListener("DOMContentLoaded", loadCryptoNotesFromStorageToTable());
