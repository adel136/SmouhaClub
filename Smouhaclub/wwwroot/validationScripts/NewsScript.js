
$(document.body).on('click', '[id^="image_"]', function (e) {
    $("#PhotoId").trigger('click');
});

$(document.body).on('change', '[id^="PhotoId"]', function (e) {
    var filename = e.target.files[0].name;
    var splitFileName = getFileExtension(filename);
    var allowedExt = "PNG,png,JPG,jpg,JPEG,jpeg";
    var allowedExtarry = allowedExt.split(",");
    if (!allowedExtarry.includes(splitFileName)) {
        $("#errorNewsTitle").text("عفوا !  مسموح فقط بتحميل ملفات من نوع png,jpg,jpeg")
        $('#hdPhoto')[0].src = ('');
        $('#imgModal')[0].href = ('');
        return false;
    }
    $('#hdPhoto')[0].src = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
    $('#imgModal')[0].href = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
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
             <label style=" cursor: pointer" title="صوره ">
             <span id="cv_" style="cursor:pointer"> تحميل <i class="fa fa-upload" aria-hidden="true"></i> </span><input  type="file" id="fuImageGallery_" name="fuImageGallery" style="display:none" />
             <input  type="hidden" id="fileImageGallery_" name="fileImageGallery"  />
             <span id="fileImageGalleryE_"></span>
               <a id="imgModalGallery_" data-toggle="modal" data-bs-target="#viewImg" href="">
                    <img id="img_gelrtyy_" src="" width="60" />
                </a>
             </label>
             </td>
             <td style="text-align:center;">
             <input type="radio" id="rdIsShowableGalleryYes_" name="rdSubCatIsShowableGallery_`+ rowNumberGallery + `" value="1" checked="checked">
             <label for="rdIsShowableGalleryYes_">نعم</label>
             <input type="radio" id="rdIsShowableGalleryNo_" name="rdSubCatIsShowableGallery_`+ rowNumberGallery + `" value="0">
             <label for="rdIsShowableGalleryNo_">لا</label>
             <input  type="hidden" id="rdSubIsShowableGallery_`+ rowNumberGallery + `" name="rdSubIsShowableGallery"  />
             </td>
             <td>
             <button class="remove_fieldGallery btn btn-sm btn-danger" title="حذف الحقل"><i class="btn-sm fa fa-trash"></i></button>
             </td>                                                                                                         </tr>`
    );

    $('#fuImageGallery_').attr('id', 'fuImageGallery_' + rowNumberGallery);
    $('#fileImageGalleryE_').attr('id', 'fileImageGalleryE_' + rowNumberGallery);
    $('#fileImageGallery_').attr('id', 'fileImageGallery_' + rowNumberGallery);
    $('#rdIsShowableGalleryNo_').attr('id', 'rdIsShowableGalleryNo_' + rowNumberGallery);
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
        alert('من فضلك قم برفع صوره');
        $("#fileImageGalleryE_" + ret1[1]).text('');
        $("#fileImageGallery_" + ret1[1]).val('');
        $('#img_gelrtyy_' + ret1[1])[0].src = ('');
        $('#imgModalGallery_' + ret1[1])[0].href = ('');
        return false;
    } else {
        $('#img_gelrtyy_' + ret1[1])[0].src = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
        $('#imgModalGallery_' + ret1[1])[0].href = (window.URL ? URL : webkitURL).createObjectURL(e.target.files[0]);
        $("#fileImageGallery_" + ret1[1]).val(filename);
    }
});



$("#btnFormSubmit").on("click", function () {
    if (IsFormValidated()) {
        var contentArabic = CKEDITOR.instances["txtContentAr"].getData();
        var contentEnglish = CKEDITOR.instances["txtContentEn"].getData();
        $("#NewsContentAr").val(contentArabic);
        $("#NewsContentEn").val(contentEnglish);
        var arrayGallery = [];
        var isshowGallery = 0;
        $('[name^="rdSubCatIsShowableGallery_"]').each(function () {

            if ($(this).is(':checked')) {
                var id = $(this).attr('name');
                var ret1 = id.split("_");
                arrayGallery.push(ret1[1]);
                $('#rdSubIsShowableGallery_' + ret1[1]).val($(this).val());
                if ($(this).val() == 'true') {
                    isshowGallery++;
                }
            }
        });
        $("#formNews").submit();
        return true;
    } else {
        return false;
    }
});
function IsFormValidated() {
    var contentArabic = CKEDITOR.instances["txtContentAr"].getData();
    var contentEnglish = CKEDITOR.instances["txtContentEn"].getData();
    if ($("#NewsTitleAr").val().trim() == "") {
        alert("من فضلك ادخل عنوان الخبر( عربى)")
        $("#NewsTitleAr").focus();
        return false;
    }
    else if ($("#txtDate").val().trim() == "") {
        alert("من فضلك ادخل تاريخ الخبر");
        $("#txtDate").focus();
        return false;
    }
    else if (contentArabic.trim() == "") {
        alert("من فضلك ادخل محتوي  الخبر (عربي)");
        return false;
    }
    else if (!chImageGallery()) {
        alert("عفوا, الرجاء التأكد من رفع جميع الصور")
        return false;
    }
    else {
        return true;
    }
}
function chImageGallery() {
    var count = 0;
    $('[id^="fuImageGallery_"]').each(function () {
        if ($(this).val() == "") {
            count++;
        }
    });
    if (count == 0) { return true; } else { return false; }
}
