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
    html, body, body *:not([class*="icon"]):not([class*="emoji"]) {
      font-family: 'Dotsies', sans-serif !important;
      /* Mobile font-size adjustment */
      font-size: min(max(1em, 16px), 4vw) !important;
      line-height: 1.3 !important;
      letter-spacing: 0.05em !important;
    }
    @media (max-width: 600px) {
      html, body, body *:not([class*="icon"]):not([class*="emoji"]) {
        font-size: max(18px, 4vw) !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// Always inject on load
injectDotsiesStyle();
