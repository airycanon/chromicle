chrome.browserAction.onClicked.addListener(function(activeTab){
    var newURL = "chrome://history";
    chrome.tabs.create({ url: newURL });
});