import React, { Component } from 'react';
import SimpleForm from '../components/products-form';
import { connect } from 'react-redux';
import submitProduct from '../actions';
import { Field, reduxForm, formValueSelector } from 'redux-form'



class SimpleFormContainer extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		const { props: { dispatch } } = this;

		const valuesProduct = values.set('variants', {});
		const variants = valuesProduct.get('variantsArray');
		const valuesList = [valuesProduct.delete('size').delete('color').delete('variantsArray').toJS()];

		Object.keys(variants).map(key => {
			const subProduct = {};
			subProduct.name = valuesProduct.get('name');
			subProduct.code = valuesProduct.get('code');
			subProduct.description = valuesProduct.get('description');
			subProduct.tags = valuesProduct.get('tags');
			subProduct.amount = valuesProduct.get('amount');
			subProduct.variants = variants[key];

			valuesList.push(subProduct);
		});

		dispatch(submitProduct(valuesList));
	}

	render(){
		const { variants } = this.props;
		return <SimpleForm variants={ variants } actionSubmit={ this.handleSubmit } />;
	}
}

const selector = formValueSelector('fieldArrays') // <-- same as form name

const cristian = state => {
	const values = state.getIn([ 'form', 'fieldArrays', 'values' ] )

	let variants = [];
	if (values) {
		variants = values.get('tags');
	}

	return {
		variants,
	}
}

export default connect(cristian)(SimpleFormContainer);
