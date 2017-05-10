import Immutable, { fromJS } from 'immutable';
import { POSTED_PRODUCT } from '../actions';

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

export const errorVariantReducer = (state=fromJS(Immutable.Map()), action) => {
	switch(action.type) {
		case 'ERROR_IN_VARIANT':
			return Immutable.fromJS({ errorKey: action.payload });
		default:
			return state;
	}
}
