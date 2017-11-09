import React, { Component } from 'react'

import ScriptPage from '../containers/ScriptPage'

class HomePage extends Component {

    render() {
        return (
            <div className="wrapper">
                <ScriptPage label="Tansformation log ID" params="transformation_log_id" />
            </div>
        )
    }
}

export default HomePage
