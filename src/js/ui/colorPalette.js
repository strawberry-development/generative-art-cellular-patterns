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
        case "pastel":
            //Spring Beauty, AKA a special person
            // This person love pastel colors, as I do.
            return getRandomPastelColor();
        case "neon":
            return getRandomNeonColor();
        case "earth":
            return getRandomEarthColor();
        case "ocean":
            return getRandomOceanColor();
        case "sunset":
            return getRandomSunsetColor();
        case "forest":
            return getRandomForestColor();
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

function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = '60%';
    const lightness = '85%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function getRandomNeonColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = '100%';
    const lightness = '50%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function getRandomEarthColor() {
    const hue = Math.floor(Math.random() * 60) + 30; // Brownish hues
    const saturation = '70%';
    const lightness = '40%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function getRandomOceanColor() {
    const hue = Math.floor(Math.random() * 60) + 180; // Blue-Green hues
    const saturation = '80%';
    const lightness = '50%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function getRandomSunsetColor() {
    const hue = Math.floor(Math.random() * 60) + 300; // Red-Purple hues
    const saturation = '70%';
    const lightness = '60%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function getRandomForestColor() {
    const hue = Math.floor(Math.random() * 60) + 90; // Green hues
    const saturation = '60%';
    const lightness = '40%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = '70%';
    const lightness = '50%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}
