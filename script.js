var url;

chrome.storage.sync.get('url', function(items) {
  url = items.url;
});

chrome.tabs.getSelected(null, function(tab) {
  if(tab.url.indexOf("https://youtube.com" !== -1)) {
    jQuery.ajax({
      type: "POST",
      url: url,
      data: {
        'url': tab.url
      },
      success: function(data) {
          console.log(data);
      }
    });
  }
  else {
    console.log("Only youtube pages can be send");
  }
});