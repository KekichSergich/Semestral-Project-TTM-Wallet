export function generateUnicId() {
    return Math.random().toString(36).substr(2, 6);
}