async function recordAnimation(canvas, prefix) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let filename = `${prefix}_${timestamp}.mp4`;
    const stream = canvas.captureStream();
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8' });
    const chunks = [];
    const recordingIndicator = document.getElementById('recordingIndicator');
    recordingIndicator.classList.add('blink');

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

        recordingIndicator.classList.remove('blink');
        animationRunning = false;
        document.getElementById('startButton').innerText = '▶️ Start';
    };

    mediaRecorder.start();
    await new Promise(resolve => setTimeout(resolve, recordDuration));
    mediaRecorder.stop();
}