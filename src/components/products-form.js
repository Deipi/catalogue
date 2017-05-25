import React, { Component } from 'react';
import Immutable from 'immutable';
import { Field, FieldArray, reduxForm, change, arrayPush, reset  } from 'redux-form/immutable'
import validate from './validate';
import { VariantsDictionary, TagsSelect, VariansSelect, options } from './select-catalogues'
import { Link } from 'react-router-dom'
import 'react-select/dist/react-select.css';
import { Card, CardBlock, CardHeader, Button, InputGroupAddon, InputGroup, Input, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {fetchProducts} from '../actions'

const renderField = ({ onChangeAction, index, input, label, type, meta: { touched, error } }) => {
	const styleError = {};
	let errorSpan = null;

	const ERROR_STYLE = {
		position: 'absolute',
		zIndex: '3',
		right: '11px',
		top: '-9px',
	};

	if (touched && error) {
		errorSpan = <span className="badge badge-danger" style={ ERROR_STYLE }>{ error }</span>;
		styleError.borderColor = 'darkred';
	}
	return(
		<div style={ { position: 'relative' } }>
		{ errorSpan }
			<InputGroup>
				<InputGroupAddon> {label}</InputGroupAddon>
					<Input { ...input } style={ styleError }  name={ input.name } id="inputs" type={type} placeholder={label} />
			</InputGroup>
		</div>
	);
};

const renderFieldVariant = ({ onChangeAction, input, index, label, placeholder, type, meta: { touched, error } }) => {
	const styleError = {};
	let errorSpan = null;

	const ERROR_STYLE = {
		position: 'absolute',
		zIndex: '3',
		right: '11px',
		top: '-9px',
	};

	if (touched && error) {
		errorSpan = <span className="badge badge-danger" style={ ERROR_STYLE }>{ error }</span>;
		styleError.borderColor = 'darkred';
	}

	return(
		<div style={ { position: 'relative' } }>
		{ errorSpan }
			<InputGroup  style={{ zIndex: 0 }}>
				<Input {...input} style={ styleError } id="inputs" type={type} placeholder={label} onBlur={ event => onChangeAction(event.target.value, event.target.name, index, false) } />
			</InputGroup>
		</div>
	);
};


class renderSubProducts extends React.Component{
	constructor(props){
		super(props);

		this.validateVariant = this.validateVariant.bind(this);
		this.validateVariantInput = this.validateVariantInput.bind(this);

		this.state = {
			validationError: false,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.variantError.get('errorKey') && !this.state.validationError) {
			this.setState({ validationError: true });
			const { dispatch } = this.props;
			const index = parseInt(nextProps.variantError.get('errorKey'));

			// Remove child if is repeated in the list
			this.props.variantsArray.map(obj => {
				if (obj.name) {
					dispatch(change('fieldArrays', `variantsArray[${ index }].${ obj.name ? obj.name : obj.label }`, {}));
				} else {
					dispatch(change('fieldArrays', `variantsArray[${ index }].${ obj.label }`, ""));
				}
			});

			dispatch({
				type: 'ERROR_IN_VARIANT',
				payload: '',
			});

		} else {
			this.setState({ validationError: false });
		}
	}

	validateVariant(value) {
		//aqui se retorna un error al component=VariantsDictionary
		return value && value.label ? undefined : "Please don't repeat variants";
	}

	validateVariantInput(value) {
		return value ? undefined : "Please don't repeat variants";
	}

	render() {
		const { onChangeActionArray, variantsArray, fields, meta: { touched, error, submitFailed } } = this.props;
		return (
			<ul>
				<div style={{ float: 'left'}}>
					<Button type="button" onClick={(() => fields.push(Immutable.Map()))}><i className="fa fa-plus-circle  "/> Crear</Button>
					{(touched || submitFailed) && error && <span>{error}</span>}
				</div>
				<div style={{ float: 'right'}}>
					<Card>
						<CardHeader>Subproductos</CardHeader>
						{fields.map((field, index) => (
							<CardBlock>
								<li key={index}>
									<h4>Variante #{index + 1} </h4>
										{
											variantsArray ?
											variantsArray.map(obj =>
												{ // Recibir el nombre
													if (obj.name) {
														return (
															<Field
																name={ `${ field }.${ obj.name }` }
																type="text"
																component={ VariantsDictionary }
																label={ obj.label }
																onChangeAction={ onChangeActionArray }
																//placeholder: Obtener el label / crear un placeholder en multiValue
																placeholder={ obj.placeholder }
																// options: Obtener las opciones del catálogo (select-catalogues)
																options={ obj.options }
																index={ index }
																variantsArray={ this.variantsArray }
																// condicional para validar el select: llama la funcion validateVariant
																validate={ [ this.validateVariant ] }
															/>
														);
													} else {
														return (
															<Field
																name={ `${ field }.${ obj.label }` }
																type="text"
																component={ renderFieldVariant }
																onChangeAction={ onChangeActionArray }
																label={ obj.label }
																index={ index }
																validate={ [ this.validateVariantInput ] }
															/>
														);
													}
											}) : null
										}
										<br/>
									<Button color="danger" type="button" onClick={() => fields.remove(index)}><i className="fa fa-trash "/> Eliminar</Button>
								</li>
							</CardBlock>
						))}
					</Card>
					<br/>
				</div>
			</ul>
		);
	}
}

class NewProductForm extends React.Component{
	constructor(props){
		super(props);
		this.onChangeActionTags = this.onChangeActionTags.bind(this);
		this.onChangeActionVariants = this.onChangeActionVariants.bind(this);
		this.onChangeActionArray = this.onChangeActionArray.bind(this);
	}

	onChangeActionVariants(value, inputName){
		const { dispatch } = this.props;
		dispatch(change('fieldArrays', inputName, value, true));
	}

	onChangeActionTags(value, inputName){
		const { dispatch } = this.props;
		dispatch(change('fieldArrays', inputName, value, true));
	}

	onChangeActionArray(value, inputName, index, isSelect){
		const { dispatch, variants } = this.props;
		if (isSelect) {
			dispatch(change('fieldArrays', inputName, Object.assign({}, value, { name: inputName }), true));
		} else {
			dispatch(change('fieldArrays', inputName, value, true));
		}
		let obj = {};
		if (isSelect) {
			obj = { [inputName]: value ? value.label : "" };
		} else {
			obj = { [inputName]: value };
		}
		variants[index] = Object.assign({}, variants[index], obj)
		dispatch(change('fieldArrays', 'variants', variants, true))


		// Validation
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
		let errorKey = 0;
		const test = Object.keys(combination).forEach(key_1 => {
			let counter = 0;
			Object.keys(combination).forEach(key => {
					if (!iter.split(',').map(element => combination[key].split(',').includes(element)).includes(false)) {
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
			dispatch({
				type: 'ERROR_IN_VARIANT',
				payload: errorKey,
			});
		}
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.initialValues.size) {
			nextProps.initialize(nextProps.initialValues);

			const tags = nextProps.initialValues.get('tags');
			nextProps.dispatch(change('fieldArrays', 'tags', tags.map(tag => ({label: tag, value: tag})).toJS() ));
			//nextProps.dispatch(change('fieldArrays', 'variantsArray', variantsList.map(varian => varian).toJS() ));
		}

		/*if (nextProps.subProducts.length) {
			nextProps.dispatch(arrayPush('fieldArrays', 'variantsArray', Immutable.Map()))
			const varian = nextProps.initialValues.get('variantsArray')

			// newOptions = [];
			// Object.keys(varian).map(key =>
			// 	const option = options.filter(obj => obj.name === varian[key].split('.')[1])

			// 	if (option.length) {
			// 		newOptions.push(option)
			// 		nextProps.dispatch(change('fieldArrays', key, {label: varian[key] , key: varian[key]} ));
			// 	} else {
			// 		newOptions.push({ value: varian[key], label: varian[key], name: varian[key].split('.')[1], options: [], placeholder: varian[key].split('.')[1] } // NO ESTA)
			// 		nextProps.dispatch(change('fieldArrays', key, varian[key] ));

			// 	}

			// )
			nextProps.dispatch(change('fieldArrays', 'variantsArray', varian.map(tag => tag).toJS() ));

		}*/

		if (nextProps.subProducts.length) {
			const Subproducts = nextProps.products.filter(product => product.get('parent') === nextProps.initialValues.get('id'));
			const sub=Subproducts.get('variants')
			for(let i=1;i<=Subproducts.size;i++){
				nextProps.dispatch(arrayPush('fieldArrays', 'variantsArray', Immutable.Map()))
				//nextProps.dispatch(change('fieldArrays', 'variants', sub.map(sub => ({label: sub, value: sub})).toJS() ));
			}
		}
	}

	render(){
		const { handleSubmit, actionSubmit, pristine, reset, submitting, variantsArray, dispatch, variantError } = this.props;
		return (
			<div>
				<Breadcrumb tag="nav">
					<Link to="/">
						<BreadcrumbItem tag="a">Inicio</BreadcrumbItem>
					</Link>
					<BreadcrumbItem active tag="span">/Nuevo Producto</BreadcrumbItem>
				</Breadcrumb>
				<form onSubmit={ handleSubmit(actionSubmit) }>
					<div style={{ float: 'left'}}>
						<Field
						  name="name"
						  type="text"
						  component={ renderField }
						  label="Nombre del producto"
						/>
						<Field
						  name="code"
						  type="number"
						  component={renderField}
						  label="Código del producto"
						/>
						<Field
						  name="amount"
						  type="number"
						  component={renderField}
						  label="Precio del producto"
						/>
						<label>Descripción</label><br/>
						<Field
						  name="description"
						  type="text"
						  component="textarea"
						  placeholder="Descripción"
						/>
						<Field
							name="tags"
							component={ TagsSelect }
							type="text"
							placeholder="Tags"
							onChangeAction={ this.onChangeActionTags }
						/>
						<label>Variantes</label>
						<Field name="ProductVariants"
							component={ VariansSelect }
							type="text"
							placeholder="Variantes"
							onChangeAction={ this.onChangeActionVariants }
							/>
					</div>
					<div style={{ float: 'left'}}>
						<FieldArray
						  name="variantsArray"
						  component={ renderSubProducts }
						  variantsArray={ variantsArray }
						  onChangeActionArray={ this.onChangeActionArray }
						  dispatch={ dispatch }
						  variantError={ variantError }
						/>
					</div>
					<div style={{float:'left'}}>
						<Button
							type="submit"
							disabled={submitting}>
							<i className="fa fa-floppy-o"/> Guardar</Button>
						<Button
							type="button"
							disabled={pristine || submitting}
							onClick={reset}><i className="fa fa-eraser "/> Limpiar</Button>
					</div>
					<div className="pull-right">
						<Link to="/ListadoAdmin" ><Button type="button"><i className="fa fa-list"/> Listado Administrativo</Button></Link>
					</div>
					<div className="pull-right">
						<Link to="/Listado" ><Button type="button"><i className="fa fa-th-list"/> Listado Publico</Button></Link>
					</div>
				</form>
			</div>
		);
	}
}

export default reduxForm({
  form: 'fieldArrays',
   validate
})(NewProductForm);

