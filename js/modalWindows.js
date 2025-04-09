let modalWindow = document.getElementById("modalWindow");
let recordForm = document.getElementById("recordForm");
let closeModalWindowButton = document.getElementById("closeModalWindowButton");

function openModal(modal){
    modal.style.display = "flex";    
    setTimeout(() => {
        modal.querySelector("form").classList.add("show");
    }, 20);
}

function closeModal(modal){
    modal.querySelector("form").classList.remove("show");
    modal.querySelector("form").classList.add("close");

    setTimeout(() => {
        modal.style.display = "none";
        modal.querySelector("form").classList.remove("close");
    }, 100);
}

makeRecordButton.addEventListener("click", function(){
    openModal(modalWindow)
});

closeModalWindowButton.addEventListener("click", function(){
    closeModal(modalWindow);
})

let addNewPairModalWindow = document.getElementById("addNewPairModalWindow");
let openNewPairModalButton = document.getElementById("openNewPairModalButton");
let closeNewPairModalButton = document.getElementById("closeNewPairModalButton");

openNewPairModalButton.addEventListener("click", function(){
    openModal(addNewPairModalWindow);
})

closeNewPairModalButton.addEventListener("click", function(){
    closeModal(addNewPairModalWindow);
})


