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
		const Subproducts = props.products.filter(product => product.get('parent') === props.initialValues.get('id'));
		this.onChangeActionTags = this.onChangeActionTags.bind(this);
		this.onChangeActionVariants = this.onChangeActionVariants.bind(this);
		this.onChangeActionArray = this.onChangeActionArray.bind(this);
		this.state = {
			productUpdated: false,
		}
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

	componentWillReceiveProps(nextProps){
			const { dispatch } = this.props;

			const Subproducts = nextProps.products.filter(product => product.get('parent') === nextProps.initialValues.get('id'));
			const valor = Subproducts.getIn([0, 'variants']);

		if (nextProps.initialValues.size) {
			nextProps.initialize(nextProps.initialValues);

			const tags = nextProps.initialValues.get('tags');
			dispatch(change('fieldArrays', 'tags', tags.map(tag => ({label: tag, value: tag})).toJS() ));
			const variants = Object.keys( nextProps.products.filter(product => product.get('parent') === nextProps.initialValues.get('id')).getIn([0, 'variants']).toJS()).map(key =>key.split('.')[1]);
			const variantsValues = [];

			variants.map( variant => {
				const option = options.filter( option => option.name === variant);
				if (option.length) {
					variantsValues.push(option[0]);
				} else {
					variantsValues.push({ label: variant, value: variant, options: [], placeholder: variant });
				}
			});

			dispatch(change('fieldArrays', 'ProductVariants', variantsValues, true));

		}

		if (nextProps.subProducts.length) {

			for(let i = 1; i <= Subproducts.size; i++){
				nextProps.dispatch(arrayPush('fieldArrays', 'variantsArray', Immutable.Map()))
			}
			const VariantsValues = nextProps.products.filter(product => product.get('parent') === nextProps.initialValues.get('id')).map(z=>z.get('variants'));
			//alert(variants)
			const VariantsKeys=VariantsValues.map(a=>Object.keys(a.toJS()))
			Subproducts.toJS().map(subProduct=>subProduct.variants)
			Subproducts.map( subProduct => {
				//nextProps.dispatch(change('fieldArrays', 'variantsArray[0].size', {label: 'Chico', value: 'C'}))
				//'color' es el name que va a entrar en el if del map
				//'Negro' es el label de
				//options.filter(z=>z.name==='color').map(v=>v.options.find(b=>b.label=='Negro'))
			//VariantsKeys.map(key =>key.map(q=>q.split('.')[1])----)
			//Subproducts.map(j=>j.get('variants').map( variant =>variant)).toJS() ====>>>> Array [ Object, Object ]
			//Subproducts.map(s=> Object.keys(s.get('variants').map(m=>m).toJS()).map(z=>z.split('.')[1])).toJS()
			Object.keys(subProduct.get('variants').toJS()).map(ValVariant=>{
				const keyVariant = ValVariant;
				const keyValue = ValVariant.split('.')[1];
				const option = options.filter( option => option.name === keyValue);
				//_selectCatalogues.options.find( option => option.name === 'size').options.find(q=> q.label=='Chico')
				if (option.length) {
					const variantValue = subProduct.get('variants').toJS()[keyVariant]
					const optionsVariant = option[0].options.filter( option => option.label === variantValue);
					if (optionsVariant.length) {
						nextProps.dispatch(change('fieldArrays', keyVariant, optionsVariant[0]));
					}
					//const cataloge = options.filter(z=>z.name===Valvariant).map(v=>v.options.find(b=>b.label=='Negro'))
				//_selectCatalogues.options.filter( option => option.name === 'size').map(a=>a.options.find(q=> q.label=='Chico'))
					//const d=option.map(op=>op.options.find(q=>q.label==subProduct.getIn(['variants',  ValVariant])))

					//const d= Subproducts.map(m=>options.find( option => option.name === keyValue).toJS()
					//const d= Subproducts.map(option.options.find(q=>q.label==subProduct.getIn(['variants',  ValVariant]))).toJS()
					//q=>q.label==subProduct.getIn(['variants',  'variantsArray[0].size'])
					//const variantFina = d.map(l=>l.options.find(q=>q.label==subProduct.getIn(['variants',  ValVariant])).label).find(a=>a[0])
					//alert(option.map(op=>(nextProps.dispatch(change('fieldArrays', 'variantsArray[1].size', {label: op.options.find(q=>q.label=subProduct.getIn(['variants',  ValVariant])).label, value: op.options.find(q=>q.label=subProduct.getIn(['variants',  ValVariant])).value})))))
					//dispatch(change('fieldArrays', 'variantsArray[0].size', {label:variantFina}));
					//Subproducts.map(subProduct=>subProduct.getIn(['variants', 'variantsArray[1].Contenido'])).toJS()
				} else {
					//variantsValues.push({ label: variant, value: variant, options: [], placeholder: variant });
					//Object.keys(subProduct.get('variants').toJS()).map( key => dispatch(change('fieldArrays', key, subProduct.get('variants').toJS()[key])));
				}
				})
			});
		}
	}

	render(){
		const { handleSubmit, actionSubmit, pristine, reset, submitting, variantsArray, dispatch, variantError } = this.props;
		//const productVariants = Object.keys(sub.getIn([0, 'variants']).toJS()).map(key =>key.split('.')[1])
		return (
			<div>
				<Breadcrumb tag="nav">
					<Link to="/">
						<BreadcrumbItem tag="a">Inicio</BreadcrumbItem>
					</Link>
					<BreadcrumbItem active tag="span">/Nuevo Producto</BreadcrumbItem>
					{/*alert(mobe)*/}
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

