
$(document.body).on('change', '[id^="PhotoId"]', function (e) {
    var filename = e.target.files[0].name;
    var fileExtensions = getFileExtension(filename);
    var allowedExt = ".png,.jpg,.jpeg";
    var allowedExtarry = allowedExt.split(",");
    if (!allowedExtarry.includes(fileExtensions)) {
        $("#errorNewsPhoto").text("من فضلك قم برفع صوره ");
        $('#hdPhoto')[0].src = '';
        $("#PhotoId").val("");
        return false;
    }
    $('#hdPhoto')[0].src = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
    $("#errorNewsPhoto").text("");
    $("#hdPhoto").removeClass("custom-img");
});
$(".wizard-required").on("keypress", function () {
    $(this).css("border-color", "");
    var ErrormegId = $(this).attr('data-id');
    $("#" + ErrormegId).text('');
});

$(".wizard-required").on("change", function () {
    $(this).css("border-color", "");
    var ErrormegId = $(this).attr('data-id');
    $("#" + ErrormegId).text('');
});

function IsFormValidated() {
    var isValid = true;
    $('.wizard-required').each(function (index, element) {
        console.log($(element));
        if ($.trim($(element).val()) === "") {
            var ErrormegId = $(element).attr('data-id');
            var letter = $(element).attr("data-letter");
            $(element).css("border", "solid 1px red");
            $("#" + ErrormegId).text(letter);
            isValid = false;
        }
    });

    //if ($("#PhotoId").val() == "") {
    //    $("#errorNewsPhoto").text("من فضلك قم برفع صورة الخبر ");
    //    isValid = false;
    //}
    return isValid;
}


$("#btnSubmitForm").on("click", function () {
    if (IsFormValidated()) {
        $("#formNews").submit();
        return true;
    }
    return false;
});


