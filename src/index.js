import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import immutable from 'immutable';

import { combineReducers } from 'redux-immutable';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form/immutable'

import App from './App';


import './index.css';

import employesReducer from './reducers/products';

const initialState = immutable.Map();

const rootReducer = combineReducers({
	form: formReducer,
	products: employesReducer,
});

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={ store }>
  		<App />
  	</Provider>,
  document.getElementById('root')
);
