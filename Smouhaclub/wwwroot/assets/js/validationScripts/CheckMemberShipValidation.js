$("#btnCheckCode").on('click',function(){
    if($("#txtMemberShipNo").val() == ""){
        Swal.fire({
            title: 'عفواً! من فضلك ادخل رقم العضوية',
            icon: "warning",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'موافق',
            cancelButtonText: 'إلغاء',
            closeOnClickOutside: false,
            className: "warning-msg",
            customClass: {
                confirmButton: 'theme-btn',
                cancelButton: 'theme-btn-two'
            },
        });
    }else{
        alert($("#txtMemberShipNo").val());
        $("#frmCheckCode").submit();
    }
})