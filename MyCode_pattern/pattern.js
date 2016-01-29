/* This is a form submit module
where we pass the form jquery object to this module. All the functionality related to form // submission will go inside this module and we only expose start and stop functions which we needed in public.  
  
  */
var FormSubmit = (function(){
  var $el;
   

  var onSubmit = function (e) {
    e.preventDefault();

    var formData = {
        'firstname'   : $el.find('input[name=firstname]').val(),
        'lastname'    : $('input[name=lastname]').val(),
        'email'       :$('input[name=email]').val(),
    };
    $.ajax({
      type        : 'POST',
      url         : 'process.php',
      data        : formData,
      dataType    : 'json',
    beforeSend: function () {
      $('#inbox-holder').text('Loading...');
      }
      
    })
    .done(onDone)
    .fail(onFail)
    .always(onAlways)
    ;
  };
  
  var onDone = function(data) {
    // show response

    console.log(data);
        $("#responsemessage").html(" ");

        if (data) {
          // if validation is success , displays message
          $('#responsemessage').append('<p>' + data.message + '</p>');
          $('#responsemessage').append('<div>' + data.firstname + '</div>');
          $('#responsemessage').append('<div>' + data.lastname + '</div>');
          $('#responsemessage').append('<div>' + data.email + '</div>');
           $('#firstnameerror').html(" ");
          $('#lastnameerror').html(" ");
          $('#emailerror').html(" ");
        }
        return false;

  };
  
  var onFail = function(xhr) {
    // show validation error
     $('#firstnameerror').html(" ");
     $('#lastnameerror').html(" ");
     $('#emailerror').html(" ");
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

  };
  
  var onAlways = function() {
    // remove loading here
          $('#inbox-holder').text(" ");



  };
  
  var end = function() {
    $el.off('submit');
  };
  
  var init = function(options) {
    $el = options.el;
    $el.on('submit', onSubmit);
  };
  
  return {
    start: init,
    stop: end
  };
  
})();


$(function(){
    console.log("Document Loaded");

  FormSubmit.start({
    el: $('form')
  });  
});

$(function() {

});