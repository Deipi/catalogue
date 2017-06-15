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
import ProductLogin from './containers/products-login'
import NewUser from './containers/new-user'
import ListaProductosAdministrador from './containers/products-list-admin'
import ListaProductosPublico from './containers/products-list-public'
import DetailProducts from './containers/Details';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container,Row } from 'reactstrap';

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
	main: () => <h2><ProductLogin/></h2>
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
  },
  {path: '/Registrar/',
	sidebar: () => <div>Register!</div>,
	main: ()=> <NewUser/>,
  }
]


class Menu extends React.Component {

	constructor(props) {
	super(props);

	this.toggle = this.toggle.bind(this);
	this.state = {
	  isOpen: false
	};
  }
  toggle() {
	this.setState({
	  isOpen: !this.state.isOpen
	});
  }
	render(){
		const { props: { dispatch } } = this;
		return(
			<div>
				<Navbar style={{'background-color':'#F2F2F2'}} light toggleable>
					<NavbarToggler right onClick={this.toggle} />
					<NavbarBrand>
						<Link
							style={{'color':'#666666'}}
							to="/Listado" >
							<i className="fa fa-th-list fa-fw"></i>
							Productos
						</Link>
					</NavbarBrand>
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto fa-1x" navbar>
							<NavItem >
								<NavLink>
									<Link style={{'color':'#666666'}} to="/" >
										<i className="fa fa-sign-in fa-fw"></i>
										Login
									</Link>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink>
									<Link
										style={{'color':'#666666'}}
										to="/ListadoAdmin">
										<i className="fa fa-wrench fa-fw"></i>
										Administrar Productos
									</Link>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink>
									<Link
										style={{'color':'#666666'}}
										onClick={ () => dispatch({ type: 'CLEAN_PRODUCT', payload: {} }) }
										to="/Nuevo Producto" >
										<i className="fa fa-fw fa-plus-circle"></i>
										Nuevo Producto
									</Link>
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
				<Row>
					<h5 className="mx-auto">
						<i className="fa fa-shopping-bag fa-spin text-info" aria-hidden="true"/>
						{'  '}
						<strong>Catálogo de Productos</strong>
					</h5>
				</Row>
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
