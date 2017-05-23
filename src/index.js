import React from 'react';
import ReactDOM from 'react-dom';
import immutable from 'immutable';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form/immutable';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import ProductsReducer, { errorVariantReducer, updateProduct } from './reducers/products';
import InsertarProductos from './containers/products-form'
import ListaProductosAdministrador from './containers/products-list-admin'
import ListaProductosPublico from './containers/products-list-public'
import DetailProducts from './containers/Details';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';

const initialState = immutable.Map();

const rootReducer = combineReducers({
	form: formReducer,
	products: ProductsReducer,
	variantError: errorVariantReducer,
	updateProduct: updateProduct,
});

const routes = [

  { path: '/',
	exact: true,
	sidebar: () => <div>home!</div>,
	main: () => <h2>Hola</h2>
  },

  { path: '/ListadoAdmin',
	exact: true,
	sidebar: () => <div>Adminlist!</div>,
	main: () => <ListaProductosAdministrador />
  },
  { path: '/Listado',
	exact: true,
	sidebar: () => <div>Publiclist!</div>,
	main: () => <ListaProductosPublico />
  },
  { path: '/Nuevo Producto',
	sidebar: () => <div>New Product!</div>,
	main: () => <InsertarProductos />
  },
  { path: '/Detalles/:name' ,
	sidebar: () => <div>Details!</div>,
	main: DetailProducts,
  }
]


class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = {
			collapsed: true
		};
	}

	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}
	render(){
		const { props: { dispatch } } = this;
		return(
			<div>
				<div>
					<Navbar color="faded" light>
					<NavbarToggler onClick={this.toggleNavbar} />
					<Collapse className="navbar-toggleable-md" isOpen={!this.state.collapsed}>
						<NavbarBrand><Link  to="/" >Inicio</Link></NavbarBrand>
						<Nav navbar>
							<NavItem>
								<NavLink><Link  to="/Listado" >Lista de Productos</Link></NavLink>
							</NavItem>
							<NavItem>
								<NavLink><Link to="/ListadoAdmin" >Lista de Productos(Administrador)</Link></NavLink>
							</NavItem>
							<NavItem>
								<NavLink><Link onClick={ () => dispatch({ type: 'CLEAN_PRODUCT', payload: {} }) } to="/Nuevo Producto" >Nuevo Producto</Link></NavLink>
							</NavItem>
						</Nav>
					</Collapse>
					</Navbar>
				</div>
			</div>
		);
	}
}

const MenuConnect = connect()(Menu);

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
ReactDOM.render(
	<Provider store={ store }>
		<Router>
			<App>
				<MenuConnect />
				<div>
				<Container className="mt-5">
					{routes.map((route, index) => (
							<Route
								key={index}
								path={route.path}
								exact={route.exact}
								component={route.main}
							/>
						)
					)}
					</Container>
				</div>
			</App>
		</Router>
	</Provider>,
	document.getElementById('root')
);
