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
                    description: "A list of the Mapper errors for a specific transformation log ID",
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
                    description: "A list of the items contained in a specific channel",
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
                    label: "Merchant export",
                    description: "A list of all application merchants, including their merchant groups",
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
                    description: "A list of all application merchants and the state of their KYCs in Hipay",
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
        return this.state.scripts.map( script => <Script key={ script.id } label={ script.label } description={ script.description } fields={ script.fields } route={ script.route } />)
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
