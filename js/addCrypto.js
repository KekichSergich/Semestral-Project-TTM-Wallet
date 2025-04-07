let submitRecord = document.getElementById("submitRecord");

submitRecord.addEventListener("click", function(event){
    event.preventDefault();
    
    CryptoNote.addCryptoNoteToTable()
});


// if(!cryptoNoteDate || !cryptoNoteName || !cryptoNotePrice ||!cryptoNoteAmount){
//     alert("Fill all fields!")
//     return; 
// }