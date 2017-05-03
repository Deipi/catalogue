const validate = values => {
    const errors = {};
    const variants = values.toJS().variants;
    const combination = {};

    if (variants) {
        Object.keys(variants).map(keyVariant => {
            Object.keys(variants[keyVariant]).map(keyElement => {
                let variantTag = "";
                variantTag = `${ variants[keyVariant][keyElement] } ,` + combination[keyVariant];
                combination[keyVariant] = variantTag;
            });
        });
    }

    let iter = "";
    let errorInVariant = "";
    const test = Object.keys(combination).forEach(key => {
        if (Object.keys(combination).filter(key => combination[key] === iter).length > 1) {
            errorInVariant = key;
        } else {
            iter = combination[key];
        }
    });

    if (errorInVariant) {
        alert(errorInVariant)
        //errors[errorInVariant] = "ERROR";
    }



  if (!values.get("name")) {
    errors.name = 'Un Nombre es Obligatorio';
  }
  if (!values.get("code")) {
    errors.code = 'Un Código es Obligatorio';
  }
  if (!values.get("amount")) {
    errors.amount = 'No hay un precio valido';
  }

  return errors;
};

export default validate;