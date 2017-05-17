import React, { Component } from 'react';
import SimpleForm from '../components/products-form';
import { connect } from 'react-redux';
import submitProduct, {updateProduct} from '../actions';
import { Field, reduxForm, formValueSelector } from 'redux-form'

class SimpleFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        const { props: { dispatch, info } } = this;
        const variants = values.get('variants');
        const valuesProduct = values.set('variants', {});
        const product = valuesProduct.delete('size').delete('color').delete('ProductVariants').delete('variantsArray').toJS();

        const subProducts = [];
        Object.keys(variants).map(key => {
            const subProduct = {};
            subProduct.name = valuesProduct.get('name');
            subProduct.code = valuesProduct.get('code');
            subProduct.description = valuesProduct.get('description');
            subProduct.tags = valuesProduct.get('tags');
            subProduct.amount = valuesProduct.get('amount');
            subProduct.variants = variants[key];

            subProducts.push(subProduct);
        });

            if(info.get('id')){
                dispatch(updateProduct(info.get('id'), product));
            } else {
                dispatch(submitProduct(product, subProducts));
            }
    }

    render(){
        const { variantsArray, variants, variantError, info } = this.props;
        return <SimpleForm
            variantError={ variantError }
            variants={ variants }
            variantsArray={ variantsArray }
            actionSubmit={ this.handleSubmit }
            initialValues={ info } />;
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
        variantError: state.get('variantError'),
        info: state.get('updateProduct'),
    }

}

export default connect(getValues)(SimpleFormContainer);