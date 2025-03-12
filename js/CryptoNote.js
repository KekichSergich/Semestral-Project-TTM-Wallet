class CryptoNote {
    constructor(id, date, price, amount){
        this.id = id;
        this.date = date;
        // this.name = name;
        this.price = price;
        this.amount = amount;
    }

    addCryptoNoteToTable(){
        const table = document.getElementById("tableNotes");
        const row = table.insertRow();

        const newCryptoNoteEntries = Object.entries(this);

        newCryptoNoteEntries.forEach(([key, value]) =>{
            let cell = row.insertCell();
            cell.innerText = value;
        })
    }
}