import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { chart } from '../actions';
import Chart from 'chart.js';

import '../css/metric.css';

class Metric extends Component {
	componentDidMount = () => {
		const { id, analyse, chart } = this.props;
		chart(id, analyse);
	};

	componentDidUpdate = () => {
		const { datasets } = this.props;

		if (this.canvas && datasets && datasets.length) {
			this.renderChart();
		}
	};

	renderChart = () => {
		const { type, datasets } = this.props;
		const ctx = this.canvas.getContext('2d');
		return (
			new Chart(ctx, {
				type,
				data: {
					datasets,
				},
				options: {
					legend: {
						display: true,
						position: 'bottom',
					},
					tooltips: {
						callbacks: {
							label: (tooltipItem, data) => {
								const dataset =
									data.datasets[tooltipItem.datasetIndex];
								const index = tooltipItem.index;
								return (
									dataset.labels[index] +
									': ' +
									dataset.data[index]
								);
							},
						},
					},
				},
			})
		);
	};

	render = () => {
		const { title } = this.props;

		return (
			<div className="chart">
				<h2>{title}</h2>
				<canvas
					ref={canvas => {
						this.canvas = canvas;
					}}
				/>
			</div>
		);
	};
}

const mstp = (state, ownProps) => {
	return {
		datasets: state.chart[ownProps.id].datasets,
		loading: state.chart[ownProps.id].loading,
	};
};

const mdtp = dispatch => bindActionCreators({ chart }, dispatch);

export default connect(mstp, mdtp)(Metric);
