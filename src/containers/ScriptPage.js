import React, { Component } from 'react'

import Script from '../components/Script'

class ScriptPage extends Component {

    constructor(props) {
        super(props)
        this.renderScripts = this.renderScripts.bind(this)
        this.state = {
            scripts: [
                {
                    id: 1,
                    label: "Error export",
                    placeholder: "Transformation log ID",
                    route: "transformation_log",
                },
                {
                    id: 2,
                    label: "Channel item export",
                    placeholder: "Channel ID",
                    route: "channel_item",
                },
                {
                    id: 3,
                    label: "Application merchant export",
                    placeholder: "Application ID",
                    route: "application_merchant",
                }
            ]
        }
    }

    renderScripts() {
        return this.state.scripts.map( script => <Script key={ script.id } label={ script.label } placeholder={ script.placeholder } route={ script.route } />)
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
