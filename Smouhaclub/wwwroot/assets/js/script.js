
$(document).ready(function () {
    $(".form-select").select2();


    if ($(".dataTables_wrapper").length) {
        var rowsCount = 15;
        $(".dataTables_wrapper").DataTable({
            "order": [],
            "bAutoWidth": false,
            "iDisplayLength": rowsCount,
            sSearch: "",
            "aoColumnDefs": [
                { "sWidth": "5%", "aTargets": [-1, '.no-sort'], "orderable": false }
            ],
            searchPlaceholder: "",
            initComplete: function () {
                var publishName = $("#hdnPublsihName").val();
                $("#tblList_filter").detach().appendTo('#new-search-area');
                $("#tblList_filter label").addClass("form-focus").append(`<span>بحث</span><img src="` + publishName + `/assets/images/search.png"/>`);
            },
            "bInfo": false,
            "bLengthChange": false,
            buttons: [

            ],
            "oLanguage": {
                "sSearch": "",
                "oPaginate": {
                    "sFirst": "",
                    "sPrevious": "السابق",
                    "sNext": "التالي",
                    "sLast": ""
                },
            }

        });
        if ($('#tblList tr').length <= parseInt(rowsCount)) {
            $(".dataTables_paginate").hide();
            $(".dataTables_info").hide();
        }
    }


    $(".select-lang").on("click", function () {
        $(this).parent().toggleClass("open").find(".options").slideToggle(200);
    });

    $(".main-breadcrumb .user-account > *:not(.custom-user-options)").on("click", function () {
        $(this).parent().toggleClass("open");
    })

    $(".sidebar .main-list > .parent-menu a, .sidebar .main-list > li .dropdown").on('click', function () {
        $(this).parent().toggleClass('open').siblings().removeClass("open");
        $(this).parent().find(".sub-menu").slideToggle(300);
        $(".parent-menu:not(.open) .sub-menu").slideUp(300);
    });


    $(".sidebar .main-list > li").on('click', function() {
        $("body").removeClass("hide-sidebar");
    })

    $(".filter-menu .widget-content .category > a, .filter-menu .widget-content .category > .dropdown-btn").on('click', function () {
        $(this).parent().toggleClass('open').siblings().removeClass("open");
        $(this).parent().find("ul").slideToggle(300);
        $(".filter-menu .widget-content .category:not(.open) > ul").slideUp(300);
    });


    if ($(".empty-data").length) {
        $(".top-wrapper .items").addClass("custom-btn");
    } else {
        $(".top-wrapper .items").removeClass("custom-btn");
    }
    if ($(".dataTables_wrapper").length) {
        $(".dataTables_filter").show();
    } else {
        $(".dataTables_filter").hide();
    }
    

 // Check if the src attribute is empty
 if ($('.userImg .upload-img img').attr('src') === '') {
    // Add a class if the src attribute is empty
    $('.userImg .upload-img img').addClass('custom-img');
  } else {
    $('.userImg .upload-img img').removeClass('custom-img');

  }
    // Select all input elements not of type "hidden"
    var nonHiddenInputs = $('input:not([type="hidden"])');

    nonHiddenInputs.each(function () {
        if ($(this).val() != "") {
            $(this).parent().addClass("focus-input");
        } else {

            $(this).parent().removeClass("focus-input");
        }

        $(".form-focus > label").on('click', function () {
            if ($(this).prev().val() != "") {
                $(this).parent().addClass("focus-input");
            } else {

                $(this).parent().removeClass("focus-input");
            }
        })
    });

    //    $(".sidebar .main-list > li:not(.parent-menu)").on('click', function() {
    //     $(this).toggleClass("active").siblings().removeClass("active");
    //    })
    //    $(".sidebar .main-list > li .sub-menu li").on('click', function() {
    //     $(".sidebar .main-list > li").removeClass("active");
    //     $(this).toggleClass("active").siblings().removeClass("active");
    //    })
    //     $(".toggler-menu .new-data .custom .btnClose").on('click', function() {
    //         $("body").removeClass("show-menu");
    //     })

    $(".close-sidebar").on('click', function() {
        $("body").toggleClass("hide-sidebar");
    })


   $(".top-wrapper .items .filter button").on('click', function() {
       $("body").removeClass("show-menu");
   })

   $(".top-wrapper .items .filter button").on('click', function() {
     $("body").addClass("show-filter-menu");
   })
   $(".filter-menu .btnClose").on('click', function() {
    $("body").removeClass("show-filter-menu");
  })




    
    $(".user-notification > .bells").on('click', function () {
        $(".main-settings").toggleClass("show-notification");
    })

    $(".open-toggle").on('click', function () {
        $("body").addClass("show-menu");
    })
    $(".toggler-menu .new-data .custom .btnClose,.toggler-menu .new-data .btns-group button:last-child").on('click', function () {
        $("body").removeClass("show-menu");
    })

    // Check local storage for the active item
    const activeItemIndex = localStorage.getItem("activeItemIndex");

    // Set initial state based on local storage
    if (activeItemIndex !== null) {
        $(".sidebar .main-list li:not(.parent-menu)").eq(activeItemIndex).addClass("active").find("ul").slideDown();
    }
     

    // Add click event listener to the menu items
    $(".sidebar .main-list li:not(.parent-menu)").on("click", function () {
        // Remove active class and slide up all sub-menus
        $(".sidebar .main-list li:not(.parent-menu)").removeClass("active").find("ul").slideUp();

        // Toggle active class and slide down the clicked sub-menu
        $(this).addClass("active").find("ul").slideDown();
        if ($(".sidebar .main-list > li .sub-menu > li").hasClass("active")) {
            $(this).parent().show();
        }
        // Update the local storage with the current active item index
        const activeIndex = $(".sidebar .main-list li:not(.parent-menu)").index(this);
        localStorage.setItem("activeItemIndex", activeIndex.toString());
    });

    // Check local storage for a flag or class
    const hasActiveClass = localStorage.getItem("hasActiveClass") === "true";

    // Check the condition based on the local storage flag or class
    if (hasActiveClass) {
        // Slide down the parent element
        $(".sidebar .main-list > li .sub-menu li.active").parent().show();
        $(".sidebar .main-list > li .sub-menu li.active").parentsUntil("li").parent().addClass("open");
        $(".sidebar .main-list > li .ul-sub li.active").parent().show();
        $(".sidebar .main-list > li .ul-sub li.active").parentsUntil("li").parent().addClass("open");
    } else {

    }

    // Update the local storage based on the element's class
    const newHasActiveClassValue = $(".sidebar .main-list > li .sub-menu li").hasClass("active");
    localStorage.setItem("hasActiveClass", newHasActiveClassValue.toString());


//$(".sidebar .main-list li:not(.parent-menu)").addClass("tesssssssssssssssauigdaoshdhakhsa")

//     const activeSubIndex = localStorage.getItem("activeSubIndex");


//  // Set initial state based on local storage
//  if (activeSubIndex !== null) {
//     $(".sidebar .main-list .ul-sub li").eq(activeSubIndex).addClass("active").find("ul").slideDown();
// }
 

// // Add click event listener to the menu items
// $(".sidebar .main-list .ul-sub li").on("click", function () {
//     // Remove active class and slide up all sub-menus
//     $(".sidebar .main-list .ul-sub li").removeClass("active").find("ul").slideUp();

//     // Toggle active class and slide down the clicked sub-menu
//     $(this).addClass("active").find(".ul-sub").slideDown();
//     if ($(".sidebar .main-list .ul-sub li").hasClass("active")) {
//         $(this).parent().show();
//     }
//     // Update the local storage with the current active item index
//     const activeIndex = $(".sidebar .main-list ul-sub li").index(this);
//     localStorage.setItem("activeItemIndex", activeIndex.toString());
// });

// // Check local storage for a flag or class
// const hasActive = localStorage.getItem("activeIndex") === "true";

// // Check the condition based on the local storage flag or class
// if (hasActive) {
//     // Slide down the parent element
//     $(".sidebar .main-list > li .ul-sub li.active").parent().show();
//     $(".sidebar .main-list > li .ul-sub li.active").parentsUntil("li").parent().addClass("open");
// } else {

// }

// // Update the local storage based on the element's class
// const newActiveClassValue = $(".sidebar .main-list > li .ul-sub li").hasClass("active");
// localStorage.setItem("hasActiveClass", newActiveClassValue.toString());



$(".sub-menu .parent-menu > a").on('click', function() {
    $(this).parent().toggleClass("open").find("ul").slideToggle();
})


















    function focusOnInput() {
        // focus on input field check empty or not
        nonHiddenInputs.on('focus', function () {
            var tmpThis = jQuery(this).val();
            if (tmpThis == '') {
                jQuery(this).parent().addClass("focus-input");
            }
            else if (tmpThis != '') {
                jQuery(this).parent().addClass("focus-input");
            }
        }).on('blur', function () {
            var tmpThis = jQuery(this).val();
            if (tmpThis == '') {
                jQuery(this).parent().removeClass("focus-input");
            }
            else if (tmpThis != '') {
                jQuery(this).parent().addClass("focus-input");
            }
        });

    }



    if ($("#tblList_filter").length) {
        focusOnInput();
    }


    publicOpenSubMneu();


    $(document).mouseup(function (e) {
        var btnsActions = $("tbody tr .btn-options .btns-action");
        if (btnsActions.has(e.target).length === 0) {
            $("tbody tr").removeClass("open-menu");
        }
    })

    // click on next button
    jQuery('.wizard-fieldset:not(:last-child) .form-wizard-next-btn').click(function () {
        var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
        var next = jQuery(this);
        var nextWizardStep = true;

        if (nextWizardStep) {
            next.parents('.wizard-fieldset').removeClass("show", "400");
            currentActiveStep.removeClass('active').addClass('activated').next().addClass('active', "400");
            next.parents('.wizard-fieldset').next('.wizard-fieldset').addClass("show", "400");
        }
    });

    //click on previous button
    jQuery('.form-wizard-previous-btn').click(function () {
        var counter = parseInt(jQuery(".wizard-counter").text());;
        var prev = jQuery(this);
        var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
        prev.parents('.wizard-fieldset').removeClass("show", "400");
        prev.parents('.wizard-fieldset').prev('.wizard-fieldset').addClass("show", "400");
        currentActiveStep.removeClass('active').prev().removeClass('activated').addClass('active', "400");
        jQuery(document).find('.wizard-fieldset').each(function () {
            if (jQuery(this).hasClass('show')) {
                var formAtrr = jQuery(this).attr('data-tab-content');
                jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function () {
                    if (jQuery(this).attr('data-attr') == formAtrr) {
                        jQuery(this).addClass('active');
                        var innerWidth = jQuery(this).innerWidth();
                        var position = jQuery(this).position();
                        jQuery(document).find('.form-wizard-step-move').css({ "left": position.left, "width": innerWidth });
                    } else {
                        jQuery(this).removeClass('active');
                    }
                });
            }
        });
    });
    //click on form submit button
    jQuery(document).on("click", ".form-wizard .form-wizard-submit", function () {
        var parentFieldset = jQuery(this).parents('.wizard-fieldset');
        var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');


    });

    focusOnInput();


    $(document).mouseup(function (e) {
        var userOptions = $(".custom-user-options");
        if (!userOptions.is(e.target) && userOptions.has(e.target).length === 0) {
            $(".user-account").removeClass("open");
        }

        var togglerMenu = $(".toggler-menu .new-data");
        if (!togglerMenu.is(e.target) && togglerMenu.has(e.target).length === 0) {
            $("body").removeClass("show-menu");
        }

        var notificationMenu = $(".main-settings .notification");
        if (!notificationMenu.is(e.target) && notificationMenu.has(e.target).length === 0) {
            $(".main-breadcrumb .main-settings").removeClass("show-notification");
        }
        
        var filterMenu = $(".filter-menu .new-data");
        if (!filterMenu.is(e.target) && filterMenu.has(e.target).length === 0) {
            $("body").removeClass("show-filter-menu");
        }
    })

});
function publicOpenSubMneu() {
    $(".custom-btns .btn-options a").on('click', function () {
        $(this).parentsUntil("tr").parent().addClass("open-menu").siblings().removeClass("open-menu");
    });
} 