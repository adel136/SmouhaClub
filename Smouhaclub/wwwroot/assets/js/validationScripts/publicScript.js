

function emailvalidate(id) {
    var val = $("#" + id + "").val();
    if (val != "") {
        //var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Old expression
        const emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.){1,3}[a-zA-Z]{2,}))$/);
        if (!emailPattern.test(val)) {
            Swal.fire({
                icon: "warning",
                title: "من فضلك أدخل بريد إلكتروني صحيح",
                allowOutsideClick: false,
                showCloseButton: true,
                //confirmButtonText: $("#btnOk").val(),
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                    confirmButton: 'theme-btn'
                },
            }).then((rsult) => {
                $("#" + id + "").val('');
                $("#" + id + "").focus();
            });
            return false;
        }
        return true;
    }
}

function IsFormValidated() {

    var isValid = true;
    $('.wizard-required').each(function (index, element) {
        if ($.trim($(element).val()) === "") {
            var ErrormegId = $(element).attr('data-id');
            var letter = $(element).attr("data-letter");
            $(element).css("border", "solid 1px red");
            $("#" + ErrormegId).text($("#" + letter).val());
            isValid = false;
        }
    });
    return isValid;
}

$("#btnSumetForm").on("click", function () {

    if (IsFormValidated()) {
        $("#fromCoutactUs").submit();
    }
});