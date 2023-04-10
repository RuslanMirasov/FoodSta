'use strict';
const responsiveSliders = document.querySelectorAll('.responsiveSlider');
let autoplay_run = false;

responsiveSliders_init();

/* All sliders init*/
function responsiveSliders_init() {
   if (responsiveSliders.length > 0) {
      responsiveSliders.forEach(slider => {
         if (slider.dataset.autoplay > 0) {
            autoplay_run = true;
         }
         var sliderClass = slider.children[0].className.split(' ');
         var newSlider = new Swiper('.' + sliderClass[1], {
            slidesPerView: slider.dataset.colmob,
            spaceBetween: Number(slider.dataset.marginmobil),
            speed: 800,
            loop: slider.dataset.loop,
            autoHeight: true,
            allowTouchMove: slider.dataset.move,
            effect: slider.dataset.effect,
            autoplay: {
               enabled: autoplay_run,
               delay: slider.dataset.autoplay,
               disableOnInteraction: false,
            },
            navigation: {
               nextEl: '.' + sliderClass[1] + '_next',
               prevEl: '.' + sliderClass[1] + '_prev',
            },
            pagination: {
               el: '.' + sliderClass[1] + '_pagination',
               clickable: true,
            },
            breakpoints: {
               //desctop settings
               1280: {
                  slidesPerView: slider.dataset.col,
                  spaceBetween: Number(slider.dataset.margin),
               },
               //tablet settings
               768: {
                  slidesPerView: slider.dataset.coltab,
                  spaceBetween: Number(slider.dataset.margin),
               },
            },
         });
      });
   }
}
