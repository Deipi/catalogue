import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { fetchProducts, currentProduct } from '../actions';
import { Link } from 'react-router-dom'
import { Button, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';

const rowDataSelector = (state, { griddleKey }) => {
	return state
	.get('data')
	.find(rowMap => rowMap.get('griddleKey') === griddleKey)
	.toJSON();
};

const enhancedWithRowData = connect((state, props) => {
	return {
		rowData: rowDataSelector(state, props)
	};
});


const selector = state => ({
	products: state.get('products'),
})
const NewLayout = ({Table,Filter,Pagination }) => (
	<div>
		<Filter/>
		<Table />
		<Pagination />
	</div>
);

const EditButton = (currentProduct) => (props) => <Link to="/Nuevo Producto" ><Button onClick={ () => currentProduct(props.value) } type="button"><i className="fa fa-pencil"/> Editar</Button></Link>
const DetailsButton = ({value, griddleKey, rowData}) =>
	(
		<Link  to={`/Detalles/${ rowData.name }`}>
			<Button type="button">
				<i className="fa fa-th-list"/> Detalles
			</Button>
		</Link>
	)

class ProductsList extends Component {
	constructor(props) {
		super(props);
		this.currentProduct = this.currentProduct.bind(this);
		this.cleanProduct = this.cleanProduct.bind(this);
	}

	currentProduct(value) {
		const { dispatch, products } = this.props;

		const product = products.filter(product => product.get('id') === value);

		dispatch(currentProduct(product.toJS()[0]));
	}

	cleanProduct() {
		const { dispatch } = this.props;

		dispatch({
			type: 'CLEAN_PRODUCT',
			payload: {},
		});
	}

	componentWillMount() {
		const { props: { dispatch } } = this;
		dispatch(fetchProducts());
	}
	render() {
		const { props: { products } } = this;

		const listProducts = products.filter(product => product.get('parent') === 0 );

		return (

			<div className="pull-center">
				<Breadcrumb tag="nav">
					<Link to="/">
				    	<BreadcrumbItem tag="a">Inicio</BreadcrumbItem>
				    </Link>
					<BreadcrumbItem active tag="span">/Listado del Administrador</BreadcrumbItem>
				</Breadcrumb>
				<div>
					<Link to="/Nuevo Producto" >
						<Button type="button" onClick={ this.cleanProduct } >
							<i className="fa fa-plus"/>
							Nuevo Producto
						</Button>
					</Link>
				</div>
				<Col >
					<Griddle
						data={listProducts.toJS()}
						plugins={[plugins.LocalPlugin]}
						styleConfig={{classNames:
						{ Table: 'table table-striped',} }}
						components={{
						Layout: NewLayout }}
					>
						<RowDefinition>
							<ColumnDefinition id="name" title="Nombre"  />
							<ColumnDefinition id="description" title="Descrición"  />
							<ColumnDefinition id="code" title="Código" />
							<ColumnDefinition id="amount" title="Precio" />
							<ColumnDefinition id="id" title="Editar Producto"  customComponent={ EditButton(this.currentProduct) }/>
							<ColumnDefinition id="details" title="Detalles del Producto"  customComponent={enhancedWithRowData(DetailsButton)}
							/>
						</RowDefinition>
					</Griddle>
				</Col>
			</div>
		);
	}
}

export default connect(selector)(ProductsList);