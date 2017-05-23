import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchProducts } from '../actions';
import { Card, CardHeader, Row, Col, Table } from 'reactstrap';
import Slider from 'react-slick';

const Carousel =()=> {
    const imgs = [
        "http://www.technologyace.com/wp-content/uploads/2017/03/iPhone-8Is-1.jpg",
        "https://425degree-3eea.kxcdn.com/wp-content/uploads/2012/12/02-iphone-6s.jpg",
        "http://www.caotic.it/wp-content/uploads/2015/12/image-12.jpeg",
        "http://phone-probe.com/wp-content/uploads/2016/03/iPhone-7-feature-photo.png",
        "https://img3.ibxk.com.br/2016/09/07/07155210242767.jpg?w=700",
        "http://techadmy.com/wp-content/uploads/2017/04/Samsung-Galaxy-S8-vs-Apple-iPhone-7-Plus-3-2-840x560-700x300.jpg",
        "http://reparolaptop.mx/wp-content/uploads/2015/03/reparo-ipad-700x300.jpg",
        "http://www.bemovil.es/blog/wp-content/uploads/2015/02/arreglar-iphone-6.jpg",
        "http://www.skytells.net/en/wp-content/uploads/147-700x300.jpg",
    ];

    var settings = {
        arrows: false,
        accessibility:true,
        // dots: true,
        infinite: true,
        centerPadding: '500px',
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        dotsClass: 'slick-dots slick-thumb lateral-dots',
        customPaging: function(i) {
            return (
                <a><img src={ imgs[i] } /></a>
            )
        },
    };
    return (
        <div className="col-md-12">
            <Slider { ...settings }>
                {
                    imgs.map((img, index) => (
                        <div key={ `img-${ index }` } >
                            <img src={ img } alt='' />
                        </div>
                        )
                    )
                }
            </Slider>
        </div>
    );
}


const selector = state => ({
    products: state.get('products'),
})

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        const { products, match: { params: { name } } } = props;
        this.state = {
            product: products.filter((h)=> h.getIn(['name'])===name)
            //product: products.find((h)=> h.getIn(['name'])===name)
        };
    }

    componentWillMount() {
        const { props: { dispatch } } = this;
        dispatch(fetchProducts());
    }

    componentWillReceiveProps(nextProps) {
        const { products, match: { params: { name } } } = nextProps;

        this.setState({
            product: products.filter((h)=> h.getIn(['name'])===name)
        });
    }


    render() {
        const { state: { product } } = this;
        const { match: { params: { name } } } = this.props;
        const general = product.filter(l=>l.get('parent')==0)
        if(product) {
            return (
                <div key={product.get('id')}>
                <Row>
                </Row>
                <div><Link to="/listado">Listado de Productos </Link>
                /{name}
                </div>
                    <Row>
                        <Col md="8">
                            <Carousel/>
                        </Col>
                        <Col md="4">
                        {general.map(element=>
                            <div>
                                <div className="col-md-6">
                                    <h2>{element.get('name')}</h2>
                                    <p style={{opacity: '.50'}}>
                                        <h5>
                                            Código:{element.get('code')}
                                        </h5>
                                    </p>
                                </div>
                                <div>
                                    <h5 style={{opacity: '.50'}}>- - - - - - - - - - - - - - - - - - - - - - - - - - -</h5>
                                </div>
                                <div className="col-md-7">
                                    <h2>MXN {element.get('amount')}</h2>
                                    <h5>{element.get('description')}</h5>
                                </div>

                                <Table>
                                    <thead>
                                        <tr>
                                            <th>
                                            Subproductos
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {product.filter(l=>
                                            l.get('parent')>0).map(m=>(
                                                <div>
                                                    {m.get('variants').map(p=>
                                                        <td>
                                                            <span className="input-group-addon">{`${p} `}</span>
                                                        </td>
                                                    )}
                                                </div>
                                                )
                                            )
                                        }
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>)}
                        </Col>
                    </Row>
                </div>
            );
        }
        return null;
    };
}

export default connect(selector)(ProductDetail)