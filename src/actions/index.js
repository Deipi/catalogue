export const POSTED_PRODUCT = 'POSTED_PRODUCT';
export const FETCHED_PRODUCTS = 'FETCHED_PRODUCTS';
export const FETCHED_EDITED = 'FETCHED_EDITED';
export const UPDATE_PRODUCT = ''
export default (data, subproducts) => (dispatch, getStore) => fetch('http://localhost:3004/products', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(Object.assign({}, data, { parent: 0 }))
}).then( result => result.json().then( product => {

	subproducts.forEach(subProduct => fetch('http://localhost:3004/products', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(Object.assign({}, subProduct, { parent: product.id }))
	}));

	return dispatch({
		type: POSTED_PRODUCT,
		payload: product
	})
}));


export const fetchProducts = () => (dispatch, getStore) => fetch('http://localhost:3004/products', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	},
}).then( result => result.json().then( products => dispatch({
	type: FETCHED_PRODUCTS,
	payload: products
})));


export const currentProduct = product => (dispatch, getStore) => fetch(`http://localhost:3004/products?parante=${ product.id }`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	},
}).then( result => result.json().then( subProducts => dispatch({
	type: FETCHED_EDITED,
	payload: { product, subProducts }
})));



export const updateProduct = (id, data, subproducts) => (dispatch, getStore) => fetch(`http://localhost:3004/products/${ id }`, {
	method: 'PUT',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(Object.assign({}, data, { parent: 0 }))
}).then( result => result.json().then( product => {

	subproducts.forEach(subProduct => fetch(`http://localhost:3004/products/${ subproducts.id }`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(Object.assign({}, subProduct, { parent: product.id }))
	}));

	return dispatch({
		type: UPDATE_PRODUCT,
		payload: product
	})
}));