
$(document.body).on('change', '[id^="PhotoId"]', function (e) {
    var filename = e.target.files[0].name;
    var fileExtensions = getFileExtension(filename);
    var allowedExt = "PNG,png,JPG,jpg,JPEG,jpeg";
    var allowedExtarry = allowedExt.split(",");

    if (!allowedExtarry.includes(fileExtensions)) {
        Swal.fire({
            title: 'عفواً! هذا الملف غير مسموح به , الإمتدادات المسموح بها هي .pnb , .jpg , .jpeg',
            icon: "warning",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'موافق',
            cancelButtonText: 'إلغاء',
            closeOnClickOutside: false,
            className: "warning-msg",
            customClass: {
                confirmButton: 'theme-btn',
                cancelButton: 'theme-btn-two'
            },
        });
        //$('#hdPhoto')[0].src = '';
        $("#PhotoId").val("");
        return false;
    }

    $('#img_url')[0].src = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
    //$("#errorNewsPhoto").text("");
    //$("#hdPhoto").removeClass("custom-img");

});



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
        $("#frmSPortsGame").submit();
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