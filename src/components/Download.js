import React from 'react';
import classNames from 'classnames';
import MdFileDownload from 'react-icons/lib/md/file-download';
import '../css/download.css';

const Download = props => {
	const { active, href } = props;

	const downloadClass = classNames({
		btn: true,
		download: true,
		active: active,
	});

	return (
		<a className={downloadClass} href={href}>
			<MdFileDownload />
		</a>
	);
};

export default Download;
