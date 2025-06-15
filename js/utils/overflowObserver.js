// Create a custom event called "updateOverflowCheck"
const overflowUpdateEvent = new Event("updateOverflowCheck");

// Manually dispatch (trigger) the custom overflow update event
export function triggerOverflowUpdate() {
    document.dispatchEvent(overflowUpdateEvent);
}

// Listen for the "updateOverflowCheck" event and run the provided callback when it occurs
export function listenToOverflowUpdates(callback) {
    document.addEventListener("updateOverflowCheck", callback);
}
