
$(document.body).on('change', '[id^="PhotoId"]', function (e) {
    var filename = e.target.files[0].name;
    var fileExtensions = getFileExtension(filename);
    var allowedExt = "PNG,png,JPG,jpg,JPEG,jpeg";
    var allowedExtarry = allowedExt.split(",");

    if (!allowedExtarry.includes(fileExtensions)) {
        alert("من فضلك ختر صورة");
        //$("#errorNewsPhoto").text("من فضلك قم برفع صوره ");
        //$('#hdPhoto')[0].src = '';
        $("#PhotoId").val("");
        return false;
    }

    $('#img_url')[0].src = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
    //$("#errorNewsPhoto").text("");
    //$("#hdPhoto").removeClass("custom-img");

});

function getFileExtension(fileName) {
    // Find the last occurrence of the dot (.)
    var lastDotIndex = fileName.lastIndexOf(".");
    // If there is no dot or it's the last character in the file name, return an empty string
    if (lastDotIndex === -1 || lastDotIndex === fileName.length - 1) {
        return "";
    }
    // Extract the file extension using the substring method
    var extension = fileName.substring(lastDotIndex + 1);
    return extension;
}

//$(".wizard-required").on("keypress", function () {
//    $(this).css("border-color", "");
//    var ErrormegId = $(this).attr('data-id');
//    $("#" + ErrormegId).text('');
//});


function IsFormValidated() {
    var isValid = true;
    //$('.wizard-required').each(function (index, element) {
    //    if ($.trim($(element).val()) === "") {
    //        var ErrormegId = $(element).attr('data-id');
    //        var letter = $(element).attr("data-letter");
    //        $(element).css("border", "solid 1px red");
    //        $("#" + ErrormegId).text(letter);
    //        isValid = false;
    //    }
    //});

    //if ($("#PhotoId").val() == "") {
    //    $("#errorNewsPhoto").text("من فضلك قم برفع صورة الخبر ");
    //    isValid = false;
    //}
    return isValid;
}


$("#btnSubmit").on("click", function () {
    if (IsFormValidated()) {
        $("#frmSportsGame").submit();
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