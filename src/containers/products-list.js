import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { fetchProducts } from '../actions';
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';

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

const EditButton = ({value})=><Link to="/Nuevo Producto" ><Button type="button"><i className="fa fa-pencil"/> Editar</Button></Link>
const AddButton = ({value})=><Link to="/Nuevo Producto" ><Button type="button"><i className="fa fa-plus"/> Nuevo</Button></Link>
const DetailsButton = ({value, griddleKey, rowData}) =>
	(
		<Link  to={`/Detalles/${ rowData.name }`}>
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
		let t=0
		const { props: { products } } = this;
		const S_Producto = products.map(
		  element =>(
			  <div>
				<p >nombre: {element.get(['name',])}</p>
				{t=t+1}
			  </div>
		  ));
		return (

			<div>
			{S_Producto}
				<Griddle
					data={products.toJS()}
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
						<ColumnDefinition id="edit" title="Editar Producto"  customComponent={EditButton}/>
						<ColumnDefinition id="add" title="Agregar Producto"  customComponent={AddButton}/>
						<ColumnDefinition id="details" title="Detalles del Producto"  customComponent={enhancedWithRowData(DetailsButton)}
						/>
					</RowDefinition>
				</Griddle>
			</div>
		);
	}
}

export default connect(selector)(ProductsList);