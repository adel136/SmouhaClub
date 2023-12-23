
var NotSameMonth = $("#NotSameMonth").val();
var btnOk = $("#btnOk").val();



$("#frmFiscalMonths").on("keydown", function (event) {
    if (event.keyCode == 13) {
        if (IsFormValidated()) {
            $("#frmFiscalMonths").submit();
        } else {
            return false;
        }
    }
});

$("#btnFormSubmit").on("click", function () {
    if (IsFormValidated()) {
        $("#frmFiscalMonths").submit();
        return true;
    } else {
        return false;
    }
});



$(".require").on("keypress", function () {
    $(this).css("border-color", "");
    if ($(this).closest("div").parent().find('.spError').length) {//check if error span already appear
        $(this).closest("div").parent().find('.spError').remove();
    }
});

function IsFormValidated() {

    if ($('.spError').length) {//check if error span already appear
        $('.spError').remove();
    }

    var pleaseEnter = $("#txtPleaseEnter").val();
    var inputs = $(".require");
    for (var i = 0; i < inputs.length; i++) {
        if ($.trim($(inputs[i]).val()) === "") {
            $(inputs[i]).css("border-color", "red");
            if ($(inputs[i]).attr('type') == "text") {
                var inputTitle = $(inputs[i]).next().text();
                $(inputs[i]).closest("div").after("<span class='spError' style='color:red;display:block'>" + pleaseEnter + " " + inputTitle + "</span>");
            }
        }
    }

    if ($("#txtstartDate").val().trim() == "") {
        $('#txtstartDate').focus();
        return false;
    } else if ($("#txtEndDate").val().trim() == "") {
        $('#txtEndDate').focus();
        return false;
    }
    else if (!DatesAreValid()) {
        return false;
    }

    else {
        return true;
    }

}



function DatesAreValid() {
    var startDate = $("#txtstartDate").val();
    var endDate = $("#txtEndDate").val();
    var isValid = true;
    if (startDate != "" && endDate != "") {

        var date1 = new Date(startDate);
        var date2 = new Date(endDate);

        if (date2 <= date1) {
            var DatesCompare = $("#DatesCompare").val();
            Swal.fire({
                icon: "warning",
                title: DatesCompare,
                allowOutsideClick: false,
                showCloseButton: true,
                confirmButtonText: btnOk,
                customClass: {
                    confirmButton: 'theme-btn'
                },
            }).then((rsult) => {
                $("#txtEndDate").val('');
                $("#txtstartDate").val('');
            });
            isValid = false;
        }
        //else if (!areInSameMonth(date1, date2)) {
        //    Swal.fire({
        //        icon: "warning",
        //        title: NotSameMonth,
        //        allowOutsideClick: false,
        //        showCloseButton: true,
        //        confirmButtonText: btnOk,
        //        customClass: {
        //            confirmButton: 'theme-btn'
        //        },
        //    }).then((rsult) => {
        //        $("#txtstartDate").val('');
        //        $("#txtEndDate").val('');
        //    });
        //    isValid = false;
        //}
        else {
            var checkUri = $("#CheckUri").val();
            $.ajax({
                type: "GET",
                url: checkUri,
                headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
                data:
                {
                    "startDate": $("#txtstartDate").val(),
                    "endDate": $("#txtEndDate").val()
                },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result == true) {
                        var alrtCheck = $("#validEmpCode").val();
                        Swal.fire({
                            icon: "warning",
                            title: 'هذه الفترة موجودة بالفعل',
                            allowOutsideClick: false,
                            showCloseButton: true,
                            confirmButtonText: btnOk,
                            customClass: {
                                confirmButton: 'theme-btn'
                            },
                        }).then((rsult) => {
                            $("#txtstartDate").val('');
                            $("#txtEndDate").val('');
                        });
                        isValid = false;
                    }
                }
            });
        }
    }
    if (isValid) {
        return true;
    } else {
        return false;
    }

}


function areInSameMonth(date1, date2) {
    // Check if the month and year of both dates are the same
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
}


