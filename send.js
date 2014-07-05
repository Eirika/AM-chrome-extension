chrome.tabs.getSelected(null, function(tab) {
  if(tab.url.indexOf("https://youtube.com" !== -1)) {
    jQuery.ajax({
      type: "POST",
      url: "http://musique.amoki.fr",
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
