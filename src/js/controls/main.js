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
    aliveCount = countAliveCells();
    resetTimer();
    document.getElementById('generationCount').innerText = generationCount;
    document.getElementById('aliveCount').innerText = aliveCount;
    updateCanvas(false, true, seed);
}