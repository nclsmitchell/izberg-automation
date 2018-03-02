const SCRIPT_API_URL = 'https://izberg-automation-api.herokuapp.com/api';
const CHARTING_API_URL = 'https://app.logmatic.io/beta/saved_analyses';
const CHARTING_API_KEY = '0jEwu7PkSyOFMxOUMpBlFQ';

const BACKGROUND_COLOR = [
	'rgba(255, 99, 132, 1)',
	'rgba(54, 162, 235, 1)',
	'rgba(255, 206, 86, 1)',
];

const EXPORT_CONFIG = [
	{
		id: 1,
		label: 'Error export',
		description:
			'A list of the Mapper errors for a specific transformation log ID',
		fields: [
			{
				id: 0,
				param: 'authorization',
				type: 'text',
				placeholder: 'IZBERG token',
			},
			{
				id: 1,
				param: 'id',
				type: 'text',
				placeholder: 'Transformation log ID',
			},
		],
		route: 'transformation_log',
	},
	{
		id: 2,
		label: 'Payment inconsistency export',
		description:
			'A list of the payment inconsistencies for a specific application',
		fields: [
			{
				id: 0,
				param: 'authorization',
				type: 'text',
				placeholder: 'IZBERG token',
			},
			{
				id: 1,
				param: 'id',
				type: 'text',
				placeholder: 'Application ID',
			},
		],
		route: 'inconsistency',
	},
	{
		id: 3,
		label: 'Channel item export',
		description: 'A list of the items contained in a specific channel',
		fields: [
			{
				id: 0,
				param: 'authorization',
				type: 'text',
				placeholder: 'IZBERG token',
			},
			{
				id: 1,
				param: 'id',
				type: 'text',
				placeholder: 'Channel ID',
			},
			{
				id: 2,
				param: 'merchant_id',
				type: 'text',
				placeholder: 'Merchant ID (facultative)',
			},
		],
		route: 'channel_item',
	},
	{
		id: 4,
		label: 'Merchant export',
		description:
			'A list of all application merchants, including their merchant groups',
		fields: [
			{
				id: 0,
				param: 'authorization',
				type: 'text',
				placeholder: 'IZBERG token',
			},
			{
				id: 1,
				param: 'id',
				type: 'text',
				placeholder: 'Application ID',
			},
		],
		route: 'application_merchant',
	},
	{
		id: 5,
		label: 'Hipay merchant export',
		description:
			'A list of all application merchants and the state of their KYCs in Hipay',
		fields: [
			{
				id: 0,
				param: 'authorization',
				type: 'text',
				placeholder: 'IZBERG token',
			},
			{
				id: 1,
				param: 'id',
				type: 'text',
				placeholder: 'Application ID',
			},
			{
				id: 2,
				param: 'hipay_username',
				type: 'text',
				placeholder: 'Hipay Username',
			},
			{
				id: 3,
				param: 'hipay_password',
				type: 'text',
				placeholder: 'Hipay Password',
			},
		],
		route: 'hipay_merchant',
	},
];

const UPDATE_CONFIG = [
	{
		id: 1,
		label: 'Images migration',
		description:
			'Migrate all images of the channel items from `assigned_images` to `images`',
		fields: [
			{
				id: 0,
				param: 'authorisation',
				type: 'text',
				placeholder: 'IZBERG token',
			},
			{
				id: 1,
				param: 'id',
				type: 'text',
				placeholder: 'Channel ID',
			},
		],
		route: 'image_migration',
	},
];

const COMPARE_CONFIG = [
	{
		id: 1,
		param: 'prod_id',
		type: 'text',
		placeholder: 'ID of the Production Application',
	},
	{
		id: 2,
		param: 'sand_id',
		type: 'text',
		placeholder: 'ID of the Sandbox Application',
	},
];

export {
	SCRIPT_API_URL,
	CHARTING_API_URL,
	CHARTING_API_KEY,
	BACKGROUND_COLOR,
	EXPORT_CONFIG,
	UPDATE_CONFIG,
	COMPARE_CONFIG,
};
