import React from 'react';
import classNames from 'classnames';
import ReactLoading from 'react-loading';
import '../css/button.css';

const Button = props => {
	const { label, active, loading, onClick } = props;

	const btnClass = classNames({
		btn: true,
		main: true,
		active: active,
	});

	let innerLabel = label;
	if (active) {
		innerLabel = 'Re-' + label.toLowerCase();
	}

	return (
		<button className={btnClass} onClick={onClick}>
			{loading ? (
				<div>
					<ReactLoading
						className="loader"
						type="spin"
						width="13"
						height="13"
					/>
					<span>Loading</span>
				</div>
			) : (
				innerLabel
			)}
		</button>
	);
};

export default Button;
