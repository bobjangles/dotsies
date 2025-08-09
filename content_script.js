const fontUrl = chrome.runtime.getURL("fonts/dotsies.otf");

function injectDotsiesStyle() {
  if (document.getElementById('dotsies-font-style')) return;
  const style = document.createElement("style");
  style.id = 'dotsies-font-style';
  style.textContent = `
    @font-face {
      font-family: 'Dotsies';
      src: url('${fontUrl}') format('opentype');
      font-weight: normal;
      font-style: normal;
    }
    body, body *:not([class*="icon"]):not([class*="emoji"]) {
      font-family: 'Dotsies' !important;
    }
  `;
  document.head.appendChild(style);
}

function removeDotsiesStyle() {
  const style = document.getElementById('dotsies-font-style');
  if (style) style.remove();
}

// Respond to popup toggle messages
if (typeof browser !== "undefined" && browser.runtime && browser.runtime.onMessage) {
  browser.runtime.onMessage.addListener((message) => {
    if (typeof message.dotsiesEnabled === 'boolean') {
      if (message.dotsiesEnabled) injectDotsiesStyle();
      else removeDotsiesStyle();
    }
  });

  // On load, apply if enabled
  browser.storage.local.get('dotsiesEnabled').then((result) => {
    if (result.dotsiesEnabled) injectDotsiesStyle();
    else removeDotsiesStyle();
  });
} else {
  // fallback for Chrome
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (typeof message.dotsiesEnabled === 'boolean') {
      if (message.dotsiesEnabled) injectDotsiesStyle();
      else removeDotsiesStyle();
    }
  });

  chrome.storage.local.get('dotsiesEnabled', (result) => {
    if (result && result.dotsiesEnabled) injectDotsiesStyle();
    else removeDotsiesStyle();
  });
}
