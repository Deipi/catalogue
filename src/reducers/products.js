import { fromJS } from 'immutable';
import { POSTED_PRODUCT, FETCHED_PRODUCTS } from '../actions';

export default (state=fromJS([]), action) => {
	switch(action.type) {
		case POSTED_PRODUCT:
			return state.merge(fromJS([action.payload]));
		case FETCHED_PRODUCTS:
			return fromJS(action.payload);
		default:
			return state;
	}
}