import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom'

import { fetchProducts } from '../actions';

const selector = state => ({
    products: state.get('products'),
})

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        const { products, match: { params: { name } } } = props;
        this.state = {
            product: products.find((h)=> h.getIn(['name'])===name)
        };
    }

    componentWillMount() {
        const { props: { dispatch } } = this;
        dispatch(fetchProducts());
    }

    componentWillReceiveProps(nextProps) {
        const { Almacen, match: { params: { name } } } = nextProps;

        this.setState({
            product: Almacen.find((h)=> h.getIn(['name'])===name)
        });
    }

    render() {
        const { state: { product } } = this;
        if(product) {
            return (
                <div key={product.get('id')}>
                <div id="Migas"><Link className="enlace" to="/Todos_los_productos">listado /</Link>
                {product.get('name')}
                </div>

                    <div id="Detalles">
                        <p> {product.get('name')}</p>
                    </div>

                </div>
            );
        }
        return null;
    };
}

export default connect(selector)(ProductDetail);