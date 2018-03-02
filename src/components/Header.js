import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

const Header = () => (
	<div>
		<nav>
			<ul>
				<li>
					<Link to="/automation/">Dashboard</Link>
				</li>
				<li>
					<Link to="/automation/export">Export</Link>
				</li>
				<li>
					<Link to="/automation/update">Update</Link>
				</li>
				<li>
					<Link to="/automation/compare">Compare</Link>
				</li>
			</ul>
		</nav>
	</div>
);

export default Header;
