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
                    fields: [
                        {
                            id: 1,
                            param: "id",
                            type: "text",
                            placeholder: "Transformation log ID",
                        }
                    ],
                    route: "transformation_log",
                },
                {
                    id: 2,
                    label: "Channel item export",
                    fields: [
                        {
                            id: 1,
                            param: "id",
                            type: "text",
                            placeholder: "Channel ID",
                        }
                    ],
                    route: "channel_item",
                },
                {
                    id: 3,
                    label: "Application merchant export",
                    fields: [
                        {
                            id: 1,
                            param: "id",
                            type: "text",
                            placeholder: "Application ID",
                        }
                    ],
                    route: "application_merchant",
                },
                {
                    id: 4,
                    label: "Hipay merchant export",
                    fields: [
                        {
                            id: 1,
                            param: "id",
                            type: "text",
                            placeholder: "Application ID",
                        },
                        {
                            id: 2,
                            param: "hipay_username",
                            type: "text",
                            placeholder: "Hipay Username",
                        },
                        {
                            id: 3,
                            param: "hipay_password",
                            type: "text",
                            placeholder: "Hipay Password",
                        },
                    ],
                    route: "hipay_merchant",
                }
            ]
        }
    }

    renderScripts() {
        return this.state.scripts.map( script => <Script key={ script.id } label={ script.label } fields={ script.fields } route={ script.route } />)
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
