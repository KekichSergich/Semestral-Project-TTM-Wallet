// Get references to modal windows and buttons
let modalWindow = document.getElementById("modalWindow");
let recordForm = document.getElementById("recordForm");
let closeModalWindowButton = document.querySelector("#closeModalWindowButton");

// Function to open a modal
export function openModal(modal) {
    modal.style.display = "flex";  // Make the modal visible (flex layout)
    setTimeout(() => {
        modal.querySelector("form").classList.add("show"); // Trigger animation with a small delay
    }, 20);
}

// Function to close a modal
export function closeModal(modal) {
    const form = modal.querySelector("form");
    form.classList.remove("show");    // Remove "show" class for exit animation
    form.classList.add("close");      // Add "close" class to trigger fade-out

    setTimeout(() => {
        modal.style.display = "none"; // Hide the modal after the animation
        form.classList.remove("close"); // Clean up the "close" class
    }, 100); // Delay matches the CSS animation duration
}

// Bind "Make new record" buttons to open the record modal
document.querySelectorAll(".makeRecordButton").forEach(btn => {
    btn.addEventListener("click", function() {
        openModal(modalWindow);
    });
});

// Close button inside the record modal
closeModalWindowButton.addEventListener("click", function() {
    closeModal(modalWindow);
});

// Get references to the "Add New Pair" modal and its close button
let addNewPairModalWindow = document.getElementById("addNewPairModalWindow");
let closeNewPairModalButton = document.querySelector("#closeNewPairModalButton");

// Bind "Add new pair" buttons to open the corresponding modal
document.querySelectorAll(".openNewPairModalButton").forEach(btn => {
    btn.addEventListener("click", function() {
        openModal(addNewPairModalWindow);
    });
});

// Close button for the "Add New Pair" modal
closeNewPairModalButton.addEventListener("click", function() {
    closeModal(addNewPairModalWindow);
});
