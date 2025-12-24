const tabsContainer = document.getElementById('tabs-container');
const webviewContainer = document.getElementById('webview-container');
const newTabBtn = document.getElementById('new-tab-btn');

let tabs = [];
let activeTabId = null;

function createTab() {
  const tabId = Date.now();
  const tabButton = document.createElement('div');
  tabButton.className = 'tab';

  const iconContainer = document.createElement('div');
  iconContainer.className = 'icon-container';
  const iconImg = document.createElement('img');
  iconImg.className = 'tab-icon';
  iconImg.src = 'https://em-content.zobj.net/source/apple/354/pizza_1f355.png';
  const refreshBtn = document.createElement('div');
  refreshBtn.className = 'refresh-icon';
  iconContainer.appendChild(iconImg);
  iconContainer.appendChild(refreshBtn);

  const titleInput = document.createElement('input');
  titleInput.className = 'tab-title';
  titleInput.value = 'Margherita 🍕';
  titleInput.readOnly = true;

  const closeBtn = document.createElement('div');
  closeBtn.className = 'close-tab';
  closeBtn.innerText = '✕';
  closeBtn.onclick = (e) => { e.stopPropagation(); closeTab(tabId); };

  tabButton.appendChild(iconContainer);
  tabButton.appendChild(titleInput);
  tabButton.appendChild(closeBtn);
  tabButton.onclick = () => switchTab(tabId);

  const webview = document.createElement('webview');
  webview.src = 'src/home.html';
  webview.style.width = '100%'; webview.style.height = '100%';
  webview.setAttribute('partition', 'persist:main');
  webview.setAttribute('preload', './preload.js');
  webview.useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

  refreshBtn.onclick = (e) => { e.stopPropagation(); webview.reload(); };
  
  // Gesture listener
  webview.addEventListener('ipc-message', (event) => {
    if (event.channel === 'go-back' && webview.canGoBack()) webview.goBack();
    if (event.channel === 'go-forward' && webview.canGoForward()) webview.goForward();
  });

  // Aggressive Ad-Blocker
  webview.addEventListener('dom-ready', () => {
    webview.executeJavaScript(`
      setInterval(() => {
        const skipBtn = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern');
        if (skipBtn) skipBtn.click();
        const video = document.querySelector('video');
        if (document.querySelector('.ad-showing') && video && isFinite(video.duration)) {
            video.currentTime = video.duration;
        }
      }, 1000);
    `);
  });

  // History and Loading Logic
  webview.addEventListener('did-start-loading', () => {
    iconImg.classList.add('spinning');
    iconImg.src = 'https://em-content.zobj.net/source/apple/354/pizza_1f355.png';
  });

  webview.addEventListener('did-stop-loading', () => {
    iconImg.classList.remove('spinning');
    const url = webview.getURL();
    const title = webview.getTitle();
    
    if (url.includes('home.html')) {
        titleInput.value = 'Margherita 🍕';
        iconImg.src = 'https://em-content.zobj.net/source/apple/354/pizza_1f355.png';
    } else {
        titleInput.value = title || "Loading...";
        try {
            const domain = new URL(url).hostname;
            iconImg.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
            
            // Save to the main process localStorage
            saveToRecents(title, url, domain);
        } catch (e) { iconImg.src = 'https://em-content.zobj.net/source/apple/354/pizza_1f355.png'; }
    }
  });

  titleInput.addEventListener('dblclick', (e) => {
    e.stopPropagation(); titleInput.readOnly = false; titleInput.select();
  });
  titleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      let val = titleInput.value.trim();
      if (!val) return;
      let target = val.includes('.') && !val.includes(' ') 
                   ? (val.startsWith('http') ? val : 'https://' + val)
                   : 'https://www.google.com/search?q=' + encodeURIComponent(val);
      webview.loadURL(target);
      titleInput.readOnly = true; titleInput.blur();
    }
  });

  tabsContainer.appendChild(tabButton);
  webviewContainer.appendChild(webview);
  tabs.push({ id: tabId, button: tabButton, webview: webview });
  switchTab(tabId);
}

// Persist history in the main app's localStorage
function saveToRecents(title, url, domain) {
    let recents = JSON.parse(localStorage.getItem('margherita-recents') || '[]');
    recents = recents.filter(item => item.url !== url);
    recents.unshift({ title, url, domain });
    localStorage.setItem('margherita-recents', JSON.stringify(recents.slice(0, 6)));
}

function switchTab(id) {
  activeTabId = id;
  tabs.forEach(tab => {
    tab.button.classList.toggle('active', tab.id === id);
    tab.webview.style.display = tab.id === id ? 'flex' : 'none';
    // Refresh recents on home page when switching back to it
    if (tab.id === id && tab.webview.getURL().includes('home.html')) {
        tab.webview.reload();
    }
  });
}

function closeTab(id) {
  const index = tabs.findIndex(t => t.id === id);
  if (index === -1) return;
  const tab = tabs[index];
  tab.button.remove(); tab.webview.remove();
  tabs.splice(index, 1);
  if (activeTabId === id && tabs.length > 0) switchTab(tabs[tabs.length - 1].id);
  else if (tabs.length === 0) createTab();
}

newTabBtn.onclick = createTab;
createTab();