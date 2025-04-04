class CryptoPair{
    constructor(name, price, image){
        this.name = name;
        this._price = price;
        this.image = image;

        // this.keepUpdatedPrice()
    }

    set price(price){
        this._price = price
        // update price on the page
    }

    addNewCryptoPair(){
        
    }

    keepUpdatedPrice() {
        // bud jenom jednou
        // nebo kazdych 10 sekund

        // this.price = nova.cena
    }
}

async function getCryptoPairsList(){
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
        const cryptoPairListOptions = await response.json();
        return cryptoPairListOptions;
    } catch (error) {
        console.error("Error with fetch: ", error);
        return [];
    }
}


let cryptoNameInput = document.getElementById("cryptoName");
console.log(cryptoNameInput)

cryptoNameInput.addEventListener("click", function(){
    let div = document.querySelector(".cryptoPairDropdownOptions div");
    let input = document.getElementById("cryptoName");

    setTimeout(() => {
        div.style.display = "flex";
    }, 20);

    input.style.borderRadius = "10px 10px 0px 0px";

})


let ul = document.getElementById("dropdownOptionsUl");

async function makeDropDownArea(){
    let cryptoPairListOptions = await getCryptoPairsList();
    console.log(cryptoPairListOptions);
    cryptoPairListOptions.forEach(coin =>{
        const li = document.createElement("li");
        li.innerHTML = coin.symbol;
        ul.appendChild(li);
    })
     
}

let cryptoPairListOptions = await getCryptoPairsList();

//find an appropriate crypto in the list of crypto by letters from input
async function findCryptoByLetters(){

    console.log(cryptoPairListOptions);
    
    
    let inputValue = document.getElementById("cryptoNameInput").value;

    let filteredList = cryptoPairListOptions.filter(coin =>{
        coin.symbol.toLowerCase().startsWith((inputValue));
    })
    
    ul.innerHTML = "";

    filteredList.forEach(coin => {
        const li = document.createElement("li");
        li.innerHTML = coin.symbol;
        ul.appendChild(li);
    })
}

cryptoNameInput.addEventListener("keydown", findCryptoByLetters);


// addEventListener na posunuti a callback definovany zde nebo jinde