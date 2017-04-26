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
		debugger;
		console.log(values.toJS());
		dispatch(submitProduct(values));
	}

	render(){
		const { variants, variantsArray } = this.props;
		return <SimpleForm variantsArray={ variantsArray } variants={ variants } actionSubmit={ this.handleSubmit } />;
	}
}

const selector = formValueSelector('fieldArrays') // <-- same as form name

const getValues = state => {
	const values = state.getIn([ 'form', 'fieldArrays', 'values' ] )

	let variants = [];
	let variantsArray = {};
	if (values) {
		variants = values.get('ProductVariants');
		variantsArray = values.get('variantsArray') ? values.get('variantsArray') : {};
	}

	return {
		variants,
		variantsArray,
	}
}

export default connect(getValues)(SimpleFormContainer);
