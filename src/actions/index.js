import queryString from 'query-string';
import {
	SCRIPT_API_URL,
	CHARTING_API_URL,
	CHARTING_API_KEY,
	BACKGROUND_COLOR,
} from '../_config';
//import { DATA } from '../_dev';

export const EXPORT_LOADING = 'EXPORT_LOADING';
export const EXPORT_ERROR = 'EXPORT_ERROR';
export const EXPORT_SUCCESS = 'EXPORT_SUCCESS';

export const COMPARE_LOADING = 'COMPARE_LOADING';
export const COMPARE_ERROR = 'EXPORT_ERROR';
export const COMPARE_SUCCESS = 'EXPORT_SUCCESS';

export const CHART_LOADING = 'CHART_LOADING';
export const CHART_ERROR = 'CHART_ERROR';
export const CHART_SUCCESS = 'CHART_SUCCESS';

const exporter = (id, route, obj) => async dispatch => {
	try {
		const fetchHeaders = {
			Accept: '*/*',
			Authorization: obj['authorization'],
		};
		delete obj['authorization'];
		const params = queryString.stringify(obj);

		dispatch({
			type: EXPORT_LOADING,
			id,
		});

		const res = await fetch(`${SCRIPT_API_URL}/${route}/?${params}`, {
			method: 'GET',
			mode: 'cors',
			headers: fetchHeaders,
		});

		if (!res.ok) {
			console.error(res);
			dispatch({
				type: EXPORT_ERROR,
				id,
				data: '',
			});
		} else {
			if (route === 'channel_item' && obj.merchant_id !== '') {
				route = `${SCRIPT_API_URL}/download/merchant_${
					obj.merchant_id
				}_items`;
			} else {
				route = `${SCRIPT_API_URL}/download/${route}_${obj.id}`;
			}
			dispatch({
				type: EXPORT_SUCCESS,
				id,
				data: route,
			});
		}
	} catch (err) {
		console.error(err);
	}
};

const compare = obj => async dispatch => {
	try {
		const params = queryString.stringify(obj);

		dispatch({
			type: COMPARE_LOADING,
		});

		const res = await fetch(
			`${SCRIPT_API_URL}/setting_comparison/?${params}`
		);

		if (!res.ok) {
			console.error(res);
			dispatch({
				type: COMPARE_ERROR,
			});
		} else {
			const json = await res.json();
			dispatch({
				type: COMPARE_SUCCESS,
				data: json,
			});
		}
	} catch (err) {
		console.error(err);
	}
};

const chart = (id, analyse) => async dispatch => {
	try {
		const fetchHeaders = {
			Accept: '*/*',
			'x-api-key': CHARTING_API_KEY,
		};

		dispatch({
			type: CHART_LOADING,
			id,
		});

		const res = await fetch(`${CHARTING_API_URL}/${analyse}/execute/`, {
			method: 'POST',
			mode: 'cors',
			headers: fetchHeaders,
		});

		if (!res.ok) {
			console.error(res);
			dispatch({
				type: CHART_ERROR,
				id,
				datasets: [],
			});
		} else {
			const json = await res.json();
			//const json = DATA;

			dispatch({
				type: CHART_SUCCESS,
				id,
				datasets: formatFromLogmatics(json),
			});
		}
	} catch (err) {
		console.error(err);
	}
};

const formatFromLogmatics = json => {
	let datasets = [];
	let sandbox = {
		labels: [],
		data: [],
		backgroundColor: BACKGROUND_COLOR,
	};
	let production = {
		labels: [],
		data: [],
		backgroundColor: BACKGROUND_COLOR,
	};

	const arr = json.result.values;

	arr.forEach(elem => {
		switch (elem.fields.f1) {
			case 'sandbox':
				sandbox.labels.push('Sandbox ' + elem.fields.f0);
				sandbox.data.push(elem.metrics.m0);
				break;
			case 'production':
				production.labels.push('Production ' + elem.fields.f0);
				production.data.push(elem.metrics.m0);
				break;
			default:
				break;
		}
	});
	datasets.push(production, sandbox);
	return datasets;
};

export { exporter, compare, chart };
