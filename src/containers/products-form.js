import React, { Component } from 'react';
import SimpleForm from '../components/new_product';
import { connect } from 'react-redux';
import submitProduct from '../actions';

class SimpleFormContainer extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(values) {
		const { props: { dispatch } } = this;
		dispatch(submitProduct(values))
	}

	render(){
		return (
			<SimpleForm onSubmit={ this.onSubmit } />
		);
	}
}

export default connect()(SimpleFormContainer);