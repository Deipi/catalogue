import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { fetchProducts, currentProduct, deleteProduct } from '../actions';
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

const EditButton = (currentProduct) => (props) =>(
	<Link to="/Nuevo Producto" >
		<Button style={{width: '4em'}} color="success" onClick={ () => currentProduct(props.value) } type="button">
			<i className="fa fa-pencil"/>
		</Button>
	</Link>
	)

const DeleteButton =(deleteProduct)=>({rowData}) =>
	(
		<Button style={{width: '4em'}} color="danger" onClick={ () => deleteProduct(rowData.id) } type="button">
			<i className="fa fa-trash "/>
		</Button>
	)


const DetailsButton = ({value, griddleKey, rowData}) =>
	(
		<Link  to={`/Detalles/${ rowData.name }`}>
			<Button style={{width: '4em'}} color="warning" type="button">
				<i className="fa fa-info-circle"/>
			</Button>
		</Link>
	)

class ProductsList extends Component {
	constructor(props) {
		super(props);
		this.currentProduct = this.currentProduct.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.cleanProduct = this.cleanProduct.bind(this);
	}

	currentProduct(value) {
		const { dispatch, products } = this.props;
		const product = products.filter(product => product.get('id') === value);
		dispatch({
					type: 'CLEAN_PRODUCT',
					payload: {},
				});
		dispatch(currentProduct(product.toJS()[0]));
	}
	deleteProduct(value) {
		const { dispatch, products } = this.props;
		const subProductsList = products.filter(product => product.get('parent') === value);
		dispatch(deleteProduct(value, subProductsList.toJS()));
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
		const CustomColumn = ({value}) => <p style={{width: '4em'}}>{value}</p>;

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
							<i className="fa fa-plus"/> Nuevo Producto</Button>
					</Link>
				</div>
				<br/>
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
							<ColumnDefinition
								title=" "
								customComponent={ () =>
									<img
										src="http://www.technologyace.com/wp-content/uploads/2017/03/iPhone-8Is-1.jpg"
										width="	75"
									/>}
							/>
							<ColumnDefinition
								id="name"
								title="Nombre"
								customComponent={CustomColumn}
							/>
							<ColumnDefinition
								id="description"
								title="Descrición"
								customComponent={CustomColumn}
								/>
							<ColumnDefinition
								id="code"
								title="Código"
								customComponent={CustomColumn}
								/>
							<ColumnDefinition
								id="amount"
								title="Precio"
								customComponent={CustomColumn}
								/>
							<ColumnDefinition
								id="id"
								title="Editar"
								customComponent={EditButton(this.currentProduct)}/>
							<ColumnDefinition
								id="details"
								title="Detalles"
								customComponent={enhancedWithRowData(DetailsButton)}/>
							<ColumnDefinition
								id="delete"
								title="Eliminar"
								customComponent={enhancedWithRowData(DeleteButton(this.deleteProduct))}/>
						</RowDefinition>
					</Griddle>
				</Col>
			</div>
		);
	}
}

export default connect(selector)(ProductsList);