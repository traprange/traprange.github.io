function initializeFileUpload() {
  $('input.file-upload').fileupload({
    url: UPLOAD_API,
    dataType: 'json',
    start: function() {
      $('#upload-button').attr('disabled', 'disabled');
      $('#upload-button-label').text('Processing...');
    },
    done: function (e, response) {
      if(response.result.pageImage != null) {
        var pageImage = BASE_API_URL + response.result.pageImage;
        $("div.page-image-container img").attr('src', pageImage);
        $("div.page-image-container").show();
      }
      // show response
      var id = $("div.results div.container").length + 1;
      var label = 'Result #' + id;
      var html = '<div class="container">'
        + '<h3>' + label + '</h3>'
        + '<div class="json-container" id="' + id + '"></div>'
        + '<br />'
        + '</div>';
      $('.results').prepend(html);
      $('#' + id).JSONView(response.result.payload, {collapsed: true});
    },
    complete: function() {
      $('#upload-button').removeAttr('disabled');
      $('#upload-button-label').text('Uploading');
    }
  });
}

function triggerSelectFile() {
  $('#file').trigger('click');
}

$(document).ready(function() {
  initializeFileUpload();
  $(".json-container").JSONView(sampleJson);
  $('#year').text(new Date().getFullYear());
  // Hello server
  $.get(UPLOAD_API)
    .then(function(response) {
      console.log('Server Response: ', response);
    });
});
