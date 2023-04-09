'use strict';
const forms = document.querySelectorAll('.form');
const inputs = document.querySelectorAll('input, textarea');
const agree = document.querySelectorAll('.agree');

let errorText = 'Fill in this field!';

//INPUT FOCUS CLEAR CONDITIONS
inputs.forEach(field => {
   field.addEventListener('focus', function () {
      if (this.classList.contains('red')) {
         this.classList.remove('red');
         this.parentNode.childNodes.forEach(element => {
            if (element.classList != undefined && element.classList.contains('label__error')) {
               element.remove();
            }
         });
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
      this.parentNode.parentNode.childNodes.forEach(element => {
         if (element.classList != undefined && element.classList.contains('button--submit')) {
            element.disabled = disabled;
         }
      });
   });
});

//FORMS SUBMIT
forms.forEach(form => {
   form.addEventListener('submit', function (event) {
      event.preventDefault();
      let sendedForm = this;
      let answer = checkForm(sendedForm);
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
         form.childNodes.forEach(element => {
            if (element.classList != undefined && element.classList.contains('button--submit')) {
               element.disabled = true;
            }
         });
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
         addError(requiredLabel, 'The field must not be empty!');
      } else {
         //type email
         if (requiredInput.type == 'email' && !/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(requiredInput.value)) {
            addError(requiredLabel, 'Wrong E-mail format!');
         }
         //type tel
         if (requiredInput.type == 'tel' && /[^0-9\+ ()\-]/.test(requiredInput.value)) {
            addError(requiredLabel, 'Wrong phone format!');
         }
         //type number
         if (requiredInput.type == 'number') {
            if (requiredInput.min && Number(requiredInput.value) < Number(requiredInput.min)) {
               addError(requiredLabel, `Minimal number ${requiredInput.min}`);
            }
            if (requiredInput.max && Number(requiredInput.value) > Number(requiredInput.max)) {
               addError(requiredLabel, `Maximal number ${requiredInput.max}`);
            }
         }
      }
      //type checkbox & radio
      if ((requiredInput.type == 'checkbox' && !requiredInput.checked) || (requiredInput.type == 'radio' && !requiredInput.checked)) {
         checkerFalse();
      }

      //ERROR TEXT CREATE
      function addError(correntLabel, text) {
         let errors = correntLabel.querySelectorAll('.label__error').length;
         if (errors < 1) {
            correntLabel.insertAdjacentHTML(
               'beforeend',
               '<div class="label__error"><svg width="14" height="14" class="label__icon"><use href="./images/icons.svg#alert"></use></svg>' + text + '</div>'
            );
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
