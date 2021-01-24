// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.insertCSS(tab.ib, {
    file: 'style.css'
  })
	chrome.tabs.executeScript(tab.ib, {
		file: 'inject.js'
  });
});