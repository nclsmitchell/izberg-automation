import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

const Header = () => (
	<div>
    <header className="header">
     <img src={ require('../img/logo-izberg-backoffice-staff.png') } alt="IZBERG scripts" />
    </header>
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
