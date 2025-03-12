let submitRecord = document.getElementById("submitRecord");

submitRecord.addEventListener("click", function(event){
    
    event.preventDefault();
    const cryptoNoteID = generateUnicId();
    const cryptoNoteDate = document.getElementById("date").value;
    // const cryptoNoteName = document.getElementById("cryptoName").value;
    const cryptoNotePrice = document.getElementById("price").value;
    const cryptoNoteAmount = document.getElementById("amount").value;

    const newCryptoNote = new CryptoNote(cryptoNoteID, cryptoNoteDate, cryptoNotePrice, cryptoNoteAmount);
    newCryptoNote.addCryptoNoteToTable();

    saveCryptoNoteToStorage(newCryptoNote);

    setTimeout(() => {
        closeRecordMakerModalWindow();
    }, 100);
})



// if(!cryptoNoteDate || !cryptoNoteName || !cryptoNotePrice ||!cryptoNoteAmount){
//     alert("Fill all fields!")
//     return;
// }


// saveCryptoNoteToStorage();
