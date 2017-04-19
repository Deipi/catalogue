import React, { Component } from 'react';
import SimpleForm from '../components/products-form';
import { connect } from 'react-redux';
import submitProduct from '../actions';



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

export default connect()(SimpleFormContainer);