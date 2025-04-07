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


let cryptoNameInput = document.getElementById("cryptoName");
let cryptoPairListOptions = getFromLocalStorage("CryptoListInfo");
let ul = document.getElementById("dropdownOptionsUl");

cryptoNameInput.addEventListener("click", function(){
    let div = document.querySelector(".cryptoPairDropdownOptions div");
    let input = document.getElementById("cryptoName");

    setTimeout(() => {
        div.style.display = "flex";
    }, 20);

    input.style.borderRadius = "10px 10px 0px 0px";

})


async function makeDropDownArea(){
    cryptoPairListOptions.forEach(coin =>{
        const li = document.createElement("li");
        li.innerHTML = coin.symbol;
        ul.appendChild(li);
    })
     
}


//find an appropriate crypto in the list of crypto by letters from input
async function findCryptoByLetters(){

    let inputValue = document.getElementById("cryptoName").value;

    let filteredList = cryptoPairListOptions.filter(coin =>
        coin.symbol.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    
    ul.innerHTML = "";

    filteredList.forEach(coin => {
        const li = document.createElement("li");
        li.innerHTML = coin.symbol;        
        ul.appendChild(li);
    })
}

cryptoNameInput.addEventListener("input", findCryptoByLetters);



ul.addEventListener("click", (event) =>{
    const target = event.target;
    console.log(target);
    
    if(target.tagName === "LI"){
        cryptoNameInput.value = target.textContent;
        ul.innerHTML = ""
    } 
})



// addEventListener na posunuti a callback definovany zde nebo jinde