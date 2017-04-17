import React, { Component } from 'react';
import SimpleForm from '../components/products-form';
import { connect } from 'react-redux';
import submitEmploye from '../actions';



class SimpleFormContainer extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(values) {
		const { props: { dispatch } } = this;
		dispatch(submitEmploye(values))
	}

	render(){
		return (
			<SimpleForm onSubmit={ this.onSubmit } />
		);
	}
}

export default connect()(SimpleFormContainer);