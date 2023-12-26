

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
    if (IsFormValidated()) {
        $("#formMember").submit();
        return true;
    } else {
        return false;
    }
})






function CopareBirthDate() {

    console.log($("#txtDateBirth").val());
    console.log($("#txtJoinDate").val());
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





