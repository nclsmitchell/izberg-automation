import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compare } from '../actions';

import Button from '../components/Button';
import Input from '../components/Input';
import ComparisonItem from '../components/ComparisonItem';

import '../css/comparisonPage.css';
import { COMPARE_CONFIG } from '../_config';

class ComparisonPage extends Component {
	state = {
		fields: COMPARE_CONFIG,
		params: {},
	};

	compare = () => {
		const { compare } = this.props;
		const { params } = this.state;
		compare(params);
	};

	renderInputs = () =>
		this.state.fields.map(field => {
			const { id, param, placeholder, type } = field;
			return (
				<Input
					key={id}
					placeholder={placeholder}
					type={type}
					onChange={this.handleChange.bind(this, param)}
				/>
			);
		});

	handleChange = (input, e) => {
		this.setState({
			params: {
				...this.state.params,
				[input]: e,
			},
		});
	};

	renderComparisons = () => {
		const { data } = this.props;
		if (!Object.keys(data).length) {
			return (
				<div className="pre-launched">
					Launch the script to display diff
				</div>
			);
		}
		return (
			<div className="script-results">
				{Object.keys(data).map((key, index) => {
					const row = data[key];
					if (!row.equal) {
						return (
							<ComparisonItem
								key={index}
								title={key}
								production={row.production}
								sandbox={row.sandbox}
							/>
						);
					} else {
						return <ComparisonItem key={index} title={key} />;
					}
				})}
			</div>
		);
	};

	render = () => {
		const { active, loading } = this.props;

		return (
			<div className="wrapper">
				<div className="script-params">
					{this.renderInputs()}
					<Button
						label="Launch script"
						active={active}
						loading={loading}
						onClick={() => this.compare()}
					/>
				</div>
				{this.renderComparisons()}
			</div>
		);
	};
}

const mstp = state => {
	const { active, data, loading } = state.compare;
	return {
		data,
		active,
		loading,
	};
};

const mdtp = dispatch => bindActionCreators({ compare }, dispatch);

export default connect(mstp, mdtp)(ComparisonPage);
