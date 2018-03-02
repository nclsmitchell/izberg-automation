import { combineReducers } from 'redux';
import chart from './chart';
import compare from './compare';
import exporter from './exporter';

export default combineReducers({
	chart,
	compare,
	exporter,
});
