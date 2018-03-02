import { EXPORT_CONFIG } from '../_config';

import { EXPORT_LOADING, EXPORT_SUCCESS, EXPORT_ERROR } from '../actions';

let initialState = {};

for (let i = 1; i <= EXPORT_CONFIG.length; i++) {
	initialState[i] = {
		file: {},
		loading: false,
	};
}

export default function(state = initialState, action) {
	console.log(action.type);
	switch (action.type) {
		case EXPORT_LOADING:
			return {
				...state,
				[action.id]: {
					file: {},
					loading: true,
				},
			};
		case EXPORT_SUCCESS:
			return {
				...state,
				[action.id]: {
					file: {
						active: true,
						file_href: action.data,
					},
					loading: false,
				},
			};
		case EXPORT_ERROR:
			return {
				...state,
				[action.id]: {
					file: {
						active: false,
					},
					loading: false,
				},
			};
		default:
			return state;
	}
}
