/**
 *
 * @param {string} cpf
 * @returns {string} CPF with mask applied like 000.000.000-00
 */
function cpfMask(cpf) {
  if (cpf.length > 14) {
    return cpf.slice(0, -1);
  }

  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

/**
 *
 * @param {string} cnpj
 * @returns {string} CNPJ with mask applied like 00.000.000/0000-00
 */
function cnpjMask(cnpj) {
  if (cnpj.length > 18) {
    return cnpj.slice(0, -1);
  }

  return cnpj
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

/**
 *
 * @param {string} phone
 * @returns {string} phone with pattern 0000-0000
 */
function phoneMask(phone) {
  if (phone.length > 9) {
    return phone.slice(0, 9);
  }

  return phone.replace(/\D/g, '').replace(/(\d{4})(\d)/, '$1-$2');
}

/**
 *
 * @param {string} phone
 * @returns {string} phone with pattern (00) 00000-0000
 */
function cellphoneMask(phone) {
  if (phone.length > 15) {
    return phone.slice(0, 15);
  }

  return phone
    .replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/(\d{2})(\d)/, '$1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

/**
 *
 * @param {string} cep
 * @returns {string} CEP with mask applied like 00000-000
 */
function cepMask(cep) {
  if (cep.length > 9) {
    return cep.slice(0, 9);
  }

  return cep.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
}

export { cpfMask, cnpjMask, phoneMask, cellphoneMask, cepMask };
