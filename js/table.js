// import {clearStorageData} from ./storage.js

let resetDataButton = document.getElementById("resetDataButton");

function resetData(){
    clearStorageData();
}

resetDataButton.addEventListener("click", resetData);