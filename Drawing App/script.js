document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');
    let isDrawing = false;
    let paths = [];
    let isErasing = false;

    // Event listeners 
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', draw);

    // Event listener for undo 
    document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
            undo();
        }
    });

    // Event listener for toggle 
    const toggleButton = document.getElementById('toggleButton');
    toggleButton.addEventListener('click', toggleEraser);

    // Event listener for guide toggle 
    const guideToggle = document.getElementById('guideToggle');
    guideToggle.addEventListener('click', toggleGuide);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function stopDrawing() {
        isDrawing = false;
        paths.push(context.getImageData(0, 0, canvas.width, canvas.height));
        context.beginPath();
    }

    function draw(e) {
        if (!isDrawing) return;

        const rect = canvas.getBoundingClientRect();


        let x = (e.clientX || e.touches[0].clientX) - rect.left;
        let y = (e.clientY || e.touches[0].clientY) - rect.top;


        x = Math.max(0, Math.min(x, canvas.width));
        y = Math.max(0, Math.min(y, canvas.height));

        context.lineWidth = 3;
        context.lineCap = 'round';

        if (isErasing) {
            context.strokeStyle = '#fff';
        } else {
            context.strokeStyle = '#000';
        }

        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
    }

    function undo() {
        if (paths.length > 0) {
            paths.pop();
            context.clearRect(0, 0, canvas.width, canvas.height);

            if (paths.length > 0) {
                context.putImageData(paths[paths.length - 1], 0, 0);
            }
        }
    }

    function toggleEraser() {
        isErasing = !isErasing;
        toggleButton.textContent = isErasing ? 'Toggle Drawing' : 'Toggle Eraser';
    }

    function toggleGuide() {
        const guideContainer = document.getElementById('guideContainer');
        guideContainer.style.display = guideContainer.style.display === 'none' ? 'block' : 'none';
    }
});