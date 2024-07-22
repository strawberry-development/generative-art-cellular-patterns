function animateOriginal() {
    if (!animationRunning) return;
    update();
    draw(originalCtx);
    requestAnimationFrame(animateOriginal);
}

function animateSlowed() {
    if (!animationRunning) return;
    update();
    draw(slowedCtx);
    setTimeout(animateSlowed, 100);
}

async function recordAnimation(canvas, prefix) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let filename = `${prefix}_${timestamp}.mp4`;
    const stream = canvas.captureStream();
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8' });
    const chunks = [];

    mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) {
            chunks.push(e.data);
        }
    };

    mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Stop animation when recording is done
        animationRunning = false;
        document.getElementById('startButton').innerText = '▶️ Start';
    };

    mediaRecorder.start();
    await new Promise(resolve => setTimeout(resolve, recordDuration));
    mediaRecorder.stop();
}