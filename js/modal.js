(() => {
  const refs = {
    openModalBtn: document.querySelectorAll("[data-modal-open]"),
    closeModalBtn: document.querySelectorAll("[data-modal-close]"),
    modal: document.querySelectorAll("[data-modal]"),
    modalPaddingElements: [].filter.call(document.all, e => getComputedStyle(e).position == 'fixed'),
    body: document.querySelector(".body"),
    bodyPadding: window.innerWidth - document.querySelector('.main').offsetWidth
  };

  refs.openModalBtn.forEach(modalBtn => {
    modalBtn.addEventListener("click", modalOpen);
  });
  
  refs.closeModalBtn.forEach(closeBtn => {
    closeBtn.addEventListener("click", modalClose);
  });

  function modalOpen() {
    toggleModal();
    bodyPaddingToggle();
  }

  function modalClose() {
    toggleModal();
    setTimeout(function () {
      bodyPaddingToggle();
    }, 250);
  }

  function toggleModal() {
    refs.modal.forEach(modalClass => {
      modalClass.scrollTo({ top: 0, behavior: 'smooth' });
      modalClass.classList.toggle("is-hidden");
    });
  }

  function bodyPaddingToggle() {
    refs.body.classList.toggle("lock");
    refs.modalPaddingElements.forEach(modalPaddingElements => {
      if (refs.body.classList.contains('lock')) {
        refs.body.style.paddingRight = refs.bodyPadding + 'px';
        modalPaddingElements.style.paddingRight = refs.bodyPadding + 'px';
      }
      else {
        refs.body.style.paddingRight = '0px';
        modalPaddingElements.style.paddingRight = '0px';
      }
    });
  }

})();