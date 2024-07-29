function getCellColor() {
    switch (colorPalette) {
        case "blackWhite":
            return "#ffffff";
        case "grey":
            return "#888888";
        case "warm":
            return getRandomWarmColor();
        case "cold":
            return getRandomColdColor();
        case "random":
        default:
            return getRandomColor();
    }
}

function getRandomWarmColor() {
    const hue = Math.floor(Math.random() * 60);
    const saturation = '70%';
    const lightness = '50%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function getRandomColdColor() {
    const hue = Math.floor(Math.random() * 60) + 180;
    const saturation = '70%';
    const lightness = '50%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = '70%';
    const lightness = '50%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}
