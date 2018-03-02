import { CHART_LOADING, CHART_SUCCESS, CHART_ERROR } from '../actions';

let initialState = {};

for (let i = 1; i <= 1; i++) {
	initialState[i] = {
		datasets: [],
		loading: false,
	};
}

export default function(state = initialState, action) {
	switch (action.type) {
		case CHART_LOADING:
			return {
				...state,
				[action.id]: {
					loading: true,
				},
			};
		case CHART_SUCCESS:
			return {
				...state,
				[action.id]: {
					datasets: action.datasets,
					loading: false,
				},
			};
		case CHART_ERROR:
			return {
				...state,
				[action.id]: {
					datasets: [],
					loading: false,
				},
			};
		default:
			return state;
	}
}
