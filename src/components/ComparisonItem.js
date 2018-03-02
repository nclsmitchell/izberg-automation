import React from 'react';
import classNames from 'classnames';
import '../css/comparisonItem.css';

const ComparisonItem = props => {
	const { title, production, sandbox } = props;

	const comparisonClass = classNames({
		'comparison-item': true,
		equal: !production && !sandbox,
	});

	return (
		<div className={comparisonClass}>
			<h2>{title}</h2>
			<span className="identical">Identical</span>
			{!production && !sandbox ? null : (
				<div className="container">
					<span>
						<strong>Production:</strong> {production}
					</span>
					<span>||</span>
					<span>
						<strong>Sandbox:</strong> {sandbox}
					</span>
				</div>
			)}
		</div>
	);
};

export default ComparisonItem;
