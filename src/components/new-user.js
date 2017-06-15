import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import validate from '../validate'
import { Link } from 'react-router-dom';
//import SAVE from '../actions/indexRegistrar'

import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Container, Row, Col, Button, Card } from 'reactstrap'

const renderField = ({ onChangeAction, index, input, className,placeholder, label, type, meta: { touched, error } }) => {
	const styleError = {};
	let errorSpan = null;

	const ERROR_STYLE = {
		position: 'absolute',
        zIndex: '3',
        right: '2px',
        top: '-23px',
        width: '19em',
        'font-size':'11px'
	};

	if (touched && error) {
		errorSpan = <span className="badge badge-danger" style={ ERROR_STYLE }>{ error }</span>;
		styleError.borderColor = 'darkred';
	}
	return(
		<div style={ { position: 'relative' } }>
			{ errorSpan }
			<InputGroup>
				<InputGroupAddon> <i className={className}/></InputGroupAddon>
				<Input placeholder={ placeholder }{ ...input } style={ styleError }  name={ input.name } id="inputs" type={type}  />
			</InputGroup>
		</div>
	);
};

const SimpleFormRegistrar = (props) => {
  const { handleSubmit, pristine, reset, submitting, actionSubmit } = props
  return (
	<Container>
	 <Col className="col-sm-12">
			<form onSubmit={handleSubmit(actionSubmit)}>
				<Row>
					<div className="col-sm-5">
						<h4>Cree su cuenta</h4>
						<br/>
                        <i className="fa fa-envelope fa-4x pull-left"/>
                        <p><strong>Ingrese</strong> su correo electrónico y una contraseña segura para iniciar sesión.</p>
                    	<br/><br/>
                        <i className="fa fa-list fa-4x pull-left"/>
                        <p><strong>Cargue</strong> sus productos a su inventario.</p>
                        <br/><br/>
                        <i className="fa fa-barcode fa-4x pull-left"/>
                        <p><strong>¡Comienze</strong> a usar su punto de venta!</p>
                        <br/><br/>
					</div>
					<div className="col-sm-7">
						<Card block>
							<div className="col-sm-3 offset-5">
                                <img src="data:image/jpeg;base64,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" />
                                <br/>
                            </div>
							<Col className="col-sm-10 offset-1">
								<InputGroup>
									<Col className="col-md-12">
										<Field
											name="name"
											component={renderField}
											type="text"
											placeholder="Nombre(s)"
											label="First Name"
											className="fa fa-fw fa-user"
										/>
									</Col>
								</InputGroup>
								<br/>
								<InputGroup>
									<Col className="col-md-12">
										<Field
											name="apellido"
											component={renderField}
											type="text"
											placeholder="Apellido(s)"
											label="Last Name"
											className="fa fa-user-o"
										/>
									</Col>
								</InputGroup>
								<br/>
								<InputGroup>
									<Col className="col-md-12">
										<Field
											name="telefono"
											component={renderField}
											type="telefono"
											placeholder="Telefono"
											label="Phone"
											className="fa fa-phone"
										/>
									</Col>
								</InputGroup>
								<br/>
								<InputGroup>
									<Col className="col-md-12">
										<Field
											name="email"
											component={renderField}
											type="email"
											placeholder="Correo Electrónico"
											label="Email"
											className="fa fa-fw fa-envelope"
										/>
									</Col>
								</InputGroup>
								<br/>
								<InputGroup>
									<Col className="col-md-12">
										<Field
											name="password"
											component={renderField}
											type="password"
											placeholder="Contraseña"
											label="Password"
											className="fa fa-fw fa-key"
										/>
									</Col>
								</InputGroup>
								<br/>
								<Button
									type="submit"
									color="primary"
									onClick={()=>alert('Registrado')}
									disabled={pristine || submitting}>
									¡REGÍSTRESE!
								</Button>
								<br/><br/>
								<div class="forgot">
                                    <span
                                        style={{
                                            'margin-right': '5px',
                                            'font-size': '18px',
                                            'font-weight': 'bold'
                                        }}>¿Ya tiene una cuenta?</span>
                                    <Link
                                        style={
                                            {

                                                color: '#797979',
                                                'font-size': '18px',
                                                'font-weight': 'bold'
                                            }
                                        }
                                        to="/">¡Inicie sesión!
                                    </Link>
                                </div>
							</Col>
						</Card>
					</div>
				</Row>
			</form>
		</Col>
	</Container>
  )
}

export default reduxForm({
  form: 'simpleRegistrar',  // a unique identifier for this form
  validate
})(SimpleFormRegistrar)