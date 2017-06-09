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
        const { props: { dispatch, info, variantsArrayProduct, subProducts } } = this;
        const variants = values.get('variants');
        const tags = values.get('tags').map(obj => obj.label);
        const valuesProduct = values.set('variants', {}).set('tags', tags);
        const product = valuesProduct.delete('size').delete('color').delete('ProductVariants').delete('variantsArray').toJS();

        const productsList = [];
        let idSubProducts = [];
        if (variants && !info.id) {
            Object.keys(variants).map(key => {
                const subProduct = {};
                subProduct.name = valuesProduct.get('name');
                subProduct.code = valuesProduct.get('code');
                subProduct.description = valuesProduct.get('description');
                subProduct.tags = valuesProduct.get('tags');
                subProduct.amount = valuesProduct.get('amount');
                subProduct.variants = variants[key];

                productsList.push(subProduct);
            });
        } else if(variantsArrayProduct && info.id) {
            idSubProducts = subProducts.filter( product => product.parent === info.id);

             idSubProducts.map( subProduct => {
                 subProduct.name = valuesProduct.get('name');
                 subProduct.code = valuesProduct.get('code');
                 subProduct.description = valuesProduct.get('description');
                 subProduct.tags = valuesProduct.get('tags');
                 subProduct.amount = valuesProduct.get('amount');
                const variantsSubProduct = variantsArrayProduct.toJS().filter( v => v.id === subProduct.id)[0]
            ////////////////////////Hasta aqui todo va bien//////////////////////////////////
            // ES UNA PRUEBA-> idSubProducts.map(p=>variantsArrayProduct.toJS().filter( v => v.id === p.id)[0].index)
            //     variantsSubProduct = {
            //             id: 14,
            //             index: "0"
            //             ML: "600",
            //             taste: {}
            //     }
            //
                const index = variantsSubProduct.index;
                Object.keys(variantsSubProduct).map(key =>{

                    const CompleteKey = `variantsArray[${index}].${key}`;
                    if(typeof(variantsSubProduct[key])=="object"){
                        alert(CompleteKey)
                        subProduct.variants.CompleteKey = variantsSubProduct[key].label;
                        //`variantsArray[${index}].[${key}]` = variantsSubProduct[key].label
                        //alert(variantsSubProduct[key].label)
                    }else{
                        alert(CompleteKey)
                        subProduct.variants.CompleteKey = variantsSubProduct[key];
                        //alert(variantsSubProduct[key])
                    }
                });
            // subProduct.variants = newVariants
            // const newVariants = {
            //  P-> idSubProducts.map(p=>variantsArrayProduct.toJS().filter( v => v.id === p.id)[0].color)
            //  P-> idSubProducts.map(p=>Object.keys(variantsArrayProduct.toJS().filter( v => v.id === p.id)[0]).map(key=>key))
            //        VALIDAR QUE SEA UN OBJETO PARA OBTENER EL LABEL typeof
            //      if(typeof(variantsSubProduct))
            //          "variantsArray[index].[key]" = variantsSubProduct[key]
            // }
             });
            // debugger;
        }

        debugger;
        if(info.id){
            dispatch(updateProduct(info.id, product, idSubProducts));
        } else {
            dispatch(submitProduct(product, productsList));
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
    let variantsArrayProduct = [];
    if (values) {
        variantsArrayProduct = values.get('variantsArray');
        variantsArray = values.get('ProductVariants');
        variants = values.get('variants') ? values.get('variants') : {};
    }

    return {
        variantsArrayProduct,
        variantsArray,
        variants,
        variantError: state.get('variantError'),
        info: state.getIn([ 'updateProduct', 'product' ]) ? state.getIn([ 'updateProduct', 'product' ]) : {} ,
        products: state.get('products'),
        subProducts: state.getIn([ 'updateProduct', 'subProducts' ]) ? state.getIn([ 'updateProduct', 'subProducts' ]) : Immutable.Map() ,
    }

}

export default connect(getValues)(SimpleFormContainer);