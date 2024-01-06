
$(document.body).on('change', '[id^="fuPhotoId"]', function (e) {
    var filename = e.target.files[0].name;
    var fileExtensions = getFileExtension(filename);
    var allowedExt = "png,jpg,jpeg";
    console.log(fileExtensions);
    var allowedExtarry = allowedExt.split(",");
    if (!allowedExtarry.includes(fileExtensions)) {
        $("#newsPhotoValidation").text("من فضلك قم برفع صوره ");
        $('#img_url')[0].src = '';
        $("#fuPhotoId").val("");
        return false;
    }
    $('#img_url')[0].src = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
    $("#newsPhotoValidation").text("");
});
$(".wizard-required").on("keypress", function () {
    $(this).css("border-color", "");
    var ErrormegId = $(this).attr('data-id');
    $("#" + ErrormegId).text('');
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

    if ($("#PhotoId").val() == "") {
        $("#newsPhotoValidation").text("من فضلك قم برفع صورة الخبر ");
        isValid = false;
    }

    $("[id^='fuImageGallery_']").each(function () {
        var id = $(this).attr("id");
        var rowNumber = id.split("_")[1];
        if ($(this).val() == "") {
            $("#imageNewsDetails_" + rowNumber).text("من فضلك قم برفع صورة الخبر");
        }



    });


    return isValid;
}


$("#btnFormSubmit").on("click", function () {
    if (IsFormValidated()) {
        $("#formNews").submit();
        return true;
    }
    return false;
});




////////////////////////////////////////////////////////////////

var rowIdsArray = [];
var rowIds = $("#tblBody tr").each(function () {
    rowIdsArray.push(parseInt($(this).attr("id").split("_")[1]));
});
var LastId = Math.max(...rowIdsArray);
var count_hiddenGallery = parseInt(LastId);
var rowNumberGallery = parseInt(LastId);
var rowNumberGallery_ = parseInt(LastId);
var wrapperGallery = $(".fields_Gallery");
$(wrapperGallery).on("click", ".remove_fieldGallery", function (e) {
    e.preventDefault();
    $(this).closest('tr').remove();
    rowNumberGallery_--;
});
$(".add_field_buttonGallery").on("click", function (e) {//on add input button click
    e.preventDefault();
    $("#tblNews tbody").append(`
    <tr id="trRow_">
             <td>
             <label style=" cursor: pointer" title="صورة الخبر" class="img-upload">
             <span id="cv_" style="cursor:pointer" class="uplaod-btn theme-btn">  <i class="fa fa-upload" aria-hidden="true"></i> </span>
             <input  type="file" id="fuImageGallery_" name="fuFileImage" style="display:none" />
             <input  type="hidden" id="fileImageGallery_" name="fileImage"  />
             <span id="fileImageGalleryE_"></span>
               <a id="imgModalGallery_" data-toggle="modal" data-bs-target="#viewImg" href="">
                    <img id="img_gelrtyy_" src="" width="60" />
                </a>
             </label>
              <span id="imageNewsDetails_"></span>
             </td>
             <td>
             <div class="btns-group">
                             <a class="remove_fieldGallery btn theme-btn btn-delete" title="حذف"><i class="icon-bin"></i></a>

             </div>
             </td>       </tr>`
    );
    count_hiddenGallery++;
    rowNumberGallery++;
    rowNumberGallery_++;

    $('#fuImageGallery_').attr('id', 'fuImageGallery_' + rowNumberGallery);
    $('#fileImageGalleryE_').attr('id', 'fileImageGalleryE_' + rowNumberGallery);
    $('#fileImageGallery_').attr('id', 'fileImageGallery_' + rowNumberGallery);
    $("#imageNewsDetails_").attr('id', 'imageNewsDetails_' + rowNumberGallery);
    $("#trRow_").attr('id', 'trRow_' + rowNumberGallery);
    /*$('#rdIsShowableGalleryNo_').attr('id', 'rdIsShowableGalleryNo_' + rowNumberGallery);*/
    $("#rdIsShowableGalleryYes_").attr('id', 'rdIsShowableGalleryYes_' + rowNumberGallery);
    $("#rdSubCatIsShowableGallery_").attr('id', 'rdSubCatIsShowableGallery_' + rowNumberGallery);
    $("#img_gelrtyy_").attr('id', 'img_gelrtyy_' + rowNumberGallery);
    $("#imgModalGallery_").attr('id', 'imgModalGallery_' + rowNumberGallery);
});

$(document.body).on('change', '[id^="fuImageGallery_"]', function (e) {
    var id = $(this).attr('id');
    var ret1 = id.split("_");
    var filename = e.target.files[0].name;
    var splitFileName = getFileExtension(filename);
    var allowedExt = "png,PNG,jpg,JPG,gif,GIF,jpeg,JPEG,pjp,PJP";
    var allowedExtarry = allowedExt.split(",");
    if (!allowedExtarry.includes(splitFileName)) {
        swal("", "من فضلك قم برفع صوره ", "warning", {
            buttons: "موافق",
            closeOnClickOutside: false,
            className: "warning-msg",
        }).then((rsult) => {
            $("#fileImageGalleryE_" + ret1[1]).text('');
            $("#fileImageGallery_" + ret1[1]).val('');
            $('#img_gelrtyy_' + ret1[1])[0].src = ('');
            $('#imgModalGallery_' + ret1[1])[0].href = ('');
        });
        return false;
    } else {
        $('#img_gelrtyy_' + ret1[1])[0].src = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
        $('#imgModalGallery_' + ret1[1])[0].href = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
        $("#fileImageGallery_" + ret1[1]).val(filename);
    }
});





