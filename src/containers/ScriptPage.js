import React, { Component } from 'react'

import Script from '../components/Script'

class ScriptPage extends Component {

    constructor(props) {
        super(props)
        this.renderScripts = this.renderScripts.bind(this)
    }

    renderScripts() {
        return this.props.scripts.map( script => <Script key={ script.id } label={ script.label } description={ script.description } fields={ script.fields } route={ script.route } />)
    }

    render() {
        return (
            <div>
                { this.renderScripts() }
            </div>
        )
    }
}

export default ScriptPage
