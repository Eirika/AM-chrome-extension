// Saves options to chrome.storage
function save_options() {
  var url = $('#url').val();
  chrome.storage.sync.set({
    url: url
  }, function() {
    // Update status to let user know options were saved.
    var status = $('#status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });

  $.getJSON(url + "/rooms", function(allData) {
    $.each(allData.results, function(index, value) {
      $('#rooms').append($('<option>', {
          value: value.name,
          text: value.name
      }));
    });
    $('#url').prop('disabled', true);
    $('#content').show();
  }).fail(function(jqxhr) {
    console.error(jqxhr.responseText);
  });
}

function connect_to_room(){
  
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  $('#content').hide();
  chrome.storage.sync.get('url', function(items) {
    document.getElementById('url').value = items.url;
  });
}
$(function() {
  restore_options();
  $('#save').on('click', save_options);
  $('#connect').on('click', connect_to_room);
});


