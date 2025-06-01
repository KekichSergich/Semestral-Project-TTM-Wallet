export function generateColor() {
    const hueList = [220, 250, 260, 280, 200, 180]; // синий, фиолетовый, бирюзовый
    const hue = hueList[Math.floor(Math.random() * hueList.length)];
    const saturation = 30 + Math.random() * 20;  // 40–60%
    const lightness = 25 + Math.random() * 10;   // 35–45% — мягко и темно

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
