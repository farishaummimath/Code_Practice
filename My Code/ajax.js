$(document).ready(function() {

  $('#load-form').on('click', function (){
    $.get('form.html', function (data) {
      $('#form-placeholder').html(data);
      bindForm();
    });
  })


  $.ajax({
    url: 'listing.php?firstname=farisha',
    beforeSend: function () {
      $('#inbox-holder').text('Loading...');
    }
  })
  
  .done(function(data){
    try {
      $('#inbox-holder').html("")
      if (data.length === 0 ) {
        $('#inbox-holder').html("Your inbox is empty");
        return;
      }
      console.log(data);
      console.log(data.list);
      var html = "";
      // for (var i = data.list.length - 1; i >= 0; i--) {
      //   html += "<div>" + data.list[i].name + "</div>";
      // };
      $(data).each(function (index, datum) {
        console.log(datum);
        if (typeof datum.name == 'undefined') {
          return;
        }
        html += "<div>" + datum.name + ' ' + datum.lastnem + "</div>";
      });
    }
    catch(e) {
      var html = e.message;
    }
    $('#inbox-holder').html(html);
  })
  
  .fail(function(){
    $('#inbox-holder').text('something went wrong');
  })

  // process the form
});


function bindForm() {
  $('#form').on( 'submit' ,function(e) {

    e.preventDefault();


    // remove success messages

    // get the form data
    var formData = {
        'firstname'   : $('input[name=firstname]').val(),
        'lastname'    : $('input[name=lastname]').val(),
        'email'       :$('input[name=email]').val(),
    };

    // if (formData.firstname === '') {
    //   $('#firstnameerror').html("First name is required");
    //   return false;
    // }

    // process the form
    $.ajax({
      type        : 'POST',
      url         : 'process.php',
      data        : formData,
      dataType    : 'json',
      success     : function(data) {
        console.log(data);
        if (data.success) {
          // if validation is success , displays message
          $('#responsemessage').append('<p>' + data.message + '</p>');
          $('#responsemessage').append('<div>' + data.firstname + '</div>');
          $('#responsemessage').append('<div>' + data.lastname + '</div>');
          $('#responsemessage').append('<div>' + data.email + '</div>');
        }
        return false;
      },
      error: function (xhr) {
        data = xhr.responseJSON;

          if (data.errors.firstname) {
            $('#firstnameerror').html(data.errors.firstname);
          }

          if (data.errors.lastname) {
            $('#lastnameerror').html(data.errors.lastname);
          }
          if (data.errors.email) {
            $('#emailerror').html(data.errors.email);

          };
      }
    });

    // stop the form from submitting and refreshing
  });
}
