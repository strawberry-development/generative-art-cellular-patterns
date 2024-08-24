async function recordAnimation(canvas, prefix) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let filename = `${prefix}_${timestamp}.webm`;
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
        stopTimer();
        
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        // Dynamically update the modal content
        const modal = document.getElementById('exportModal');
        const videoPreview = document.getElementById('videoPreview');
        videoPreview.src = url;
        modal.style.display = 'block';

        const downloadButton = document.getElementById('downloadButton');
        downloadButton.onclick = () => {
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            modal.style.display = 'none';
        };

        const cancelButton = document.getElementById('cancelButton');
        cancelButton.onclick = () => {
            modal.style.display = 'none';
            URL.revokeObjectURL(url);
        };

        recordingIndicator.classList.remove('blink');
    };

    mediaRecorder.start();
    await new Promise(resolve => setTimeout(resolve, recordDuration));
    mediaRecorder.stop();
}