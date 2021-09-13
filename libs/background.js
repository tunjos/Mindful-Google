// Background Script
chrome.runtime.onMessage.addListener((message, sender) => {
  if ((message.from === 'main') && (message.subject === 'showPageAction')) {
    chrome.pageAction.show(sender.tab.id);
  }
});
