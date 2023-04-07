'use strict';
const mainContent = document.querySelector('.main'),
   scrollLinks = document.querySelectorAll('[data-scrollto]'),
   header = document.querySelector('.header'),
   openMenuBtn = document.querySelectorAll('[data-menu-open]'),
   menu = document.querySelector('.menu-backdrop'),
   burger = document.querySelector('.burger');

let headerHeight = 0;

window.addEventListener('load', onloadFunctions);
window.addEventListener('resize', resizeFunctions);

// ON LOAD PAGE FUNCTIONS
function onloadFunctions() {
   mainPaddingTop();
   preloaderHide();
}

// ON RESIZE PAGE FUNCTIONS
function resizeFunctions() {
   mainPaddingTop();
}

// MAIN PADDING-TOP OPTIONS
function mainPaddingTop() {
   headerHeight = header.getBoundingClientRect().height;
   mainContent.style.paddingTop = headerHeight + 'px';
}

// SCROLL TO BLOCK
scrollLinks.forEach(link => {
   link.addEventListener('click', function (event) {
      event.preventDefault();
      let distance = document.querySelector('.' + this.dataset.scrollto).offsetTop - header.getBoundingClientRect().height;
      window.scrollTo({ top: distance, left: 0, behavior: 'smooth' });
      if (menu.classList.contains('is-open')) {
         menuToggle();
      }
   });
});

// MOBIL MENU OPEN / CLOSE
openMenuBtn.forEach(openBtn => {
   openBtn.addEventListener('click', menuToggle);
});

function menuToggle() {
   menu.classList.toggle('is-open');
   burger.classList.toggle('is-open');
}
