async function recordAnimation(canvas, prefix) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let filename = `${prefix}_${timestamp}.webm`;
    const stream = canvas.captureStream();
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8' });
    const chunks = [];
    const recordingIndicator = document.getElementById('recordingIndicator');
    const progressBar = document.getElementById('progressBar');

    let startTime;
    const updateProgress = () => {
        const elapsedTime = (new Date() - startTime); // elapsed time in milliseconds
        const progress = Math.min((elapsedTime / recordDuration) * 100, 100);
        progressBar.style.width = `${progress}%`;
    };

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
            progressBar.style.width = '0%'; // Reset progress bar when modal is closed
        };

        const cancelButton = document.getElementById('cancelButton');
        cancelButton.onclick = () => {
            modal.style.display = 'none';
            URL.revokeObjectURL(url);
            progressBar.style.width = '0%'; // Reset progress bar when modal is closed
        };
    };

    mediaRecorder.onstart = () => {
        startTime = new Date();
        // Update progress bar every 100ms
        const intervalId = setInterval(() => {
            if (mediaRecorder.state === 'inactive') {
                clearInterval(intervalId);
            } else {
                updateProgress();
            }
        }, 100);
    };

    mediaRecorder.start();
    await new Promise(resolve => setTimeout(resolve, recordDuration));
    mediaRecorder.stop();
}

document.getElementById('downloadImage').addEventListener('click', () => {
    const canvas = document.getElementById('originalCanvas');
    const dataURL = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'canvas_image.png';
    downloadLink.click();
});