AOS.init({
    duration: 800,
    easing: 'slide'
});

$(document).ready(function($) {

    console.clear();
    "use strict";

    $(window).stellar({
        responsive: true,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: 'scroll',
        horizontalOffset: 0,
        verticalOffset: 0
    });

    // Scrollax
    $.Scrollax();


    // loader
    var loader = function() {
        setTimeout(function() {
            if ($('#ftco-loader').length > 0) {
                $('#ftco-loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    var carousel = function() {
        $('.carousel-testimony').owlCarousel({
            center: true,
            loop: true,
            items: 1,
            margin: 30,
            stagePadding: 0,
            nav: false,
            navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 3
                }
            }
        });
    };
    carousel();

    var fullHeight = function() {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function() {
            $('.js-fullheight').css('height', $(window).height());
        });

    };
    fullHeight();

    var counter = function() {

        $('#section-counter, .ftco-about').waypoint(function(direction) {

            if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

                var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
                $('.number').each(function() {
                    var $this = $(this),
                        num = $this.data('number');
                    console.log(num);
                    $this.animateNumber({
                        number: num,
                        numberStep: comma_separator_number_step
                    }, 7000);
                });

            }

        }, {
            offset: '95%'
        });

    }
    counter();

    var contentWayPoint = function() {
        var i = 0;
        $('.ftco-animate').waypoint(function(direction) {

            if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function() {

                    $('body .ftco-animate.item-animate').each(function(k) {
                        var el = $(this);
                        setTimeout(function() {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn ftco-animated');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft ftco-animated');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight ftco-animated');
                            } else {
                                el.addClass('fadeInUp ftco-animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 50, 'easeInOutExpo');
                    });

                }, 100);

            }

        }, {
            offset: '95%'
        });
    };
    contentWayPoint();
});


$(function() {

    var link = $('#navbar a.dot');

    // Move to specific section when click on menu link
    link.on('click', function(e) {
        var target = $($(this).attr('href'));
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 600);
        $(this).addClass('active');
        e.preventDefault();
    });

    // Run the scrNav when scroll
    $(window).on('scroll', function() {
        scrNav();
    });

    // scrNav function 
    // Change active dot according to the active section in the window
    function scrNav() {
        var sTop = $(window).scrollTop();
        $('section').each(function() {
            var id = $(this).attr('id'),
                offset = $(this).offset().top - 1,
                height = $(this).height();
            if (sTop >= offset && sTop < offset + height) {
                link.removeClass('active');
                $('#navbar').find('[data-scroll="' + id + '"]').addClass('active');
            }
        });
    }
    scrNav();
});


$(function() {
    $(".progress").each(function() {

        var value = $(this).attr('data-value');
        var left = $(this).find('.progress-left .progress-bar');
        var right = $(this).find('.progress-right .progress-bar');

        if (value > 0) {
            if (value <= 50) {
                right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
            } else {
                right.css('transform', 'rotate(180deg)')
                left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
            }
        }

    })

    function percentageToDegrees(percentage) {

        return percentage / 100 * 360

    }
});

$(function() {
    $("#success").hide()
    $("#error").hide()
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            sendEmail(event);
            $form.reset();
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });
})

function sendEmail(event){
  $("#btnSubmit").attr("disabled", true);
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
  console.log('>',name + ' ' + subject + ' ' + email + ' ' + message);
  var edata = 'name='+name+'&email='+email+'&note='+message+'&subject='+subject;
  console.log('edata',edata);
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
      },
      error: function() {
          $( "#loader").hide();
          $( "#error").slideDown( "slow" );
          setTimeout(function() {
            $( "#error").slideUp( "slow" );
          }, 1500);
      }
  });
}