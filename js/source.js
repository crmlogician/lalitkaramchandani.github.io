 AOS.init({
  duration: 800,
  easing: 'slide'
 });

$(function(){
  $( "#success").hide()
  $( "#error").hide()
  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            console.log(name + ' ' + subject + ' ' + email + ' ' + message);
            var edata = 'name='+name+'&email='+email+'&note='+message+'&subject='+subject;
            return;
            $.ajax({
                type: "POST",
                url: "https://karamchandani-developer-edition.ap5.force.com/services/apexrest/email",
                data: {data:encodeURI(edata)},
                success: function () {
                    $( "#loader").hide();
                    $( "#success").slideDown( "slow" );
                    setTimeout(function() {
                      $( "#success").slideUp( "slow" );
                    }, 1500);
                    form.reset();
                },
                error: function() {
                    $( "#loader").hide();
                    $( "#error").slideDown( "slow" );
                    setTimeout(function() {
                      $( "#error").slideUp( "slow" );
                    }, 1500);
                }
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });
})