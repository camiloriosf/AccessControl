import validator from 'validator';

export default function inputValidation(data = { name: '', value: '' }) {
  switch (data.name) {
    case 'name':
      if (data.value === '' || data.value.length < 3) return 'debes ingresar un nombre de al menos 3 caracteres';
      return '';
    case 'email':
      if (data.value === '' || !validator.isEmail(data.value)) return 'debes ingresar un correo válido';
      return '';
    case 'comments':
      if (data.value === '' || data.value.length < 4) return 'debes ingresar un comentario';
      return '';
    default:
      return '';
  }
}
