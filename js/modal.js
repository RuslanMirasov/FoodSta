const popupOpen = document.querySelectorAll('[data-popup]'),
   popupClose = document.querySelectorAll('[data-popup-close]'),
   allPopups = document.querySelectorAll('.popup'),
   modalBackdrop = document.querySelector('.backdrop'),
   modalPaddingElements = [].filter.call(document.all, e => getComputedStyle(e).position == 'fixed'),
   body = document.querySelector('.body'),
   bodyPadding = window.innerWidth - document.querySelector('.main').offsetWidth;

let defaultPopupInfo = ['request', 'Send order form', 'Order Form', 'Fill in the form and we will get <br />back to you as soon as possible!', 'Send'];

//POPUP OPEN EVENT
popupOpen.forEach(modalBtn => {
   modalBtn.addEventListener('click', function (event) {
      event.preventDefault();
      let info = this.dataset.popup.split('|');
      popup(info[0], info[1], info[2], info[3], info[4]);
   });
});

//POPUP CLOSE EVENT
popupClose.forEach(closeBtn => {
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
   if (modalBackdrop.classList.contains('is-hidden')) {
      modalBackdrop.classList.remove('is-hidden');
      bodyPaddingToggle();
   }
   clearPopups();
   setTimeout(function () {
      document.getElementById(id).style.display = 'block';
      setTimeout(function () {
         document.getElementById(id).classList.remove('is-hidden');
      }, 50);
   }, 250);
}

//POPUP CLOSE FUNCTION
function modalClose() {
   modalBackdrop.classList.add('is-hidden');
   clearPopups();
   setTimeout(function () {
      bodyPaddingToggle();
      formsReset();
   }, 250);
}

//RESET OLL POPUP SETTINGS TO DEFAULT
function clearPopups() {
   allPopups.forEach(popup => {
      popup.classList.add('is-hidden');
      setTimeout(function () {
         popup.style.display = 'none';
      }, 240);
   });
}

//SCROLL BAR MODIFY
function bodyPaddingToggle() {
   body.classList.toggle('lock');
   modalPaddingElements.forEach(modalPaddingElements => {
      if (body.classList.contains('lock')) {
         body.style.paddingRight = bodyPadding + 'px';
         modalPaddingElements.style.paddingRight = bodyPadding + 'px';
      } else {
         body.style.paddingRight = '0px';
         modalPaddingElements.style.paddingRight = '0px';
      }
   });
}
