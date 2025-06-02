let modalWindow = document.getElementById("modalWindow");
let recordForm = document.getElementById("recordForm");
let closeModalWindowButton = document.querySelector("#closeModalWindowButton");

export function openModal(modal) {
    modal.style.display = "flex";    
    setTimeout(() => {
        modal.querySelector("form").classList.add("show");
    }, 20);
}

export function closeModal(modal) {
    modal.querySelector("form").classList.remove("show");
    modal.querySelector("form").classList.add("close");

    setTimeout(() => {
        modal.style.display = "none";
        modal.querySelector("form").classList.remove("close");
    }, 100);
}

// Все кнопки "Make new record"
document.querySelectorAll(".makeRecordButton").forEach(btn => {
    btn.addEventListener("click", function() {
        openModal(modalWindow);
    });
});

closeModalWindowButton.addEventListener("click", function() {
    closeModal(modalWindow);
});

let addNewPairModalWindow = document.getElementById("addNewPairModalWindow");
let closeNewPairModalButton = document.querySelector("#closeNewPairModalButton");

// Все кнопки "Add new pair"
document.querySelectorAll(".openNewPairModalButton").forEach(btn => {
    btn.addEventListener("click", function() {
        openModal(addNewPairModalWindow);
    });
});

closeNewPairModalButton.addEventListener("click", function() {
    closeModal(addNewPairModalWindow);
});
