import React from 'react';

import ScriptPage from '../containers/ScriptPage';
import { UPDATE_CONFIG } from '../_config';

const UpdatePage = () => (
	<div className="wrapper">
		<ScriptPage scripts={UPDATE_CONFIG} />
	</div>
);

export default UpdatePage;
