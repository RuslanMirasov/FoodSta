"use strict";
const mediaFiles = document.querySelectorAll("img"),
      wrapper = document.querySelector(".preloader"),
      procent = document.querySelector("[data-preloader]");
var i = 0;
console.log(mediaFiles.length);
mediaFiles.forEach(loadItem => {
   loadItem.onload = function () {
      i++;
      console.log(i);
      procent.innerHTML = ((i * 100) / mediaFiles.length).toFixed() + "%";
      if (i === mediaFiles.length) {
         setTimeout(() => {
            wrapper.classList.add("is--hidden");
            procent.innerHTML = "100%";
         }, 500);
      }
   }
});