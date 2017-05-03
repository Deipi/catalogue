

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
        const { props: { dispatch} } = this;
        dispatch(submitProduct(values.delete("ProductVariants").delete("variantsArray").delete("size").delete("color")));
        /*values.get('variants').map(obj=>{
            obj.name=values.get('name');
            obj.code=values.get('code');
        })
        dispatch(actionCreate(values.get(variants)));*/
    }

    render(){
        const { variantsArray, variants } = this.props;
        return <SimpleForm variants={ variants } variantsArray={ variantsArray } actionSubmit={ this.handleSubmit } />;
    }
}


const getValues = state => {
    const values = state.getIn([ 'form', 'fieldArrays', 'values' ] )

    let variantsArray = [];
    let variants = {};
    if (values) {
        variantsArray = values.get('ProductVariants');
        variants = values.get('variants') ? values.get('variants') : {};
    }

    return {
        variantsArray,
        variants,
    }
}

export default connect(getValues)(SimpleFormContainer);
