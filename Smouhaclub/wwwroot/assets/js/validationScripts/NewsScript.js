
$(document.body).on('change', '[id^="PhotoId"]', function (e) {
    var filename = e.target.files[0].name;
    var fileExtensions = getFileExtension(filename);
    var allowedExt = ".png,.jpg,.jpeg";
    var allowedExtarry = allowedExt.split(",");
    if (!allowedExtarry.includes(fileExtensions)) {
        $("#errorNewsPhoto").text("من فضلك قم برفع صوره ");
        $('#hdPhoto')[0].src = '';
        $("#PhotoId").val("");
        return false;
    }
    $('#hdPhoto')[0].src = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
    $("#errorNewsPhoto").text("");
    $("#hdPhoto").removeClass("custom-img");
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
        console.log($(element));
        if ($.trim($(element).val()) === "") {
            var ErrormegId = $(element).attr('data-id');
            var letter = $(element).attr("data-letter");
            $(element).css("border", "solid 1px red");
            $("#" + ErrormegId).text(letter);
            isValid = false;
        }
    });

    //if ($("#PhotoId").val() == "") {
    //    $("#errorNewsPhoto").text("من فضلك قم برفع صورة الخبر ");
    //    isValid = false;
    //}
    return isValid;
}


$("#btnSubmitForm").on("click", function () {
    if (IsFormValidated()) {
        $("#formNews").submit();
        return true;
    }
    return false;
});




////////////////////////////////////////////////////////////////
var count_hiddenGallery = 1;
var rowNumberGallery = 1;
var rowNumberGallery_ = 1;
var wrapperGallery = $(".fields_Gallery");
$(wrapperGallery).on("click", ".remove_fieldGallery", function (e) {
    e.preventDefault();
    $(this).closest('tr').remove();
    rowNumberGallery_--;
});
$(".add_field_buttonGallery").on("click", function (e) {//on add input button click
    e.preventDefault();
    $(wrapperGallery).append(`<tr>
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
             </td>
              <td> <input name="ImageDescriptionAr" id="txtGalleryDescriptionAr_" rows="3" cols="50" pattern=".*\S+.*" class="form-control" /></td>
              <td><input name="ImageDescriptionEn" id="txtGalleryDescriptionEn_" rows="3" cols="50" pattern=".*\S+.*" class="form-control custom-dir" /></td>
             <td style="text-align:center;">

             <input type="hidden" name="rdIsShowableImageGallery" id="rdSubIsShowableGallery_`+ rowNumberGallery + `"  />
                                
             <label class="switch">
                <input id="rdIsShowableGalleryYes_" name="rdIsShowableGallery_`+ rowNumberGallery + `" type="checkbox" checked="checked" class="checkbox">
                <div class="slider"></div>
            </label>


             
             
             </td>
             <td>
             <div class="btns-group">
                             <a class="remove_fieldGallery btn theme-btn btn-delete" title="حذف"><i class="icon-bin"></i></a>

             </div>
             </td>                                                                                                         </tr>`
    );

    $('#fuImageGallery_').attr('id', 'fuImageGallery_' + rowNumberGallery);
    $('#txtGalleryDescriptionAr_').attr('id', 'txtGalleryDescriptionAr_' + rowNumberGallery);
    $('#txtGalleryDescriptionEn_').attr('id', 'txtGalleryDescriptionEn_' + rowNumberGallery);
    $('#fileImageGalleryE_').attr('id', 'fileImageGalleryE_' + rowNumberGallery);
    $('#fileImageGallery_').attr('id', 'fileImageGallery_' + rowNumberGallery);

    /*$('#rdIsShowableGalleryNo_').attr('id', 'rdIsShowableGalleryNo_' + rowNumberGallery);*/

    $("#rdIsShowableGalleryYes_").attr('id', 'rdIsShowableGalleryYes_' + rowNumberGallery);
    $("#rdSubCatIsShowableGallery_").attr('id', 'rdSubCatIsShowableGallery_' + rowNumberGallery);
    $("#img_gelrtyy_").attr('id', 'img_gelrtyy_' + rowNumberGallery);
    $("#imgModalGallery_").attr('id', 'imgModalGallery_' + rowNumberGallery);

    count_hiddenGallery++;
    rowNumberGallery++;
    rowNumberGallery_++;
});

$(document.body).on('change', '[id^="fuImageGallery_"]', function (e) {
    var id = $(this).attr('id');
    var ret1 = id.split("_");
    var filename = e.target.files[0].name;
    var splitFileName = filename.split(".");
    var allowedExt = "png,PNG,jpg,JPG,gif,GIF,jpeg,JPEG,pjp,PJP";
    var allowedExtarry = allowedExt.split(",");
    if (!allowedExtarry.includes(splitFileName[1])) {
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





