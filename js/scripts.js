'use strict';
const mainContent = document.querySelector('.main'),
   scrollLinks = document.querySelectorAll('[data-scrollto]'),
   header = document.querySelector('.header'),
   openMenuBtn = document.querySelectorAll('[data-menu-open]'),
   menu = document.querySelector('.menu-backdrop'),
   burger = document.querySelector('.burger'),
   preloaderWrapper = document.querySelector('.preloader'),
   preloaderProcent = document.querySelector('[data-preloader]'),
   preloaderSvg = document.querySelector('.preloader__svg');
let headerHeight = 0;
let preloaderCount = 0;
let loadProcess = setInterval(preloader, 5);

window.addEventListener('load', onloadFunctions);
window.addEventListener('resize', resizeFunctions);

// ON LOAD PAGE FUNCTIONS
function onloadFunctions() {
   mainPaddingTop();
}

// ON RESIZE PAGE FUNCTIONS
function resizeFunctions() {
   mainPaddingTop();
}

// PRELOADER
function preloader() {
   preloaderCount = preloaderCount + 3.125;
   if (preloaderCount < 100) {
      preloaderProcent.innerHTML = preloaderCount.toFixed(1) + '%';
      preloaderSvg.style.width = preloaderCount.toFixed(1) + '%';
   } else {
      clearInterval(loadProcess);
      preloaderProcent.innerHTML = '100%';
      setTimeout(function () {
         preloaderWrapper.classList.add('is--hidden');
      }, 200);
   }
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
