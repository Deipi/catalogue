import React, { Component } from 'react';
import SimpleForm from '../components/products-form';
import { connect } from 'react-redux';
import submitProducts from '../actions';



class SimpleFormContainer extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(values) {
		const { props: { dispatch } } = this;
		dispatch(submitProducts(values))
	}

	render(){
		return (
			<SimpleForm onSubmit={ this.onSubmit } />
		);
	}
}

export default connect()(SimpleFormContainer);