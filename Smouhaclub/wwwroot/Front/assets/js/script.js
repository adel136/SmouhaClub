$(document).ready(function() {
        if ($('.slider-carousel').length) {
                $('.slider-carousel').owlCarousel({
                        items: 1,
                        loop:true,
                        margin:30,
                        nav:true,
                        dots: false,
                        smartSpeed: 500,
                        mouseDrag: false,
                        rtl: true, // Add this line for RTL support
                        autoplay: 1000,
                        onTranslated: function(event) {
                                // Get the current item and add the "active" class to it
                                var currentItem = event.item.index;
                                $(".slider-carousel").find(".owl-item").eq(currentItem).addClass("active");
                                var index = event.item.index;
                                var count = event.item.count;
                                if (index == 0) {
                                  $('.owl-prev').addClass('disabled');
                                } else {
                                  $('.owl-prev').removeClass('disabled');
                                }
                                if (index == count - 1) {
                                  $('.owl-next').addClass('disabled');
                                } else {
                                  $('.owl-next').removeClass('disabled');
                                }
                              },
                        navText: [ '<span class="far fa-arrow-left"></span>', '<span class="far fa-arrow-right"></span>' ],
                        otsContainer: '.custom-dots-container',
                        responsive:{
                                0:{
                                        items:1
                                },
                                480:{
                                        items:1
                                },
                                600:{
                                        items:1
                                },
                                800:{
                                        items:1
                                },
                                1024:{
                                        items:1
                                }
                        }
                }); 
                // Create a custom container for numbered dots
                const customDotsContainer = $('<div class="custom-dots-container"></div>');
                $('.owl-carousel .owl-nav').append(customDotsContainer);
                
                // Generate and append numbered dots
                const totalItems = $('.owl-carousel .owl-item').length;
                for (let i = 1; i <= totalItems; i++) {
                const dot = $('<div class="owl-dot">' + i + '</div>');
                dot.click(function () {
                        $(this).addClass("active").siblings().removeClass("active");
                        $('.owl-carousel').trigger('to.owl.carousel', [i - 1, 300]);
                });
                customDotsContainer.append(dot);
                }

                // Click event for the next and previous navigation buttons
                $(".owl-next").on("click", function() {
                $(".slider-carousel").trigger("next.owl.carousel");
                if ($(this).hasClass('disabled')) {
                  return false;
                }
              });
            
              $(".owl-prev").on("click", function() {
                $(".slider-carousel").trigger("prev.owl.carousel");
              });
        }

        if ($('.articles-caresoul').length) {
                $('.articles-caresoul').owlCarousel({
                        loop:true,
                        margin:30,
                        nav:true,
                        dots: false,
                        smartSpeed: 500,
                        mouseDrag: false,
                        rtl: true, // Add this line for RTL support
                        autoplay: 1000,
                        navText: [ '<span class="far fa-arrow-left"></span>', '<span class="far fa-arrow-right"></span>' ],
                        responsive:{
                                0:{
                                        items:1
                                },
                                480:{
                                        items:1
                                },
                                600:{
                                        items:1
                                },
                                800:{
                                        items:2
                                },
                                1024:{
                                        items:3
                                }
                        }
                }); 
             
        }
})

//Fancybox.bind('[data-fancybox="gallery"]', {
//        hideScrollbar: false,
//        animationEffect: "slide"
//      });


//       <div class="work">
//       <a  data-fancybox="gallery" data-caption="بنك الائتمان الكويتي" href="assets/images/portfolio/pro-kw-1.jpg">
//           <img src="assets/images/portfolio/pro-kw-1.jpg" alt="portfolio">
//           <div class="content">
//               <h3>بنك الائتمان الكويتي</h3>
//                   <p> مشروع تصوير وتكشيف وفهرسة ملفات القروض العقارية (12 مليون صفحة) .</p>
//           </div>
//       </a>
//   </div>