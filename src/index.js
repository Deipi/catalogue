import 'bootstrap/dist/css/bootstrap.css'
import Insertar from './containers/products-form'
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './Styles/src_IndexStyle.css'

import immutable from 'immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import employesReducer from './reducers/products';


const initialState = immutable.Map();

const rootReducer = combineReducers({
    form: formReducer,
});


const routes = [

  { path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Hola</h2>
  },

  { path: '/listado',
    exact: true,
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>listado</h2>
  },
  { path: '/Nuevo Producto',
    sidebar: () => <div>shoelaces!</div>,
    main: () => <Insertar />
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
                                <Link to="/listado" className="Menu">Lista de Productos</Link>
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
                    ))}
                  </div>
                </div>
            </App>
        </Router>
    </Provider>,
  document.getElementById('root')
);
