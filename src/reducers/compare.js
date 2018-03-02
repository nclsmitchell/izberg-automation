import { COMPARE_LOADING, COMPARE_SUCCESS, COMPARE_ERROR } from '../actions';

const initialState = {
	data: {},
	active: false,
	loading: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case COMPARE_LOADING:
			return {
				...state,
				active: true,
				loading: true,
			};
		case COMPARE_SUCCESS:
			return {
				...state,
				data: action.data,
				loading: false,
			};
		case COMPARE_ERROR:
			return {
				...state,
				data: {},
				loading: false,
			};
		default:
			return state;
	}
}
