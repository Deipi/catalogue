const validate = values => {
  debugger;
  const errors = {};
  if (!values.get("name")) {
    errors.name = 'Un Nombre es Obligatorio';
  }
  if (!values.get("code")) {
    errors.code = 'Un Código es Obligatorio';
  }
  if (!values.get("price")) {
    errors.price = 'No hay un precio valido';
  }

  if (!values.get("tags")) {
    errors.tags = 'No hay un precio valido';
  }

  if (!values.get("members") || !values.get("members").length) {
    errors.members = { _error: 'At least one member must be entered' };
  } else {
    const membersArrayErrors = [];
    values.get("members").forEach((member, memberIndex) => {
      const memberErrors = {};
      if (!member || !member.firstName) {
        memberErrors.firstName = 'Required';
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (!member || !member.lastName) {
        memberErrors.lastName = 'Required';
        membersArrayErrors[memberIndex] = memberErrors;
      }
    });
    if (membersArrayErrors.length) {
      errors.members = membersArrayErrors;
    }
  }
  return errors;
};

export default validate;