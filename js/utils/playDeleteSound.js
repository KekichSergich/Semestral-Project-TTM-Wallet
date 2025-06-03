// Plays the delete sound effect when called
export function playDeleteSound() {
    // Create a new Audio object with the path to the sound file
    const sound = new Audio("../sounds/delete.mp3");

    // Attempt to play the sound
    // If the browser blocks autoplay (e.g., due to lack of user interaction), ignore the error silently
    sound.play().catch(() => {});
}
