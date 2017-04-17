
export const POSTED_PRODUCT = 'POSTED_PRODUCT';


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
