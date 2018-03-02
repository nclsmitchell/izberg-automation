import React, { Component } from 'react';
import Script from '../components/Script';

class ScriptPage extends Component {
	renderScripts = () =>
		this.props.scripts.map(script => {
			const { description, fields, id, label, route } = script;
			return (
				<Script
					key={id}
					id={id}
					label={label}
					description={description}
					fields={fields}
					route={route}
				/>
			);
		});

	render = () => (
		<div className="script-container">{this.renderScripts()}</div>
	);
}

export default ScriptPage;
