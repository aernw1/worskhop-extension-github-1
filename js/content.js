const fileIcons = {
    '.js': 'js.png',
    '.json': 'js.png',
    '.tsx': 'ts.png',
    '.ts': 'ts.png',
    '.css': 'css.png',
    '.html': 'html.png',
    '.py': 'python.png',
    '.sh': 'bash.png',
    '.c': 'c.png',
    '.cpp': 'cpp.png',
    '.hs': 'haskell.png',
};

function addFileIcons() {
    try {
        console.log('Running addFileIcons');
        const fileRows = document.querySelectorAll('a.Link--primary[title][aria-label]');
        console.log(`Found ${fileRows.length} file rows`);
        fileRows.forEach(element => {
            if (element.tagName === 'A') {
                const fileName = element.textContent.trim();
                const extension = fileName.match(/\.[0-9a-z]+$/i)?.[0]?.toLowerCase();
                if (extension && fileIcons[extension] && !element.querySelector('.file-icon')) {
                    const iconPath = 'icons/' + fileIcons[extension];
                    element.prepend(createFileIcon(iconPath));
                }
                console.log(`Processing file: ${fileName}`);
            }
        });
    } catch (error) {
        console.error('Error in addFileIcons:', error);
        if (error.message.includes('Extension context invalidated')) {
            console.log('Extension context invalidated, reloading...');
            window.location.reload();
        }
    }
}
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
            addFileIcons();
        }
    });
});
const targetNode = document.getElementById('react-root') || document.body;
if (targetNode) {
    observer.observe(targetNode, { childList: true, subtree: true });
} else {
    console.error('Could not find a valid target node for MutationObserver');
}
addFileIcons();

function createFileIcon(iconPath) {
    const icon = document.createElement('img');
    icon.onerror = function() {
        console.error(`Failed to load icon: ${iconPath}`);
        console.log('Attempted full URL:', chrome.runtime.getURL(iconPath));
        console.log('Current extension context:', chrome.runtime.id);
        console.log('Extension manifest:', chrome.runtime.getManifest());
        this.style.display = 'none';
    };
    icon.src = chrome.runtime.getURL(iconPath);
    icon.className = 'file-icon';
    icon.style.width = '20px';
    icon.style.height = '20px';
    icon.style.marginRight = '5px';
    icon.style.verticalAlign = 'middle';
    icon.alt = '';
    return icon;
}