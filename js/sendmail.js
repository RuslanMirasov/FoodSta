'use strict';
const forms = document.querySelectorAll('.form');
const inputs = document.querySelectorAll('input, textarea');
const agree = document.querySelectorAll('.agree');

const addErrorText = true;
const errorEmptyInput = 'The field must not be empty!';
const errorEmailInput = 'Wrong E-mail format!';
const errorPhoneInput = 'Wrong phone format!';
const errorMinNumber = 'The minimum value is';
const errorMaxNumber = 'The maximum value is';

//INPUT CLEAR ON FOCUS
inputs.forEach(input => {
   input.addEventListener('focus', function () {
      if (this.classList.contains('red')) {
         this.classList.remove('red');
         if (addErrorsText == true) {
            this.closest('.label').querySelector('.label__error').remove();
         }
      }
   });
});

//POLICY DISABLE
agree.forEach(policy => {
   policy.addEventListener('change', function () {
      let disabled = true;
      let agree = this.parentNode.parentNode.querySelectorAll('.agree');
      let agreeLength = agree.length;
      let agreeChecked = 0;
      agree.forEach(agree => {
         if (agree.checked) {
            agreeChecked++;
         }
      });
      if (agreeLength == agreeChecked) {
         disabled = false;
      }
      this.parentNode.parentNode.querySelector('[type=submit]').disabled = disabled;
   });
});

//FORMS SUBMIT
forms.forEach(form => {
   form.addEventListener('submit', async function (event) {
      event.preventDefault();
      let answer = checkForm(this);
      if (answer != false) {
         popup('loading');
         setTimeout(function () {
            popup('ok');
            formsReset();
            //-----
            //-----
            //----- google Analitics targets
            //-----
            // ----
         }, 1000);
      }
      return false;
   });
});

//OLL FORMS RESET
function formsReset() {
   forms.forEach(form => {
      form.reset();
      form.querySelectorAll('.label__error').forEach(errors => {
         errors.remove();
      });
      form.querySelectorAll('[required]').forEach(required => {
         required.classList.remove('red');
      });
      if (form.querySelectorAll('.agree').length > 0) {
         form.querySelector('[type=submit]').disabled = true;
      }
   });
}

//FORMS VALIDATION
function checkForm(formId) {
   let checker = true;
   formId.querySelectorAll('[required]').forEach(required => {
      let requiredLabel = required.parentNode;
      let requiredInput = required;
      if (requiredInput.value == '') {
         addError(requiredLabel, errorEmptyInput);
      } else {
         //type email
         if (requiredInput.type == 'email' && !/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(requiredInput.value)) {
            addError(requiredLabel, errorEmailInput);
         }
         //type tel
         if (requiredInput.type == 'tel' && /[^0-9\+ ()\-]/.test(requiredInput.value)) {
            addError(requiredLabel, errorPhoneInput);
         }
         //type number
         if (requiredInput.type == 'number') {
            if (requiredInput.min && Number(requiredInput.value) < Number(requiredInput.min)) {
               addError(requiredLabel, errorMinNumber + ' ' + requiredInput.min);
            }
            if (requiredInput.max && Number(requiredInput.value) > Number(requiredInput.max)) {
               addError(requiredLabel, errorMaxNumber + ' ' + requiredInput.max);
            }
         }
      }
      //type checkbox & radio
      if ((requiredInput.type == 'checkbox' && !requiredInput.checked) || (requiredInput.type == 'radio' && !requiredInput.checked)) {
         checkerFalse();
      }

      //ERROR TEXT CREATE
      function addError(correntLabel, text) {
         if (addErrorsText === true) {
            let errors = correntLabel.querySelectorAll('.label__error').length;
            if (errors < 1) {
               correntLabel.insertAdjacentHTML(
                  'beforeend',
                  '<div class="label__error"><svg width="14" height="14" class="label__icon"><use href="./images/icons.svg#alert"></use></svg>' + text + '</div>'
               );
            }
         }
         checkerFalse();
      }
      //ADD "RED" CLASS TO INPUTS
      function checkerFalse() {
         requiredInput.classList.add('red');
         checker = false;
      }
   });
   return checker;
}
