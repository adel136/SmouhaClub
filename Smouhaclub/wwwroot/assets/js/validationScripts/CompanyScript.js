



$(document.body).on('change', '[id^="UpLogo"]', function (e) {
    var filename = e.target.files[0].name;
    var fileExtensions = getFileExtension(filename);
    var allowedExt = $("#allowedExtensions").val();
    var allowedExtarry = allowedExt.split(",");
    if (!allowedExtarry.includes(fileExtensions)) {
        $("#errorLogo").text($("#mesgeUplodeLogo").val());
        $('#hdLogo')[0].src = '';
        $("#UpLogo").val("");
       
        return false;
    }
    $('#hdLogo')[0].src = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
    $("#errorLogo").text("");
    $("#hdLogo").removeClass("custom-img");
});




function IsFormValidated() {

    var isValid = true;
    $('.wizard-required').each(function (index, element) {
        console.log($(element));
        if ($.trim($(element).val()) === "") {
            var ErrormegId = $(element).attr('data-id');
            var letter = $(element).attr("data-letter");
            $(element).css("border", "solid 1px red");
            $("#" + ErrormegId).text($("#" + letter).val());
            isValid = false;
        }
    });
    //if ($("#txtCompanyNameAr").val().trim() == "") {
    //    $("#errorCompanyNameAr").text("");
    //    
    //    $("#txtCompanyNameAr").focus();
    //    return false;
    //}
    //else if ($("#txtCompanyEmail").val().trim() == "") {
    //    $("#errorCompanyEmail").text("من فضلك أدخل البريد الالكتروني");
    //    $("#txtCompanyEmail").css("border", "solid 1px red");
    //    $("#txtCompanyEmail").focus();
    //    return false;
    //}
    //else {
    //    return true;
    //}
    return isValid;
}


function emailvalidate(id) {
    var mail = $("#" + id + "").val();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) == false) {
        $("#errorCompanyEmail").text($("#mesgeCorrctyMail").val());
        $("#txtCompanyEmail").css("border", "solid 1px red");
        $("#txtCompanyEmail").focus();
        $("#txtCompanyEmail").val("");
        return false;
    } else {
        $("#errorCompanyEmail").removeAttr("style");
        $("#errorCompanyEmail").text("");
    }
}

$("#btnSubmitForm").on("click", function () {
    if (IsFormValidated()) {
        $("#formCompany").submit();
        return true;
    }
    return false;
});


jQuery('[id="txtCompanyPhone"]').keyup(function () {
    AcceptOnlyNumbers(this)
});
jQuery("#txtCompanyFax").keyup(function () {

    AcceptOnlyNumbers(this)
});
jQuery('[id="txtCompanyPhone"]').keyup(function () {

    AcceptOnlyNumbers(this)
});

function AcceptOnlyNumbers(input) {
    input.value = input.value.replace(/[^0-9\+()]/g, '');
    if (input.value.indexOf('+') !== input.value.lastIndexOf('+')) {
        input.value = x.value.substring(0, input.value.lastIndexOf('+'));
    }
}