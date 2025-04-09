let cryptoNameInput = document.getElementById("cryptoName");
let cryptoPairListOptions = getFromLocalStorage("CryptoListInfo");
let cryptoInputs = document.querySelectorAll(".cryptoNameInputsForm");
let uls = document.querySelectorAll(".dropdownOptionsUl");

let activeInput = null;
let activeDiv = null;
let activeUl = null;


cryptoInputs.forEach(input => {
    input.addEventListener("click", function(){
        activeInput = input;

        const parentContainer = input.closest(".cryptoPairDropdownOptions");
        activeDiv = parentContainer.querySelector("div");
        activeUl = parentContainer.querySelector("ul");
        console.log(activeUl)

        activeDiv.style.display = "flex";
    
        input.style.borderRadius = "10px 10px 0px 0px";
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
function setClickedListItemAsInputValue(){
    activeUl.addEventListener("click", (event) => {
        const target = event.target;
        
        if (target.tagName === "LI" && activeInput) {
            activeInput.value = target.textContent;
            activeUl.innerHTML = "";
        }
    })
}



    // 1) zredukovat
    // 2) li.hidden = true
    // 3) kontrolovat scroll