document.getElementById('refreshLink').addEventListener('click', function (event) {
    event.preventDefault();
    location.reload();
});

document.getElementById('reset').addEventListener('click', () => {
    resetAction();
});

function resetAction(){
    const seed = document.getElementById('seedValue').innerText;
    generationCount = 0;
    resetTimer();
    document.getElementById('generationCount').innerText = generationCount;
    updateCanvas(false, true, seed);
}