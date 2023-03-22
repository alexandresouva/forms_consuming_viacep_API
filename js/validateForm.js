'use strict';
const $email = document.querySelector('#email');
const $phoneNumber = document.querySelector('#telefone');
const $cep = document.querySelector('#cep');
const $errorEmail = document.querySelector('.erro__msg--email');
const $btnSubmitForm = document.querySelector('.formulario__botao');

export const maskCEP = (value) => {
  return value.replace(/\D/g, '').replace(/^(\d{5})(\d{1})/, '$1-$2');
};

export const maskPhone = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)$/, '$1');
};

const isValidEmail = (value) => {
  const rule = /\S+@\S+\.\S+/;
  return rule.test(value);
};

function validateEmail(email) {
  $errorEmail.textContent = '';

  if (isValidEmail(email)) {
    $btnSubmitForm.removeAttribute('disabled', '');
    $btnSubmitForm.classList.remove('formulario__botao--disabled');
  } else {
    $errorEmail.textContent = 'Digite um e-mail válido.';
    $btnSubmitForm.setAttribute('disabled', '');
    $btnSubmitForm.classList.add('formulario__botao--disabled');
  }
}

// Apply Event Listeners

$phoneNumber.addEventListener('input', (e) => {
  e.target.value = maskPhone(e.target.value);
});

$cep.addEventListener('input', (e) => {
  e.target.value = maskCEP(e.target.value);
});

$email.addEventListener('focusout', (e) => validateEmail(e.target.value));
