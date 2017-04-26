$(document).ready(function() {

// carousel

$('#myCarousel').carousel({
        interval: 10000
    })
	// Test for placeholder support
    $.support.placeholder = (function(){
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();



    // Hide labels by default if placeholders are supported
    if($.support.placeholder) {
        $('.form-label').each(function(){
            $(this).addClass('js-hide-label');
        });

        // Code for adding/removing classes here
        $('.form-group').find('input, textarea').on('focusin', function(){
          $(this).prev('label').removeClass('js-hide-label');
        });
        // $('.form-group').find('input, textarea').on('keyup blur focus', function(e){
        //
        //     // Cache our selectors
        //     var $this = $(this),
        //         $parent = $this.parent().find("label");
        //
        //     if (e.type == 'keyup') {
        //         if( $this.val() == '' ) {
        //             $parent.addClass('js-hide-label');
        //         } else {
        //             $parent.removeClass('js-hide-label');
        //         }
        //     }
        //     else if (e.type == 'blur') {
        //         if( $this.val() == '' ) {
        //             $parent.addClass('js-hide-label');
        //         }
        //         else {
        //             $parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
        //         }
        //     }
        //     else if (e.type == 'focus') {
        //         if( $this.val() !== '' ) {
        //             $parent.removeClass('js-unhighlight-label');
        //         }
        //     }
        // });
    }
});

// Send the form by an ajax
$("#button-submit").on("click", function() {
    event.preventDefault();
    var url = 'server/email.php';
    var firstName = $("#first_name").val();
    var lastName = $("#last_name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var message = $("#message").val();
    if (firstName.length > 2) {
        $('#p_firstName').html("");
    } else {
        $('#p_firstName').html("Please enter a name");
    }
    if (lastName.length > 2) {
        $('#p_lastName').html("");
    } else {
        $('#p_lastName').html("Please enter a last name");
    }
    if (email.length > 2) {
        $('#p_email').html("");
    } else {
        $('#p_email').html("please enter a valid email address");
    }
    if (phone.length > 2) {
        $('#p_phone').html("");
    } else {
        $('#p_phone').html("please enter a valid phone");
    }
    if (message.length > 2) {
        $('#p_message').html("");
    } else {
        $('#p_message').html("Please tell us about your project");
    }
    if (firstName.length > 2 && lastName.length > 2 && email.length > 2 && phone.length > 2 && message.length > 2) {
        if (isValidEmail(email)) {
            $.ajax({
                url: url,
                method: "POST",
                success: function(resp, txt, xhr) {
                  console.log(resp);
                    if (resp == "Thank you for contacting us.") {
                        $('#button-submit').html('Sent');
                        $('#p_email').html('');
                        $("#first_name").val('');
                        $("#last_name").val('');
                        $("#email").val('');
                        $("#comments").val('');
                        $("#telephone").val('');
                    } else {
                        $('#button-submit').html('Try Again');
                        $('#p_email').html('');
                    }
                },
                error: function(err) {
                    alert(JSON.stringify(err));
                },
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone,
                    message: message
                }
            });
        } else {
            $('#p_email').html('please enter a valid email address');
            $('#button-submit').html('Try again');
        }
    } else {
        $('#button-submit').html('Try again');
    }

});

function isValidEmail(str){
       var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       return pattern.test(str) && str.indexOf(",") == -1;
     }
