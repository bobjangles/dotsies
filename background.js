function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

browser.action.onClicked.addListener(async (tab) => {
  const domain = getDomain(tab.url);
  if (!domain) return;
  let { dotsiesSites = {} } = await browser.storage.sync.get("dotsiesSites");
  const enabled = !dotsiesSites[domain];
  dotsiesSites[domain] = enabled;
  await browser.storage.sync.set({ dotsiesSites });
  // Send a message to content script to toggle font
  await browser.tabs.sendMessage(tab.id, { type: "TOGGLE_DOTSIES", enabled });
});
