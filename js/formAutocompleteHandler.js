let cryptoNameInput = document.getElementById("cryptoName");
let cryptoPairListOptions = getFromLocalStorage("CryptoListInfo");
let cryptoInputs = document.querySelectorAll(".cryptoNameInputsForm");
let uls = document.querySelectorAll(".dropdownOptionsUl");

let activeInput = null;
let activeDiv = null;
let activeUl = null;


//show the crypto's list when click on input. Determine current clicked input, current div and ul to work with.
cryptoInputs.forEach(input => {
    input.addEventListener("click", function(event){
        event.stopPropagation();
        activeInput = input;

        const parentContainer = input.closest(".cryptoPairDropdownOptions");
        activeDiv = parentContainer.querySelector("div");
        activeUl = parentContainer.querySelector("ul");
        console.log(activeUl)

        activeDiv.style.display = "flex";
    
        activeInput.style.borderRadius = "10px 10px 0px 0px";
        makeDropDownArea();
        setClickedListItemAsInputValue();
    })
})


function makeDropDownArea(){
    cryptoPairListOptions.forEach(coin =>{
        const li = document.createElement("li");
        li.textContent = coin.symbol;
        activeUl.append(li);

    })
     
}


//find an appropriate crypto in the list of crypto by letters from input
function findCryptoByLetters(){
    let inputValue = activeInput?.value || "";

    let filteredList = cryptoPairListOptions.filter(coin =>
        coin.symbol.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    
    activeUl.textContent = ""


    filteredList.forEach(coin => {
        const li = document.createElement("li");
        li.innerHTML = coin.symbol;        
        activeUl.append(li);
    })
}

cryptoInputs.forEach(input =>{
    input.addEventListener("input", findCryptoByLetters);
})

// Set clicked list item as input value and clear suggestions
const nameInput = document.getElementById("pairName");
const priceInput = document.getElementById("pairPrice");
const imageInput = document.getElementById("imageSrc");
let checkIfInputValueIsSet = false;

function setClickedListItemAsInputValue(){
    activeUl.addEventListener("click", (event) => {
        const target = event.target;
        
        if (target.tagName === "LI" && activeInput) {
            activeInput.value = target.textContent;
            activeUl.innerHTML = "";
            checkIfInputValueIsSet = true;
        }
        if (checkIfInputValueIsSet == true) {
            setCryptoPairPriceAndImage(activeInput.value);
        }
        activeDiv.style.display = "none";
    })
}

function setCryptoPairPriceAndImage(targetName){
    if (checkIfInputValueIsSet == true){
        cryptoPairListOptions.forEach(coin => {
            if (coin.symbol == targetName){
                priceInput.value = coin.current_price;
                imageInput.value = coin.image;
            }
        })
    }
}

document.addEventListener("click", (event) => {
    if(activeDiv && !activeDiv.contains(event.target)){
        activeDiv.style.display = "none";
        activeInput = null;
        activeDiv = null;
        activeUl = null;
    }   
});


    // 1) zredukovat
    // 2) li.hidden = true
    // 3) kontrolovat scroll