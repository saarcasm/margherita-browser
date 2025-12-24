const { ipcRenderer } = require('electron');

let hSum = 0;
let lock = false;

window.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        hSum += e.deltaX;
        if (!lock && Math.abs(hSum) > 100) {
            if (hSum < -100) ipcRenderer.sendToHost('go-back');
            else if (hSum > 100) ipcRenderer.sendToHost('go-forward');
            
            lock = true;
            hSum = 0;
            setTimeout(() => { lock = false; }, 600);
        }
    } else { hSum = 0; }
});

const style = document.createElement('style');
style.innerHTML = `
    .ad-showing, .ad-interrupting, .ytp-ad-overlay-container, 
    #player-ads, #masthead-ad, .ytd-ad-slot-renderer,
    ytd-promoted-video-renderer, #opening-overlay {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
    }
`;
document.addEventListener('DOMContentLoaded', () => { document.head.appendChild(style); });