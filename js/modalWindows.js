let modalWindow = document.getElementById("modalWindow");
let recordForm = document.getElementById("recordForm");
let closeModalWindowButton = document.getElementById("closeModalWindowButton");

function openRecordMakerModalWindow(){
    modalWindow.style.display = "flex";    
    setTimeout(() => {
        recordForm.classList.add("show");
    }, 50);
}

makeRecordButton.addEventListener("click", function(){
    openRecordMakerModalWindow()
});

function closeRecordMakerModalWindow(){
    recordForm.classList.remove("show");
    recordForm.classList.add("close");

    setTimeout(() => {
        modalWindow.style.display = "none";
        recordForm.classList.remove("close");
    }, 100);
}

closeModalWindowButton.addEventListener("click", function(){
    closeRecordMakerModalWindow();
})

// window.addEventListener("click", function(){
//     modalWindow.style.display = "none";
// })
