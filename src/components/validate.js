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
    let errorKey = 0;
    const test = Object.keys(combination).forEach(key_1 => {
        let counter = 0;
        Object.keys(combination).forEach(key => {
                if (combination[key] === iter) {
                    counter ++;
                }
                if (counter === 2) {
                    errorKey = key;
                    counter = 0;
                    iter = "";
                }
            }
        );
        iter = combination[key_1];
    });

    if (errorKey) {
        errors.variantsArray = { _error: errorKey };
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