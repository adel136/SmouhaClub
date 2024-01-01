function getFileExtension(fileName) {
    // Find the last occurrence of the dot (.)
    var lastDotIndex = fileName.lastIndexOf(".");
    // If there is no dot or it's the last character in the file name, return an empty string
    if (lastDotIndex === -1 || lastDotIndex === fileName.length - 1) {
        return "";
    }
    // Extract the file extension using the substring method
    var extension = fileName.substring(lastDotIndex + 1);
    return extension;
}

document.addEventListener("DOMContentLoaded", function(event) { 
    $(".datepicker").flatpickr({
        allowInput: true,
        minDate: "1900-01",
        maxDate: "30.12.2050"
    });
  });





function emailvalidate(id) {
    var val = $("#" + id + "").val();
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(val)) {

        Swal.fire({
            icon: "warning",
            title: "من فضلك أدخل بريد إلكتروني صحيح",
            allowOutsideClick: false,
            showCloseButton: true,
            confirmButtonText: "موافق",
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



function AcceptOnlyNumbers(input) {
    input.value = input.value.replace(/[^0-9\+()]/g, '');
    if (input.value.indexOf('+') !== input.value.lastIndexOf('+')) {
        input.value = x.value.substring(0, input.value.lastIndexOf('+'));
    }
}