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
$("#btnSubmitForm").on('click', function () {
    if (!IsFormValidated()) {
        return false;
    }
    else if (!CheckSelectedType())
    {
        Swal.fire({
            title: 'عفواً! الرجاء اختيار صلة القرابة',
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
        return false;
    }
    else if (!CheckFee()) {
        Swal.fire({
            title: 'عفواً! الرجاء ادخال رسوم الإشتراك',
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
        return false;
    }
    else {
        $("#formMember").submit();

        //return false;
    }
})
function CopareBirthDate() {
    if ($("#txtDateBirth").val() != "" && $("#txtJoinDate").val() != "") {
        if (new Date($("#txtJoinDate").val().trim()) <= new Date($("#txtDateBirth").val().trim())) {
            Swal.fire({
                icon: "warning",
                title: "ععفواً ! تاريخ الميلاد أكبر من تاريخ الاشتراك",
                allowOutsideClick: false,
                showCloseButton: true,
                confirmButtonText: "موافق",
                customClass: {
                    confirmButton: 'theme-btn'
                },
            }).then((rsult) => {
                $("#txtJoinDate").val('');
                $("#txtJoinDate").parent().removeClass('focus input');
                $("#txtDateBirth").val('');
                $("#txtDateBirth").parent().removeClass('focus input');
            });
        }
    }
}
$(document).bind('keypress', function (e) {
    if (e.keyCode == 13) {
        if ($('#employeesModal').is(':visible')) {
        }
    }
});


function emailMembervalidate() {
    var val = $("#txtMemberEmail").val();
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
            $("#txtMemberEmail").val('');
            $("#txtMemberEmail").focus();
        });
        return false;
    } else {
        var urlValidateEmail = $("#urlAjaxMailValidate").val();
        var memberEmail = $("#MemberEmail").val();
        $.ajax({
            type: "GET",
            url: urlValidateEmail,
            data: {
                "memberEmail": memberEmail,
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
                        $("#txtMemberEmail").val("");
                    });
                } else {
                    return false;
                }
            }
        });
    }
}



////////////////////////////////////////////////////////////////


var LastId = $("#membersCount").val();
var rowNumber = parseInt(LastId);
var rowNumber_ = parseInt(LastId);
var wrapperGallery = $(".fields_Gallery");

$(wrapperGallery).on("click", ".remove_fieldGallery", function (e) {
    e.preventDefault();
    $(this).closest('tr').remove();
    rowNumber_--;
});

$(".add_field_buttonGallery").on("click", function (e) {//on add input button click
    console.log(LastId);
    e.preventDefault();
    $("#tblMemberShip tbody").append(`
    <tr id="trRow_`+ rowNumber +`">
    <td>
        <select id="ddlMemberType_`+ rowNumber +`" name="MemberType" class="form-control">
            <option value="">الرجاء الإختيار</option>
            <option value="1">ابن</option>
            <option value="2">ابنة</option>
            <option value="3">زوج/زوجة</option>
        </select>
     </td>
    <td>
        <input id="txtSubscriptionFee_`+ rowNumber +`" name="txtSubscFee" onblur="return AllowNumber(this)" class="form-control" />
    </td>   
        <td>
        <div class="btns-group">
          <a class="remove_fieldGallery btn theme-btn btn-delete" title="حذف"><i class="fal fa-trash-alt"></i></a>
        </div>
        </td>
        </tr>`
    );
    rowNumber++;
    rowNumber_++;
});




function CheckSelectedType() {
    var count = 0;
    $('[id^="ddlMemberType_"]').each(function () {
        var id = $(this).attr('id');
        var ret1 = id.split("_");

        if ($("#ddlMemberType_" + ret1[1]).val().trim() == "") {
            $("#ddlMemberType_" + ret1[1]).focus();
            count++;
        }

    });
    if (count == 0) { return true; } else { return false; }
}

function CheckFee() {
    var count = 0;
    $('[id^="txtSubscriptionFee_"]').each(function () {
        var id = $(this).attr('id');
        var ret1 = id.split("_");

        if ($("#txtSubscriptionFee_" + ret1[1]).val().trim() == "") {
            $("#txtSubscriptionFee_" + ret1[1]).focus();
            count++;
        }

    });
    if (count == 0) { return true; } else { return false; }
}


function AllowNumber(obj) {
    obj.value = obj.value.replace(/[^0-9\.]/g, '');
    if (obj.value.indexOf('.') !== obj.value.lastIndexOf('.')) {
        obj.value = obj.value.substring(0, obj.value.lastIndexOf('.'));
    }
}