'use strict';
const forms = document.querySelectorAll('.form');
const inputs = document.querySelectorAll('input, textarea');
const agree = document.querySelectorAll('.agree');

let errorText = 'Field must be not empty!';

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
         }, 2000);
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
      form.querySelectorAll('.required').forEach(required => {
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
   formId.querySelectorAll('.required').forEach(required => {
      let requiredLabel = required.parentNode;
      let errors = requiredLabel.querySelectorAll('.label__error').length;
      let requiredInput = required;
      if (requiredInput.value == '') {
         requiredInput.classList.add('red');
         if (errors < 1) {
            requiredLabel.insertAdjacentHTML(
               'beforeend',
               '<div class="label__error"><svg width="14" height="14" class="label__icon"><use href="./images/icons.svg#alert"></use></svg>' + errorText + '</div>'
            );
         }
         checker = false;
      }
      if (requiredInput.classList.contains('checkbox') && !requiredInput.checked) {
         requiredInput.classList.add('red');
         checker = false;
      }
   });

   if (checker != true) {
      return false;
   }
}

// function checkForm(formId) {
//    var $form = jQuery(formId);
//    var checker = true;
//    $form.find('.required').each(function () {
//       var requiredLabel = jQuery(this).parents('.label');
//       var requiredInput = jQuery(this);
//       var errorText = 'Поле не должно быть пустым';
//       if (requiredInput.val() == '') {
//          requiredInput.addClass('red');
//          requiredLabel.append("<div class='error'>" + errorText + '</div>');
//          checker = false;
//       } else {
//          if (
//             (requiredInput.attr('name') == 'email' && !/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(requiredInput.val())) ||
//             (requiredInput.attr('name') == 'phone' && /[^0-9\+ ()\-]/.test(requiredInput.val()))
//          ) {
//             if (requiredInput.attr('name') == 'email') {
//                errorText = 'Проверьте адрес электронной почты';
//             }
//             if (requiredInput.attr('name') == 'phone') {
//                errorText = 'Не верный формат телефона';
//             }
//             requiredInput.addClass('red');
//             requiredLabel.append("<div class='error'>" + errorText + '</div>');
//             checker = false;
//          }
//       }
//    });
//    if (checker != true) {
//       return false;
//    }
// }
