
const validate = values => {
    const errors = {}

    if (!values.get('name')) {
        errors.name = 'Se Requiere un Nombre'
    }
    if (!values.get('apellido')) {
        errors.apellido = 'Se Requiere un apellido'
    }
    if (!values.get('telefono')) {
        errors.telefono = 'Se Requiere un Número Telefonico'
    }
    if (!values.get('email')) {
        errors.email = 'Se requiere un e-mail'
    }
    if (!values.get('password')) {
        errors.password = 'Se Requiere una Contraseña'
    }

    return errors
}

export default validate