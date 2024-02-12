$("#btnCheckCode").on('click',function(){
    if($("#txtMemberShipNo").val() == ""){
        Swal.fire({
            icon: "warning",
            title: 'من فضلك ادخل رقم العضوية',
            allowOutsideClick: false,
            showCloseButton: false,
            showConfirmButton: true,
            confirmButtonText: 'موافق',
            customClass: {
                confirmButton: 'theme-btn'
            },
        });
    }else{
        $("#frmCheckCode").submit();
    }
})

$(function () {
    if ($("#hdnMessageNoCode").val() == "1") {
        Swal.fire({
            icon: "warning",
            title: 'عفواً! كود العضوية غير موجود',
            allowOutsideClick: false,
            showCloseButton: false,
            showConfirmButton: true,
            confirmButtonText: 'موافق',
            customClass: {
                confirmButton: 'theme-btn'
            },
        });
    }
})



$("#btnRenew").on('click', function () {
    if ($("#txtCardNumber").val() == "") {
        Swal.fire({
            icon: "warning",
            title: 'عفواً! من فضلك أدخل رقم الكارت',
            allowOutsideClick: false,
            showCloseButton: false,
            showConfirmButton: true,
            confirmButtonText: 'موافق',
            customClass: {
                confirmButton: 'theme-btn'
            },
        });

    }
    else if ($("#txtVisaCode").val() == "") {

        Swal.fire({
            icon: "warning",
            title: 'عفواً! من فضلك أدخل رمز التحقق',
            allowOutsideClick: false,
            showCloseButton: false,
            showConfirmButton: true,
            confirmButtonText: 'موافق',
            customClass: {
                confirmButton: 'theme-btn'
            },
        });
        
    }
    else if ($("#txtExpireDate").val() == "") {
        Swal.fire({
            icon: "warning",
            title: 'عفواً! من فضلك أدخل تاريخ الإنتهاء',
            allowOutsideClick: false,
            showCloseButton: false,
            showConfirmButton: true,
            confirmButtonText: 'موافق',
            customClass: {
                confirmButton: 'theme-btn'
            },
        });
        
    } else {
        Swal.fire({
            icon: "success",
            title: 'تم تجديد الإشتراك بنجاح',
            allowOutsideClick: false,
            showCloseButton: false,
            showConfirmButton: true,
            confirmButtonText: 'موافق',
            customClass: {
                confirmButton: 'theme-btn'
            },
        }).then((result) => {
            $("#txtExpireDate,#txtVisaCode,#txtCardNumber").val('');
        });
    }
});