const FONT_ID = 'dotsies-font-style';
const FONT_CSS = `
@font-face {
  font-family: 'Dotsies';
  src: url('${browser.runtime.getURL('fonts/dotsies.otf')}') format('opentype');
  font-weight: normal;
  font-style: normal;
}
.dotsies-on *:not(script):not(style) {
  font-family: 'Dotsies', sans-serif !important;
}
`;

function setDotsies(enabled) {
  let styleTag = document.getElementById(FONT_ID);
  if (enabled) {
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = FONT_ID;
      styleTag.textContent = FONT_CSS;
      document.head.appendChild(styleTag);
    }
    document.body.classList.add('dotsies-on');
  } else {
    if (styleTag) styleTag.remove();
    document.body.classList.remove('dotsies-on');
  }
}

// Listen for toggle message from background script
browser.runtime.onMessage.addListener((message) => {
  if (message && message.type === "TOGGLE_DOTSIES") {
    setDotsies(message.enabled);
  }
});

// On page load, check storage and set font if enabled
(async () => {
  let { dotsiesSites = {} } = await browser.storage.sync.get("dotsiesSites");
  const domain = window.location.hostname;
  setDotsies(!!dotsiesSites[domain]);
})();
