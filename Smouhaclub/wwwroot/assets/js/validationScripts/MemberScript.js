

var allowedExtensions = $("#AllowedExtensions").val();
var btnOk = $("#btnOk").val();

$(function () {

    if ($("#hdnPhoto").val() != "") {
        $("#img_url").show();
    }

    GetAllCities();
});

$("#btnFormSubmit").on("click", function () {

    $("#frmEmployee").submit();
});

$(".wizard-required").on("change", function () {
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
$(document.body).on('change', '[id^="UploadEmpPhoto"]', function (e) {
    var filename = e.target.files[0].name;
    var splitFileName = filename.split(".");
    var allowedExt = "PNG,png,JPG,jpg,JPEG,jpeg";
    var allowedExtarry = allowedExt.split(",");
    if (!allowedExtarry.includes(splitFileName[1])) {

        Swal.fire({
            icon: "warning",
            title: allowedExtensions,
            allowOutsideClick: false,
            showCloseButton: true,
            confirmButtonText: btnOk,
            customClass: {
                confirmButton: 'theme-btn'
            },
        }).then((rsult) => {
            $('#img_url')[0].src = ('');
            $('#imgModal')[0].href = ('');
            $("#UploadEmpPhoto").val('');
            $("#img_url").hide();
        });

        return false;
    }

    $('#img_url')[0].src = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
    $('#imgModal')[0].href = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
    $("#img_url").show();
    $("#img_url").removeClass("custom-img");

});
$("#btnSubmitForm").on('click', function () {
    if (IsFormValidated()) {
        $("#formMember").submit();
        return true;
    } else {
        return false;
    }
})


function CopareBirthDate() {
    if ($("#BirthDate").val() != "" && $("#HireDate").val() != "") {

        if (new Date($("#HireDate").val().trim()) <= new Date($("#BirthDate").val().trim())) {
            var msg = $("#HireBirthDateCompare").val();
            Swal.fire({
                icon: "warning",
                title: msg,
                allowOutsideClick: false,
                showCloseButton: true,
                confirmButtonText: btnOk,
                customClass: {
                    confirmButton: 'theme-btn'
                },
            }).then((rsult) => {
                $("#BirthDate").val('');
                $("#BirthDate").parent().removeClass('focus input');
                $("#HireDate").val('');
                $("#HireDate").parent().removeClass('focus input');
            });
        }
    }
}

function ShowNextInputs() {
    var currentBtn = $("#btnNext");
    var parentFieldset = jQuery(currentBtn).parents('.wizard-fieldset');
    var currentActiveStep = jQuery(currentBtn).parents('.form-wizard').find('.form-wizard-steps .active');
    var next = jQuery(currentBtn);
    var nextWizardStep = true;

    if (nextWizardStep) {
        next.parents('.wizard-fieldset').removeClass("show", "400");
        currentActiveStep.removeClass('active').addClass('activated').next().addClass('active', "400");
        next.parents('.wizard-fieldset').next('.wizard-fieldset').addClass("show", "400");
        jQuery(document).find('.wizard-fieldset').each(function () {
            if (jQuery(currentBtn).hasClass('show')) {
                var formAtrr = jQuery(currentBtn).attr('data-tab-content');
                jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function () {
                    if (jQuery(currentBtn).attr('data-attr') == formAtrr) {
                        jQuery(currentBtn).addClass('active');
                        var innerWidth = jQuery(currentBtn).innerWidth();
                        var position = jQuery(this).position();
                        jQuery(document).find('.form-wizard-step-move').css({ "left": position.left, "width": innerWidth });
                    } else {
                        jQuery(currentBtn).removeClass('active');
                    }
                });
            }
        });
    }
}

function CheckEmpCode() {

    var EmpId = $("#EmpId").val();
    var employeeCode = $("#EmployeeCode").val();
    var funcUrl = $("#CheckCodeUri").val();
    if (employeeCode) {
        $.ajax({
            type: "GET",
            url: funcUrl,
            headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
            data:
            {
                "EmployeeId": EmpId,
                "employeeCode": employeeCode
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data == "1") {
                    var alrtCheck = $("#validEmpCode").val();
                    Swal.fire({
                        icon: "warning",
                        title: alrtCheck,
                        allowOutsideClick: false,
                        showCloseButton: true,
                        confirmButtonText: btnOk,
                        customClass: {
                            confirmButton: 'theme-btn'
                        },
                    }).then((rsult) => {
                        $("#EmployeeCode").val('');
                        $("#EmployeeCode").focus();
                    });

                    return false;
                }
            }
        });
    }

}

function GetAllCities() {
    var countryId = $("#CountryId").val();
    var cityUrl = $("#CitiesUri").val();
    if (countryId) {
        $.ajax({
            type: "GET",
            url: cityUrl,
            headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
            data:
            {
                "countryId": countryId
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $('#ddlCity option').each(function () {
                    if ($(this).val() != "") {
                        $(this).remove();
                    }
                });
                var options = '';

                for (var i = 0; i < data.length; i++) {
                    options += '<option value="' + data[i].cityId + '">' + data[i].cityNameAr + '</option>';
                }
                $("#ddlCity").append(options);
                $('#ddlCity').val($("#hdnCityValue").val()).trigger('change');
            }
        });
    } else {
        $('#ddlCity option').each(function () {
            if ($(this).val() != "") {
                $(this).remove();
            }
        });
    }
}


var uri = "";
var ddlSelect = "";
$(".btnOpenModel").on('click', function () {

    $("#txtOptionNameAr").focus();
    $("#txtOptionNameAr").val('');
    $("#txtOptionNameEn").val('');

    $("#modelTitle").text($(this).attr('data-title'));

    uri = $(this).attr('data-uri');
    ddlSelect = $(this).attr('data-id');

    if (ddlSelect == "ddlCity") {
        if ($("#CountryId").val() == 0) {
            var countryValid = $("#PleaseSelectCountry").val();
            Swal.fire({
                icon: "warning",
                title: 'اً',
                allowOutsideClick: false,
                showCloseButton: true,
                confirmButtonText: btnOk,
                customClass: {
                    confirmButton: 'theme-btn'
                },
            });
            $("#employeesModal").modal('hide');
            return false;
        }
    }
    $("#employeesModal").modal('show');
});




$(document).bind('keypress', function (e) {
    if (e.keyCode == 13) {
        if ($('#employeesModal').is(':visible')) {
            $("#btnSaveOption").click();
        }
    }
});

$("#btnSaveOption").on("click", function () {
    var optionNameAr = $("#txtOptionNameAr").val();
    var optionNameEn = $("#txtOptionNameEn").val();
    var countryId = $("#CountryId").val();

    if (optionNameAr != "") {
        $.ajax({
            type: "GET",
            url: $("#AddOptionUri").val(),
            headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
            data:
            {
                "uri": uri,
                "optionNameAr": optionNameAr,
                "optionNameEn": optionNameEn,
                "countryId": countryId
            },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != "0") {
                    $("#" + ddlSelect).append('<option value="' + result + '">' + optionNameAr + '</option>');
                    $("#" + ddlSelect).val(result);
                }
                $("#employeesModal").modal('hide');

                var errorMsg = $("#" + ddlSelect).attr('data-id');
                $("#" + errorMsg).text('');
            }
        });
    }
    else {
        $("#validNameAr").show();
    }
});


function HideAlert() {
    $("#validNameAr").hide();
}




