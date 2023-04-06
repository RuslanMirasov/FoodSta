const preloaderWrapper = document.querySelector('.preloader'),
   preloaderProcent = document.querySelector('[data-preloader]'),
   preloaderSvg = document.querySelector('.preloader__svg');

let preloaderCount = 0;
let loadProcess = setInterval(preloader, 30);

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
