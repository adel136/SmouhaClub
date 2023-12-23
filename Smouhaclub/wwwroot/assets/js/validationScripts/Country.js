
var rowNumber = 1;
var rowNumber_ = 1;

$("#btnCreate").on("click", function () {
    $("#txtcountryNameAr").focus();
    $("#txtcountryNameAr").val('');
    $("#txtcountryNameEn").val('');
    $("#txtcountryNameAr").removeAttr("style");
    $("#errorNameAr").text("");
    $("#txtcountryNameEn").parent().removeClass("focus-input");
    $("#divCity").empty();
    AppendRowInCity(1);
    $("body").addClass("show-menu");
});
function newRow() {

    let newRow = `
                <div class="row form-group" id="RowCiry_">
                        <div class="col-md-5">
                            <div class="form-focus">
                                <input id="txtCityNameAr_" name="txtCityNameAr" type="text" class="wizard-required" data-letter="txtPleaseEnterCity" data-id="errorCityNameAr" />
                                <label>`+ $("#labelCityNameAr").val() + ` <span style="color:red;">*</span></label>
                            </div>
                            <div class="wizard-form-error" id="errorCityNameAr"></div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-focus">
                                <input id="txtCityNameEn_" name="txtCityNameEn" type="text" class="" />
                                <label>`+ $("#labelCityNameAr").val() + `</label>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="focus-input">
                                <button class="btn btn-remove theme-btn-two" onclick="return  RemoveDivCiry(this.id)" id="btnDeleteRow_" title="`+ $("#btnDeleteCity").val() + `"><i class="fal fa-trash-alt"></i></button>
                            </div>
                        </div>
      </div>
    `;
    return newRow;

}
$("#frmCountry").on("keydown", function (event) {
    if (event.keyCode == 13) {
        if (IsFormValidated()) {
            $("#frmCountry").submit();
        } else {
            return false;
        }
    }
});

$("#btnFormSubmit").on("click", function () {
    if (IsFormValidated()) {
        SavaData();
        /*     $("#frmCountry").submit();*/
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
    //if ($('.spError').length) {//check if error span already appear
    //    $('.spError').remove();
    //}

    //var pleaseEnter = $("#txtPleaseEnter").val();
    //var inputs = $(".require");
    //for (var i = 0; i < inputs.length; i++) {
    //    if ($.trim($(inputs[i]).val()) === "") {
    //        $(inputs[i]).css("border-color", "red");
    //        if ($(inputs[i]).attr('type') == "text") {
    //            var inputTitle = $(inputs[i]).next().text();
    //            $(inputs[i]).closest("div").after("<span class='spError' style='color:red;display:block'>" + pleaseEnter + " " + inputTitle + "</span>");
    //        }
    //    }
    //}

    //if ($("#txtCountryNameAr").val().trim() == "") {
    //    $('#txtCountryNameAr').focus();
    //    return false;
    //}
    //else if (!checkCityName()) {
    //    alert("من فضلك ادخل اسم المدينه (عربي)");
    //    return false;
    //}

    //else {
    //    return true;
    //}

}

$("#btnAddRowCity").on("click", function (e) {
    e.preventDefault();
    var rowIdsArray = [];
    var rowIds = $("[id^='RowCiry_']").each(function () {
        rowIdsArray.push(parseInt($(this).attr("id").split("_")[1]));
    });
    var LastId = Math.max(...rowIdsArray);
    rowNumber = parseInt(LastId) + 1;
    rowNumber_ = parseInt(LastId) + 1;
    $("#letterAddOneCity").text("");
    AppendRowInCity(rowNumber);
    focusOnInput();
});

function AppendRowInCity(number) {
    $("#divCity").append(newRow());
    $("#RowCiry_").attr("id", "RowCiry_" + number);
    $("#txtCityNameAr_").attr("id", "txtCityNameAr_" + number);
    $("#txtCityNameEn_").attr("id", "txtCityNameEn_" + number);
    $("#btnDeleteRow_").attr("id", "btnDeleteRow_" + number);
}

function RemoveDivCiry(id) {
    if (rowNumber_ > 1) {
        var number = id.split("_")[1];
        $("#RowCiry_" + number).remove();
        $("#letterAddOneCity").text("");
    }
    else {
        $("#letterAddOneCity").text($("#alertPleaseAddOneCity").val());
        return false;
    }
    rowNumber_--;
}
$('.wizard-required').on("keydown", function () {
    $(this).removeAttr("style");
    let id = $(this).attr('data-id');
    $("#" + id).text("");
});
function checkCityName() {
    var count = 0;
    $('[id^="txtCityNameAr_"]').each(function () {
        if ($(this).val() == "") {
            count++;
            $(this).focus();
        }
    });
    if (count == 0) { return true; } else { return false; }
}

function SavaData() {

    var cityNameAr = [];
    var cityNameEn = [];
    $("[id^='txtCityNameAr_']").each(function () {
        var id = $(this).attr("id");
        var ronumber = id.split("_")[1];
        if ($(this).val().trim() != "") {
            cityNameAr.push($(this).val().trim());
            cityNameEn.push($("#txtCityNameEn_" + ronumber).val());
        }
    });
    var nameAr = cityNameAr.join("~");
    var nameEn = cityNameEn.join("~");
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
        dataType: "json",
        url: $("#urlAjaxCreate").val() + "?countryNameAr=" + $("#txtcountryNameAr").val() + "&countryNameEn=" + $("#txtCountryNameEn").val() + "&cityNameAr=" + nameAr + "&cityNameEn=" + nameEn + "",
        async: false,
        success: function (result) {
            if (result != "0" && result != "00") {
                AppendRowInTable(result)
            }
        }
    });
}

function AppendRowInTable(id) {
    var row = `
       <tr id="rowId_`+ id + `">
                                <td>`+ $("#txtcountryNameAr").val() + `</td>
                                <td>`+ $("#txtCountryNameEn").val() + `</td>
                                <td class="custom-btns">
                                    <div class="btn-options">
                                        <a href="#"><i class="far fa-ellipsis-h-alt"></i></a>
                                        <div class="btns-action">
                                            <ul>
                                                <li>
                                                    <a class="btn-edit" id="btnEditRow_`+ id + `">
                                                        <i class="fal fa-pen"></i>
                                                        <span>`+ $("#btnButtonEdit").val() + `</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="btn-delete" id="btnDelete_" data-id="">
                                                        <i class="fal fa-trash-alt"></i>
                                                        <span>`+ $("#btnButtonDelete").val() + `</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                            </tr>
    `;
    $("#tblList tbody").append(row);
}