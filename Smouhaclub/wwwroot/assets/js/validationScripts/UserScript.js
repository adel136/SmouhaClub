
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


$("#btnSubmitForm").on("click", function () {
    if (IsFormValidated()) {
        $("#frmUsers").submit();
    }
    return false;
});


$("#rdIsActive").on("change", function () {
    if ($("#rdIsActive").prop("checked") == true) {
        $("#rdIsActive").val("true");
    } else {
        $("#rdIsActive").val("false");
    }
});


function checkName() {
    if ($("#txtUserName").val().trim() != "") {
        $.ajax({
            type: "GET",
            url: $("#CheckUserNameUri").val(),
            data: {
                "userId": $("#UserId").val(),
                "userName": $("#txtUserName").val().trim()
            },
            async: false,
            success: function (result) {
                if (result == true) {
                    Swal.fire({
                        icon: "warning",
                        title: "عفواً ! اسم المستخدم مستخدم من قبل",
                        allowOutsideClick: false,
                        showCloseButton: true,
                        confirmButtonText: "موافق",
                        customClass: {
                            confirmButton: 'theme-btn'
                        },
                    }).then((rsult) => {
                        $("#txtUserName").val("");
                        $("#txtUserName").focus();
                    });
                }
            }
        });
    }
}


function ValidatePassword() {
    var strength = document.getElementById('strength');
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");
    var pwd = document.getElementById("txtUserPassword");
    if (pwd.value.length == 0) {
        strength.innerHTML = '';
    } else if (false == enoughRegex.test(pwd.value)) {
        strength.innerHTML = '<span  id="strength1">برجاء اختيار كلمة مرور قوية</span> <input type="hidden"  value="0" name="txtHiddnPass" id="txtHiddnPass"/>';
        $("txtUserPassword").focus();

    } else if (strongRegex.test(pwd.value)) {
        strength.innerHTML = '<span  id="strength1" style="color:green">كلمة المرور قوية</span> <input type="hidden"  value="1" name="txtHiddnPass" id="txtHiddnPass"/>';

    } else if (mediumRegex.test(pwd.value)) {
        strength.innerHTML = '<span  id="strength1" style="color:orange">كلمة المرور متوسط!</span> <input type="hidden"  value="0" name="txtHiddnPass" id="txtHiddnPass"/>';
        $("txtUserPassword").focus();

    } else {
        strength.innerHTML = '<span id="strength1" style="color:red">كلمة المرور ضعيف!</span> <input type="hidden"  value="0" name="txtHiddnPass" id="txtHiddnPass"/>';
        $("txtUserPassword").focus();
    }
}


function emailMembervalidate() {
    var val = $("#txtUserEmail").val();
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(val)) {

        Swal.fire({
            icon: "warning",
            title: "من فضلك أدخل بريد إلكتروني صحيح",
            allowOutsideClick: false,
            showCloseButton: true,
            confirmButtonText: "موافق",
            customClass: {
                confirmButton: 'theme-btn'
            },
        }).then((rsult) => {
            $("#txtUserEmail").val('');
            $("#txtUserEmail").focus();
        });
        return false;
    } else {
        var urlValidateEmail = $("#CheckEmailUri").val();
        var email = $("#txtUserEmail").val();
        $.ajax({
            type: "GET",
            url: urlValidateEmail,
            data: {
                "email": email,
            },
            async: false,
            success: function (result) {
                if (result == "1") {
                    Swal.fire({
                        icon: "warning",
                        title: "عفواً ! البريد الإلكترونى مستخدم من قبل",
                        allowOutsideClick: false,
                        showCloseButton: true,
                        confirmButtonText: "موافق",
                        customClass: {
                            confirmButton: 'theme-btn'
                        },
                    }).then((rsult) => {
                        $("#txtUserEmail").val("");
                    });
                } else {
                    return false;
                }
            }
        });
    }
}