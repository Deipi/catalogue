import React, { Component } from 'react';
import Immutable from 'immutable';
import SimpleForm from '../components/products-form';
import { connect } from 'react-redux';
import submitProduct, {updateProduct} from '../actions';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form'

class SimpleFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        const { props: { dispatch, info } } = this;
        const variants = values.get('variants');
        const tags = values.get('tags').map(obj => obj.label);
        const valuesProduct = values.set('variants', {}).set('tags', tags);
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
                dispatch(reset('fieldArrays'));
            } else {
                dispatch(submitProduct(product, subProducts));
                dispatch(reset('fieldArrays'));
            }
    }

    render(){
        const { variantsArray, variants, variantError, info, products, subProducts } = this.props;
        return <SimpleForm
            variantError={ variantError }
            variants={ variants }
            variantsArray={ variantsArray }
            actionSubmit={ this.handleSubmit }
            initialValues={ info }
            subProducts={ subProducts }
            products={ products }
            />;
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
        info: state.getIn([ 'updateProduct', 'product' ]) ? state.getIn([ 'updateProduct', 'product' ]) : Immutable.Map() ,
        products: state.get('products'),
        subProducts: state.getIn([ 'updateProduct', 'subProducts' ]) ? state.getIn([ 'updateProduct', 'subProducts' ]) : Immutable.Map() ,
    }

}

export default connect(getValues)(SimpleFormContainer);