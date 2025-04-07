let table = document.getElementById("tableNotes");

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

function loadCryptoNotesFromStorageToTable(){
    let storedCryptoNotes = JSON.parse(localStorage.getItem("storedCryptoNotes")) || [];
    // let table = document.getElementById("tableNotes");
    // // let rows = table.rows;

    storedCryptoNotes.forEach(note => {
        let cryptoNote = new CryptoNote(note.id, note.date, note.name, note.price, note.amount);
        cryptoNote.renderNote();
    });
}

document.addEventListener("DOMContentLoaded", loadCryptoNotesFromStorageToTable());

//get all tds of rows starting from second row, because we need to delete all information, not the cell's name.
function getRowsStartFromSecondRow(){
    let rows = Array.from(document.querySelectorAll("#tableNotes tr"));
    let rowsWithoutFirstRow = rows.slice(1);
    console.log(rowsWithoutFirstRow);
    return rowsWithoutFirstRow;
    
}

function clearStorageData(){
    let rowsToDelete = getRowsStartFromSecondRow();

    localStorage.clear();
    rowsToDelete.forEach(row => {
        row.remove(); 
    });
}

async function saveCryptoInfoListToLocalStorage(){
    const cryptoPairListOptions = await getCryptoPairsList();
    localStorage.setItem("CryptoListInfo", JSON.stringify(cryptoPairListOptions));
    localStorage.setItem("CryptoListLastUpdate", Date.now().toString());
}



