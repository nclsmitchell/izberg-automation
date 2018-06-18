import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { exporter } from '../actions';

import '../css/script.css';

import Button from '../components/Button';
import Download from '../components/Download';
import Input from '../components/Input';

class Script extends Component {
	state = {
		params: {},
	};

	export = (id, route) => {
		const { exporter } = this.props;
		const { params } = this.state;
		exporter(id, route, params);
	};

	renderInputs = () =>
		this.props.fields.map(field => {
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
			file: {},
		});
	};

	render() {
		const { description, file, id, label, loading, route } = this.props;
		const { active, file_href } = file;

		return (
			<div className="script-item">
				<h2>{label}</h2>
				<p>{description}</p>
				<div className="checkout-form">
					{this.renderInputs()}
					<div className="launch-script">
						<Button
							label="Launch script"
							active={active}
							loading={loading}
							onClick={() => this.export(id, route)}
						/>
						<Download active={active} href={file_href} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { exporter } = state;
	return {
		file: exporter[ownProps.id].file,
		loading: exporter[ownProps.id].loading,
	};
};

const mapDispatchToProps = dispatch => bindActionCreators({ exporter }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Script);
