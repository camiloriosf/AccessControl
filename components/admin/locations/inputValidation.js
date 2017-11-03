export default function inputValidation(data = { name: '', value: '' }) {
  switch (data.name) {
    case 'name':
      // if (/\s/g.test(data.value)) return 'el nombre no puede contener espacios';
      if (data.value === '' || data.value.length < 3) return 'debes ingresar un nombre de al menos 3 caracteres';
      return '';
    case 'username':
      if (/\s/g.test(data.value)) return 'el nombre no puede contener espacios';
      if (data.value === '' || data.value.length < 3) return 'debes ingresar un nombre de al menos 3 caracteres';
      return '';
    case 'password':
      if (/\s/g.test(data.value)) return 'la contraseña no puede contener espacios';
      if (data.value === '' || data.value.length < 6) return 'debes ingresar una contraseña de al menos 6 caracteres';
      return '';
    default:
      return '';
  }
}
