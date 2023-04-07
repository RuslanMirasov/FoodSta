'use strict';
const preloaderWrapper = document.querySelector('.preloader'),
   preloaderProcent = document.querySelector('[data-preloader]'),
   preloaderSvg = document.querySelector('.preloader__svg'),
   mediaFiles = document.querySelectorAll('img');

let i = 0;

mediaFiles.forEach(file => {
   file.onload = () => {
      i++;
      if (i === mediaFiles.length) {
         preloaderHide();
      } else {
         preloaderProcent.innerHTML = ((i * 100) / mediaFiles.length).toFixed(1) + '%';
         preloaderSvg.style.width = ((i * 100) / mediaFiles.length).toFixed(1) + '%';
      }
   };
});

function preloaderHide() {
   preloaderProcent.innerHTML = '100%';
   preloaderSvg.style.width = '100%';
   setTimeout(function () {
      preloaderWrapper.classList.add('is--hidden');
   }, 300);
}
