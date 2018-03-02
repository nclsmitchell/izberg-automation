import React from 'react';

import ScriptPage from '../containers/ScriptPage';
import { EXPORT_CONFIG } from '../_config';

const ExportPage = () => (
	<div className="wrapper">
		<ScriptPage scripts={EXPORT_CONFIG} />
	</div>
);

export default ExportPage;
