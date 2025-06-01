const overflowUpdateEvent = new Event("updateOverflowCheck");

export function triggerOverflowUpdate(){
    document.dispatchEvent(overflowUpdateEvent);
}

export function listenToOverflowUpdates(callback){
    document.addEventListener("updateOverflowCheck", callback);
}