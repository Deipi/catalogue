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
        const { products, match: { params: { name } } } = nextProps;

        this.setState({
            product: products.find((h)=> h.getIn(['name'])===name)
        });
    }

    render() {
        const { state: { product } } = this;
        if(product) {
            return (
                <div key={product.get('id')}>
                <div><Link to="/listado">Listado de Productos </Link>
                /{product.get('name')}
                </div>
                    <div>
                        <p> {product.get('name')}</p>
                    </div>

                </div>
            );
        }
        return null;
    };
}

export default connect(selector)(ProductDetail);