const fontUrl = chrome.runtime.getURL("fonts/dotsies.otf");

const style = document.createElement("style");
style.textContent = `
  @font-face {
    font-family: 'Dotsies';
    src: url('${fontUrl}') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  body, body *,
  p, span, div, a, li, td, th, h1, h2, h3, h4, h5, h6, label, button, input, textarea,
  *::first-letter, *::first-line {
    font-family: 'Dotsies' !important;
  }
`;

document.head.appendChild(style);

// Extreme: force inline for every element
function forceDotsiesFont(element) {
  if (element.nodeType === Node.ELEMENT_NODE) {
    element.style.setProperty('font-family', 'Dotsies', 'important');
  }
  for (const child of element.childNodes) {
    forceDotsiesFont(child);
  }
}
forceDotsiesFont(document.body);
