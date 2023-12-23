var btnOk = $("#btnOk").val();
var btnCancel = $("#btnCancel").val();
$(function () {
    $("#titleForm").text($("#hdnTitle").val());
    $("#labelNameAr").text($("#hdnlabelNameAr").val());
    $("#labelNameEn").text($("#hdnlabelNameEn").val());
    $("#btnFormSubmit").text($("#hdnbtnSave").val());
    $("#ButtonCancel").text($("#btnCancel").val());
    $("#ShowTable").show();
    $("#hideEmptyData").hide();
    $("#showEmptyData").show();
    $("#hideTable").hide();
});
$("#btnCreate").on("click", function () {
    $("#txtNameAr").focus();
    $("#txtNameAr").val('');
    $("#txtNameEn").val('');
    $("#txtNameAr").removeAttr("style");
    $("#errorNameAr").text("");
    $("#txtNameEn").parent().removeClass("focus-input");
    $("body").addClass("show-menu");
    $("#rowId").val("0");
    $("#btnFormSubmit").attr("onclick", "return CreateRow()");
});
function CreateRow() {
    if (IsFormValidated()) {
        $("#btnFormSubmit").addClass("disable-click");
        SetDataInTables();
        return true;
    } else {
        $("#btnFormSubmit").addClass("disable-click");
        return false;
    }
}

function SetDataInTables() {
    $("#btnFormSubmit").addClass("disable-click");
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
        dataType: "json",
        url: $("#urlAjaxCreate").val() + "?nameAr=" + $("#txtNameAr").val() + "&nameEn=" + $("#txtNameEn").val(),
        async: false,
        success: function (result) {
            if (result == "1" && result == "0") {
            } else {
                AppendRow(result);

            }
        }
    });


}

function IsFormValidated() {
    var isValid = true;
    $('.wizard-required').each(function (index, element) {
        if ($.trim($(element).val()) === "") {
            var ErrormegId = $(element).attr('data-id');
            var letter = $(element).attr("data-letter");
            $(element).css("border", "solid 1px red");
            $(element).focus();
            $("#" + ErrormegId).text($("#" + letter).val());
            isValid = false;
        }
    });
    return isValid;
}
$('.wizard-required').on("keydown", function () {
    $(this).removeAttr("style");
    let id = $(this).attr('data-id');
    $("#" + id).text("");
});

function UpdateRow() {
    if (IsFormValidated()) {
        $("#btnFormSubmit").addClass("disable-click");
        UpdateRowInDatabase();
        return true;
    } else {
        $("#btnFormSubmit").removeClass("disable-click");
        return false;
    }
}

function EditRow(id) {
    var rowId = id;
    var jobeTitleId = rowId.split("_")[1];
    var titleName = $("#tdnameAr_" + jobeTitleId).text();
    var titleNameEn = $("#tdnameEn_" + jobeTitleId).text();
    $("#rowId").val(jobeTitleId);
    if (titleName.trim() != "") {
        $("#txtNameAr").parent().addClass("focus-input");
        $("#txtNameAr").val(titleName);
    }
    if (titleNameEn.trim() != "" && titleNameEn.trim() != "<empty string>") {
        $("#txtNameEn").parent().addClass("focus-input");
        $("#txtNameEn").val(titleNameEn)
    } else {
        $("#txtNameEn").parent().removeClass("focus-input");
        $("#txtNameEn").val('')
    }
    $("#btnFormSubmit").attr("onclick", "return UpdateRow()");
    $("body").addClass("show-menu");
    $("#btnFormSubmit").removeClass("disable-click");
}



function AppendRow(id) {
    var appendRow = ` <tr id="trRowId_` + id + `">   
      <td  id="tdnameAr_`+ id + `"> ` + $("#txtNameAr").val() + ` </td>
      <td id="tdnameEn_`+ id + `"> ` + $("#txtNameEn").val() + `</td> 
      <td class="custom-btns">
          <div class="btn-options">
              <a href="#"><i class="far fa-ellipsis-h-alt"></i></a>
              <div class="btns-action">
                  <ul>
                      <li>
                          <a class="btn-edit" onclick="return EditRow(this.id)" id="btnEditRow_`+ id + `">
                              <i class="fal fa-pen"></i>
                              <span>`+ $("#ButtonEdit").val() + `</span>
                          </a>
                      </li>
                      <li>
                          <a href="#" class="btn-delete" onclick="return  DeleteRow(this.id)" id="btnDelete_`+ id + `" data-id="` + id + `">
                              <i class="fal fa-trash-alt"></i>
                              <span>`+ $("#ButtonDelete").val() + `</span>
                          </a>
                      </li>
                  </ul>
              </div>
          </div>
       </td>
    </tr>
    `;

    if ($("#hideTable").length) {
        $("#showEmptyData").hide();
        $("#hideTable").show();
        $("#showEmptyData").attr("id", "showEmptyData_0");
        $("#hideTable").attr("id", "hideTable_0");
        $("#tblList tbody").empty();
    }
    $("#tblList tbody").append(appendRow);
    Swal.fire({
        icon: 'success',
        text: $("#messageSavaDone").val(),
        className: "success-msg",
        showCloseButton: true,
        confirmButtonText: btnOk,
        cancelButtonText: btnCancel,
        closeOnClickOutside: false,
        timer: 1000,
        customClass: {
            confirmButton: 'theme-btn',
        },
    }).then((rsult) => {
        $("#txtNameAr").val("")
        $("#txtNameEn").val("")
        $("#txtNameAr").focus();
        $("#rowId").val("0");
        $("#txtNameEn").parent().removeClass("focus-input");
        $("#txtNameAr").parent().addClass("focus-input");
    });
    $("#txtNameAr").focus();
    publicOpenSubMneu();

    $("#btnFormSubmit").removeClass("disable-click");
    //$("#tblList").destroy();
}

function UpdateRowInDatabase() {
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
        dataType: "json",
        url: $("#urlAjaxEdit").val() + "?id=" + $("#rowId").val() + "&nameAr=" + $("#txtNameAr").val() + "&nameEn=" + $("#txtNameEn").val(),
        async: false,
        success: function (result) {
            if (result == "1" && result == "0") {

            } else {
                UpdateData($("#rowId").val());

                Swal.fire({
                    icon: "success",
                    text: $("#messageEditDone").val(),
                    className: "success-msg",
                    allowOutsideClick: false,
                    allowEnterKey: false,
                    showCloseButton: true,
                    timer: 2000,
                    confirmButtonText: btnOk,
                    customClass: {
                        confirmButton: 'theme-btn'
                    },
                });
            }
        }
    });
    //$("#btnFormSubmit").removeClass("disable-click");
}

function UpdateData(id) {
    $("#tdnameAr_" + id).text($("#txtNameAr").val());
    $("#tdnameEn_" + id).text($("#txtNameEn").val());
    $("body").removeClass("show-menu");
    $("#btnFormSubmit").removeClass("disable-click");
}

$(document).on("keydown", function (event) {
    if (event.keyCode == 13) {
        if (IsFormValidated()) {
            if ($('#btnFormSubmit').hasClass('disable-click')) {
            } else {
                $("#btnFormSubmit").addClass("disable-click");
                $("#btnFormSubmit").click();
            }
        } else {
            return false;
        }
    }
});


function DeleteRow(id) {
    var itemId = $("#" + id).attr("data-id");
    var actionUri = $("#DeleteRowUri").val();
    var alrtConfirmDelete = $("#confirmDelete").val();
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
            window.location = actionUri + itemId;
            return true;
        }
        else {
            return false;
        }
    });
}