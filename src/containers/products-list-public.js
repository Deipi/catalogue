import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { fetchProducts } from '../actions';
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

const DetailsButton = ({value, griddleKey, rowData}) =>
	(
		<Link  to={`/Detalles/${ rowData.name }`}>
			<Button style={{width: '4em'}} color="warning" type="button">
				<i className="fa fa-info-circle "/>
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
		const CustomColumn = ({value}) => <p style={{width: '4em'}}>{value}</p>;

		const listProducts = products.filter(product => product.get('parent') === 0 );

		return (

			<div className="pull-center">
				<Breadcrumb tag="nav">
					<Link to="/">
						<BreadcrumbItem tag="a">Inicio</BreadcrumbItem>
					</Link>
					<BreadcrumbItem active tag="span">/Productos</BreadcrumbItem>
				</Breadcrumb>
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
									src="https://425degree-3eea.kxcdn.com/wp-content/uploads/2012/12/02-iphone-6s.jpg"
									width="75"
									heigth="75" />}
						/>
						<ColumnDefinition
							customComponent = {CustomColumn}
							id="name"
							title="Nombre"  />
						<ColumnDefinition
							customComponent = {CustomColumn}
							id="description"
							title="Descrición"  />
						<ColumnDefinition
							customComponent = {CustomColumn}
							id="code"
							title="Código" />
						<ColumnDefinition
							customComponent = {CustomColumn}
							id="amount"
							title="Precio" />
						<ColumnDefinition
							id="details"
							title="Detalles"
							customComponent={enhancedWithRowData(DetailsButton)}/>
					</RowDefinition>
				</Griddle>
			</div>
		);
	}
}

export default connect(selector)(PublicList);