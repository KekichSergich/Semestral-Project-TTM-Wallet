export function playDeleteSound() {
    const sound = new Audio("/sounds/delete.mp3");
    sound.play().catch(() => {}); // если браузер заблокирует autoplay — молча
}