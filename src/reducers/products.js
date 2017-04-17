import { fromJS } from 'immutable';
import { POSTED_PRODUCT } from '../actions';

export default (state=fromJS([]), action) => {
	switch(action.type) {
		case POSTED_PRODUCT:
			return state.merge(fromJS([action.payload]));		
		default:
			return state;
	}
}