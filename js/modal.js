const openButton = document.querySelectorAll('[data-popup]'),
   closeButton = document.querySelectorAll('[data-popup-close]'),
   allPopups = document.querySelectorAll('.modal'),
   modalBackdrop = document.querySelector('.backdrop'),
   fixedElements = [].filter.call(document.all, e => getComputedStyle(e).position == 'fixed'),
   body = document.querySelector('.body'),
   bodyPadding = window.innerWidth - document.querySelector('.main').offsetWidth;

let defaultPopupInfo = ['request', 'Send order form', 'Order Form', 'Fill in the form and we will get <br />back to you as soon as possible!', 'Send'];

//MODAL OPEN BUTTON CLICK
openButton.forEach(btn => {
   btn.addEventListener('click', function (event) {
      event.preventDefault();
      let info = this.dataset.popup.split('|');
      popup(info[0], info[1], info[2], info[3], info[4]);
   });
});

//MODAL CLOSE BUTTON CLICK
closeButton.forEach(closeBtn => {
   closeBtn.addEventListener('click', modalClose);
});

//POPUP OPEN FUNCTION
function popup(id, subject, title, subtitle, btn) {
   if (id == 'request') {
      const popupSubject = document.querySelector('#request .subject');
      const popupTitle = document.querySelector('#request .popup-title');
      const popupSubtitle = document.querySelector('#request .popup-subtitle');
      const popupButton = document.querySelector('#request .button[type="submit"]');
      if (popupSubject !== null) {
         if (subject != undefined) {
            document.querySelector('#request .subject').value = subject;
         } else {
            document.querySelector('#request .subject').value = defaultPopupInfo[1];
         }
      }
      if (popupTitle !== null) {
         if (title != undefined) {
            document.querySelector('#request .popup-title').innerHTML = title;
         } else {
            document.querySelector('#request .popup-title').innerHTML = defaultPopupInfo[2];
         }
      }
      if (popupSubtitle !== null) {
         if (subtitle != undefined) {
            document.querySelector('#request .popup-subtitle').innerHTML = subtitle;
         } else {
            document.querySelector('#request .popup-subtitle').innerHTML = defaultPopupInfo[3];
         }
      }
      if (popupButton !== null) {
         if (btn != undefined) {
            document.querySelector('#request .button[type="submit"]').innerHTML = btn;
         } else {
            document.querySelector('#request .button[type="submit"]').innerHTML = defaultPopupInfo[4];
         }
      }
   }
   popupClose();
   if (modalBackdrop.classList.contains('is-hidden')) {
      modalBackdrop.classList.remove('is-hidden');
      scrollbarModify();
   }
   document.getElementById(id).classList.remove('is-hidden');
}

//POPUP CLOSE FUNCTION
function popupClose() {
   allPopups.forEach(popup => {
      popup.classList.add('is-hidden');
   });
}

//MODAL CLOSE FUNCTION
function modalClose() {
   popupClose();
   modalBackdrop.classList.add('is-hidden');
   setTimeout(function () {
      scrollbarModify();
   }, 300);
}

//SCROLL BAR MODIFY
function scrollbarModify() {
   body.classList.toggle('lock');
   fixedElements.forEach(fixedElement => {
      if (body.classList.contains('lock')) {
         body.style.paddingRight = bodyPadding + 'px';
         fixedElement.style.paddingRight = bodyPadding + 'px';
      } else {
         body.style.paddingRight = '0px';
         fixedElement.style.paddingRight = '0px';
      }
   });
}
