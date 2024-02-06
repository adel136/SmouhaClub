


$(".wizard-required").on("keypress", function () {
   $(this).css("border-color", "");
   var ErrormegId = $(this).attr('data-id');
   $("#" + ErrormegId).text('');
});


function IsFormValidated() {
    var isValid = true;
    $('.wizard-required').each(function (index, element) {
       if ($.trim($(element).val()) === "") {
           var ErrormegId = $(element).attr('data-id');
           var letter = $(element).attr("data-letter");
           $(element).css("border", "solid 1px red");
           $("#" + ErrormegId).text(letter);
           isValid = false;
       }
    });
    return isValid;
}


$("#btnSubmit").on("click", function () {
    if (IsFormValidated()) {
        $("#frmSocial").submit();
    }
    return false;
});


$("#rdShowable").on("change", function () {
    if ($("#rdShowable").prop("checked") == true) {
        $("#rdShowable").val("true");
    } else {
        $("#rdShowable").val("false");
    }
});