chrome.tabs.getSelected(null, function(tab) {
  if(tab.url.indexOf("https://youtube.com" !== -1)) {
    jQuery.ajax({
      type: "POST",
      url: "http://127.0.0.1:8000",
      data: {
        'url': tab.url,
        'add_url': true
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
