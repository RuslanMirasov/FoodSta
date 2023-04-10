'use strict';
const mainContent = document.querySelector('.main'),
   scrollLinks = document.querySelectorAll('[data-scrollto]'),
   header = document.querySelector('.header'),
   openMenuBtn = document.querySelectorAll('[data-menu-open]'),
   menu = document.querySelector('.menu-backdrop'),
   burger = document.querySelector('.burger'),
   preloaderWrapper = document.querySelector('.preloader'),
   preloaderProcent = document.querySelector('[data-preloader]'),
   preloaderSvg = document.querySelector('.preloader__svg'),
   mediaFiles = document.querySelectorAll('img, svg, video, audio');

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

//PRELOADER
let i = 0;

mediaFiles.forEach(file => {
   file.onload = () => {
      i++;
      preloaderProcent.innerHTML = ((i * 100) / mediaFiles.length).toFixed() + '%';
      preloaderSvg.style.width = ((i * 100) / mediaFiles.length).toFixed(1) + '%';
   };
});

function preloaderHide() {
   preloaderProcent.innerHTML = '100%';
   preloaderSvg.style.width = '100%';
   setTimeout(function () {
      preloaderWrapper.classList.add('is--hidden');
   }, 300);
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
