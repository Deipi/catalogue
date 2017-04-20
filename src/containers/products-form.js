import React, { Component } from 'react';
import SimpleForm from '../components/products-form';
import { connect } from 'react-redux';
import submitProduct from '../actions';
import { formValueSelector } from 'redux-form/immutable';



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
		return <SimpleForm actionSubmit={ this.handleSubmit } />;
	}
}

const selector = formValueSelector('fieldArrays');

export default connect(state => {
	const variants = selector(state, 'variantsSelect');
	debugger;
	return {
		variants: variants,
	};
})(SimpleFormContainer);