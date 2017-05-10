
export const POSTED_PRODUCT = 'POSTED_PRODUCT';
export const FETCHED_PRODUCTS = 'FETCHED_PRODUCTS';

export default data => (dispatch, getStore) => fetch('http://localhost:3004/products', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
}).then( result => result.json().then( product => dispatch({
	type: POSTED_PRODUCT,
	payload: product
})));

export const fetchProducts = () => (dispatch, getStore) => fetch('http://localhost:3004/products', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	},
}).then( result => result.json().then( products => dispatch({
	type: FETCHED_PRODUCTS,
	payload: products
})));
