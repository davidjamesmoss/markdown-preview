document.addEventListener('DOMContentLoaded', function () {
    const outputDiv = document.getElementById('htmlOutput');
    const filenameDiv = document.getElementById('filename');
    const dropzoneDiv = document.getElementById('dropzone');

    // Handle pastes
    document.addEventListener('paste', function (e) {
        let paste = (e.clipboardData || window.clipboardData).getData('text');
        setFilename('Pasted from clipboard');
        renderMarkdown(paste);
    });

    document.addEventListener('drop', function (e) {
        e.preventDefault();
        if (e.dataTransfer.files.length > 0) {
            // Handle file drops
            let file = e.dataTransfer.files[0];
            setFilename(file.name);
            readMarkdownFile(file);
        } else {
            // Handle text drops
            let text = e.dataTransfer.getData('text');
            setFilename('Dropped Text');
            renderMarkdown(text);
        }
    });

    document.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    function renderMarkdown(markdownText) {
        let html;
        if (typeof marked === 'function') {
            html = marked(markdownText);
        } else if (marked.parse && typeof marked.parse === 'function') {
            html = marked.parse(markdownText);
        } else {
            console.error('Markdown parser not found');
            return;
        }
        outputDiv.innerHTML = html;
        dropzoneDiv.remove();
    }

    function readMarkdownFile(file) {
        if (file && file.type.match('text.*')) {
            let reader = new FileReader();
            reader.onload = function (e) {
                renderMarkdown(e.target.result);
            };
            reader.readAsText(file);
        }
    }

    function setFilename(filename) {
        filenameDiv.textContent = filename;
        window.document.title = `Markdown Preview – ${filename}`;
    }
});
