import React, { Component } from 'react'

class Header extends Component {

    render() {
        return(
            <div>
                <header className="header">
                    <img src={ require('../img/logo-izberg-automation.png') } alt="IZEBERG scripts" />
                </header>
                <nav>
                    <ul>
                        <li>Exports</li>
                    </ul>
                </nav>
            </div>
        )
    }
}


export default Header
