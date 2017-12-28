function initializeFileUpload() {
  $('input.file-upload').fileupload({
    url: UPLOAD_API,
    dataType: 'json',
    start: function() {
      $('#upload-button').attr('disabled', 'disabled');
      $('#upload-button-label').text('Uploading...');
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
      gotoResults();
      window.lastFileName = response.result.fileName;
    },
    complete: function() {
      $('#upload-button').removeAttr('disabled');
      $('#upload-button-label').text('Upload');
    }
  });
}

function triggerSelectFile() {
  $('#file').trigger('click');
}

function gotoResults() {
  var $target = $('#results');
  $('html, body').stop().animate({
    'scrollTop': $target.offset().top
  }, 900, 'swing', function () {
    window.location.hash = '#results';
  });
}

function tellMeWhenItsReady() {
  var email = $('#email').val();
  if(email == '' || email.trim().length == 0) {
    return;
  }
  $.post(TELL_ME_WHEN_ITS_READY, {email: email, lastFileName: window.lastFileName});
  $('#submit-btn').attr('disabled', 'disabled');
  $('#email').attr('disabled', 'disabled');
  $('#email-form h4').show();
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
