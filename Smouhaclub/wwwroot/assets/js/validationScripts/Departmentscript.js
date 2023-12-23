$(function () {
    $(".form-select").select2();
});

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
$("#btnSubmitForm").on("click", function () {
    if (IsFormValidated()) {
        $("#formDepartment").submit();
        return true;
    }
    return false;
});

$("[id^='btnDelete_']").on("click", function () {

    var itemId = $(this).attr("data-id");
    var publishName = $("#UrlDeleteDepartment").val();
    var alrtConfirmDelete = $("#confirmDelete").val();
    var btnOk = $("#btnOk").val();
    var btnCancel = $("#btnCancel").val();

    Swal.fire({
        title: alrtConfirmDelete,
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: btnOk,
        cancelButtonText: btnCancel,
        closeOnClickOutside: false,
        className: "warning-msg",
        customClass: {
            confirmButton: 'theme-btn',
            cancelButton: 'theme-btn-two'
        },
    }).then((rsult) => {
        if (rsult.isConfirmed) {
            window.location = publishName + itemId;
            return true;
        }
        else {
            return false;
        }
    });

});