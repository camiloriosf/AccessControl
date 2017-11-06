import validator from 'validator';

export default function inputValidation(data = { name: '', value: '' }) {
  switch (data.name) {
    case 'name':
      if (data.value === '' || data.value.length < 3) return 'debes ingresar un nombre de al menos 3 caracteres';
      return '';
    case 'username':
      if (data.value === '') return 'debes ingresar un usuario';
      return '';
    case 'email':
      if (data.value === '' || !validator.isEmail(data.value)) return 'debes ingresar un correo válido';
      return '';
    case 'password':
      if (data.value === '' || data.value.length < 6) return 'debes ingresar una clave de al menos 6 caracteres';
      return '';
    default:
      return '';
  }
}
