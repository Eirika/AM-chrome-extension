// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "all";
  var title = "Send to Amoki Music";
  var id = chrome.contextMenus.create({
    "title": title,
    "contexts":[context],
    "id": "context" + context
  });

  chrome.storage.sync.set({
    url: "https://music.amoki.fr",
  });
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
  console.log(info);
  console.log(tab);

  var url;
  chrome.storage.sync.get('url', function(items) {
    url = items.url;

    var musicUrl = getMusicUrl(info);
    if (musicUrl) {
      console.debug(musicUrl);
      console.debug(url);
      jQuery.ajax({
          type: "POST",
          url: url + "/",
          data: {
            'url': musicUrl
          },
          success: function(data) {
              console.log(data);
          }
      });
    }
    else {
      alert("Only youtube urls can be send");
    }
  });
}

function getMusicUrl(info) {
  var tempUrl = null;
  if(info.selectionText && isGoodUrl(info.selectionText)) {
    tempUrl = info.selectionText;
  }
  else if(info.linkUrl && isGoodUrl(info.linkUrl)) {
    tempUrl = info.linkUrl;
  }
  else if(info.pageUrl && isGoodUrl(info.pageUrl)) {
    tempUrl = info.pageUrl;
  }

  return tempUrl;
}

function isGoodUrl(url) {
  var regex = /(?:v=|youtu\.be\/)([^&?]+)/;
  return regex.test(url);
}