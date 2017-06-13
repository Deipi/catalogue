import React from 'react'
import {Field, reduxForm} from 'redux-form/immutable';
import { Link } from 'react-router-dom';
import { Container, Card, Button, CardTitle, CardText, Row, Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';

const validate = values => {
    const errors = {};

    if (!values.get('email')) {
        errors.email = 'Se Requiere un e-mail'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
        errors.email = 'Invalid email address'
    }

    if (!values.get('password')) {
        errors.password = 'Se Requiere una Contraseña'
    }

    return errors;
}

const renderField = ({ onChangeAction, index, input, label,className, type, meta: { touched, error } }) => {
    const styleError = {};
    let errorSpan = null;

    const ERROR_STYLE = {
       position: 'absolute',
        zIndex: '3',
        right: '2px',
        top: '-10px',
        width: '15em',
        'font-size':'11px'
    };

    if (touched && error) {
        errorSpan = <span className="badge badge-danger" style={ ERROR_STYLE }>{ error }</span>;
        styleError.borderColor = 'darkred';
    }
    return(
        <div style={ { position: 'relative' } }>
        { errorSpan }
        <InputGroup  style={{ zIndex: 0 }}>
            <InputGroupAddon> <i className={className}/></InputGroupAddon>
            <Input { ...input }className="form-control" style={ styleError }  name={ input.name } id="inputs" type={type} placeholder={label} />
        </InputGroup>
        </div>
    );
};

const SimpleFormLogin = (props) => {
    const {handleSubmit, pristine, reset, submitting, actionSubmit} = props
    return (
    <Container>
        <Col className="col-sm-12">
            <form onSubmit={handleSubmit(actionSubmit)}>
                <Row>
                    <div className="col-sm-5">
                        <h4>Ingrese a su cuenta</h4>
                        <br/>
                        <div>
                            <i className="fa fa-envelope fa-2x pull-left"/>
                                <p >Por favor introduzca su <strong>correo electrónico</strong> y <strong>contraseña</strong>  para ingresar al sistema.</p>
                        </div><br/><br/>
                        <div>
                            <i className="fa fa-check fa-2x pull-left"/>
                                <p>Por favor introduzca su <strong>correo electrónico</strong> y <strong>contraseña</strong>  para ingresar al sistema.</p>
                        </div>
                    </div>
                    <Col className="sm-7 xs-12" >
                        <Card block>
                                    <br/>
                                    <div className="col-sm-3 offset-5">
                                        <img src="http://www.freeiconspng.com/uploads/register-secure-security-user-login-icon--7.png" />
                                        <br/>
                                    </div>
                            <Col className="col-sm-12 offset-1">
                                <InputGroup>
                                <Col className="col-sm-10">
                                    <Field
                                        name="email"
                                        type="email"
                                        component={renderField}
                                        label="Email"
                                        className="fa fa-fw fa-envelope"
                                    />
                                    <br/>
                                </Col>
                                </InputGroup>

                                <InputGroup>
                                <Col className="col-sm-10">
                                    <Field
                                        name="password"
                                        type="password"
                                        component={renderField}
                                        label="Password"
                                        className="fa fa-fw fa-key"
                                    /><br/><br/>
                                </Col>
                                </InputGroup>

                            </Col>
                                 <Row>
                                <div className="col-sm-12 offset-2">
                                <Button type="submit" disabled={ pristine || submitting }>
                                    Sign Up
                                </Button>
                                <Button className="btn btn-primary" type="button" disabled={pristine || submitting} onClick={reset}>
                                    <Link tag={Link} color="info" to='login'>Clear Values</Link>
                                </Button>
                                <Button className="btn btn-primary" type="button" disabled={pristine || submitting} onClick={reset}>
                                    <Link  tag={Link} color="info" to='registrar'>Registrar</Link>
                                </Button>
                                </div>
                                </Row>
                        </Card>
                    </Col>
                </Row>
            </form>
        </Col>
    </Container>
  )
}

export default reduxForm({
    form: 'login', // a unique identifier for this form
    validate
})(SimpleFormLogin)

export const Login = reduxForm({
    form: 'login', // a unique identifier for this form
    validate
})(SimpleFormLogin)