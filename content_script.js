const fontUrl = chrome.runtime.getURL("fonts/dotsies.otf");

const style = document.createElement("style");
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
