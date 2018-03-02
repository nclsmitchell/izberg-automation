import React, { Component } from 'react';

import Metric from '../components/Metric';

import '../css/dashboard.css';

class Dashboard extends Component {
	render() {
		return (
			<div className="wrapper">
				<Metric
					id={1}
					type="doughnut"
					analyse="5a464c9e5b4fb7000906e60e"
					title="API errors"
				/>
			</div>
		);
	}
}

export default Dashboard;
