import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { fetchProducts } from '../actions';
import { Link } from 'react-router-dom'
import { Button, Col } from 'reactstrap';

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

const DetailsButton = ({value, griddleKey, rowData}) =>
	(
		<Link  to={`/Detalles/${ rowData.name }`}>
			<Button type="button">
				<i className="fa fa-th-list"/> Detalles
			</Button>
		</Link>
	)

class PublicList extends Component {
	componentWillMount() {
		const { props: { dispatch } } = this;
		dispatch(fetchProducts());
	}
	render() {
		const { props: { products } } = this;

		const listProducts = products.filter(product => product.get('parent') === null );

		return (

			<div className="pull-center">
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
						<ColumnDefinition id="details" title="Detalles del Producto"  customComponent={enhancedWithRowData(DetailsButton)}
						/>
					</RowDefinition>
				</Griddle>
			</div>
		);
	}
}

export default connect(selector)(PublicList);