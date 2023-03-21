'use strict';
const $cep = document.querySelector('#cep');
const $phoneNumber = document.querySelector('#telefone');
const $errorCep = document.querySelector('.erro_cep');

async function searchAddress(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.hasOwnProperty('erro')) {
      $errorCep.textContent =
        'CEP não encontrado, confira os números digitados.';
      // throw Error('CEP inexistente, confira os dados digitados.');
    } else {
      updateAddressInputs(data);
      return data;
    }
  } catch (erro) {
    clearAddressInputs();
    if ($cep.value.length != 9) {
      $errorCep.textContent = 'O CEP informado precisar ter 8 números.';
    } else {
      $errorCep.textContent = 'CEP inválido, tente novamente.';
    }
  }
}

function updateAddressInputs(address) {
  document.querySelector('#endereco').value = address.logradouro;
  document.querySelector('#complemento').value = address.complemento;
  document.querySelector('#bairro').value = address.bairro;
  document.querySelector('#cidade').value = address.localidade;
  document.querySelector('#estado').value = address.uf;
}

function clearAddressInputs() {
  const addressInputs = document.querySelectorAll('[data-api="viaCep"]');
  addressInputs.forEach((input) => (input.value = ''));
}

$cep.addEventListener('focusout', () => {
  $errorCep.textContent = '';

  const cepOnlyNumbers = $cep.value.replace('-', '');
  if ($cep.value.length > 0) {
    searchAddress(cepOnlyNumbers);
  }
});
