import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {

    render() {
        return(
            <div>
                <header className="header">
                    <img src={ require('../img/logo-izberg-automation.png') } alt="IZEBERG scripts" />
                </header>
                <nav>
                    <ul>
                        <li><Link to="/">Exports</Link></li>
                        <li><Link to="/update">Update</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}


export default Header
