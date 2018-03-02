import React, { Component } from 'react';
import '../css/input.css';

class Input extends Component {
	state = {
		value: '',
	};

	handleInputChange = e => {
		const { value } = e.target;
		this.setState({ value });
		this.props.onChange(value);
	};

	render = () => {
		const { placeholder, type } = this.props;
		const { value } = this.state;

		return (
			<div className="field-line">
				<input
					className="field-input"
					placeholder={placeholder}
					type={type}
					value={value}
					onChange={this.handleInputChange}
				/>
			</div>
		);
	};
}

export default Input;
