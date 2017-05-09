import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { fetchProducts } from '../actions';
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';

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

const EditButton = ({value})=><Link to="/Nuevo Producto" ><Button type="button"><i className="fa fa-pencil"/> Editar</Button></Link>
const AddButton = ({value})=><Link to="/Nuevo Producto" ><Button type="button"><i className="fa fa-plus"/> Nuevo</Button></Link>
const DetailsButton = value =>
	(
		<Link  to={`/Detalles/${ value.value }`}>
			<Button type="button">
				<i className="fa fa-th-list"/> Detalles
			</Button>
		</Link>
	)

class ProductsList extends Component {
	componentWillMount() {
		const { props: { dispatch } } = this;
		dispatch(fetchProducts());
	}
	render() {

		const { props: { products } } = this;
		return (

			<div>
				<Griddle
					data={products.toJS()}
					plugins={[plugins.LocalPlugin]}
					styleConfig={{classNames:
					{ Table: 'table table-striped',} }}
					components={{
					Layout: NewLayout }}
				>
					<RowDefinition>
						<ColumnDefinition id="name" title="Nombre" order={1} />
						<ColumnDefinition id="description" title="Descrición" order={2} />
						<ColumnDefinition id="code" title="Código" order={3}/>
						<ColumnDefinition id="amount" title="Precio" order={4}/>
						<ColumnDefinition id="edit" title="Editar Producto" order={5} customComponent={EditButton}/>
						<ColumnDefinition id="add" title="Agregar Producto" order={6} customComponent={AddButton}/>
						<ColumnDefinition id="name" title="Detalles del Producto" order={7} customComponent={DetailsButton}
						/>
					</RowDefinition>
				</Griddle>
			</div>
		);
	}
}

export default connect(selector)(ProductsList);