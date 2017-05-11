import React from 'react';
import ReactDOM from 'react-dom';
import immutable from 'immutable';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
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
import './Styles/src_IndexStyle.css'
import employesReducer, { errorVariantReducer } from './reducers/products';
import InsertarProductos from './containers/products-form'
import ListaProductosAdministrador from './containers/products-list-admin'
import ListaProductosPublico from './containers/products-list-public'
import DetailProducts from './containers/Details';

const initialState = immutable.Map();

const rootReducer = combineReducers({
	form: formReducer,
	products: employesReducer,
	variantError: errorVariantReducer,
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

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={ store }>
		<Router>
			<App>
				<div style={{ display: 'flex' }}>
					<div id="Links">
						<nav>
							<ul className="Opciones">
								<li className="anclaje">
									<div className="Barra"></div>
									<Link to="/" className="Menu">Inicio</Link>
								</li>

								<li className="anclaje">
									<div className="Barra"></div>
									<Link to="/Listado" className="Menu">Lista de Productos</Link>
								</li>

								<li className="anclaje">
									<div className="Barra"></div>
									<Link to="/ListadoAdmin" className="Menu">Lista de Productos(Administrador)</Link>
								</li>

								<li className="anclaje">
									<div className="Barra"></div>
									<Link to="/Nuevo Producto" className="Menu">Nuevo Producto</Link>
								</li>
							</ul>
						</nav>
					</div>

					<div id="Contenido" >
						{routes.map((route, index) => (
								<Route
									key={index}
									path={route.path}
									exact={route.exact}
									component={route.main}
								/>
							)
						)}
					</div>
				</div>
			</App>
		</Router>
	</Provider>,
	document.getElementById('root')
);
