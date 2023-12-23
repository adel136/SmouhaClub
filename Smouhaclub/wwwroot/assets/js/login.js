
$(document).ready(function () {



    $("#iEye").click(function () {
        if ($("#UserPassword").attr("type") === "password") {
            $("#UserPassword").prop("type", "text");
            $(this).addClass("showPass");
        } else {
            $("#UserPassword").prop("type", "password");
            $(this).removeClass("showPass");
        }
    });
    // Select all input elements not of type "hidden"
    var nonHiddenInputs = $('input:not([type="hidden"])');

    nonHiddenInputs.each(function () {
        if ($(this).val() != "") {
            $(this).parent().addClass("focus-input");
        } else {

            $(this).parent().removeClass("focus-input");
        }

        $(".form-focus > label").on('click', function () {
            if ($(this).prev().val() != "") {
                $(this).parent().addClass("focus-input");
            } else {

                $(this).parent().removeClass("focus-input");
            }
        })
    });


    function focusOnInput() {
        // focus on input field check empty or not
        nonHiddenInputs.on('focus', function () {
            var tmpThis = jQuery(this).val();
            if (tmpThis == '') {
                jQuery(this).parent().addClass("focus-input");
            }
            else if (tmpThis != '') {
                jQuery(this).parent().addClass("focus-input");
            }
        }).on('blur', function () {
            var tmpThis = jQuery(this).val();
            if (tmpThis == '') {
                jQuery(this).parent().removeClass("focus-input");
            }
            else if (tmpThis != '') {
                jQuery(this).parent().addClass("focus-input");
            }
        });

    }


    focusOnInput();



});