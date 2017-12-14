import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {

    render() {
        return(
            <div>
                <header className="header">
                    <img src={ require('../img/logo-izberg-backoffice-staff.png') } alt="IZBERG scripts" />
                </header>
                <nav>
                    <ul>
                        <li><Link to="/">Exports</Link></li>
                        <li><Link to="/update">Update</Link></li>
                        <li><Link to="/compare">Compare</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}


export default Header
