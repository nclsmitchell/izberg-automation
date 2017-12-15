import React, { Component } from 'react'

import ScriptPage from '../containers/ScriptPage'

class ExportPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            scripts: [
                {
                    id: 1,
                    label: "Error export",
                    description: "A list of the Mapper errors for a specific transformation log ID",
                    fields: [
                        {
                           id: 0,
                           param: "authorization",
                           type: "text",
                           placeholder: "IZBERG token",
                        },
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
                           id: 0,
                           param: "authorization",
                           type: "text",
                           placeholder: "IZBERG token",
                        },
                        {
                            id: 1,
                            param: "id",
                            type: "text",
                            placeholder: "Channel ID",
                        },
                        {
                            id: 2,
                            param: "merchant_id",
                            type: "text",
                            placeholder: "Merchant ID (facultative)",
                        },
                    ],
                    route: "channel_item",
                },
                {
                    id: 3,
                    label: "Merchant export",
                    description: "A list of all application merchants, including their merchant groups",
                    fields: [
                        {
                           id: 0,
                           param: "authorization",
                           type: "text",
                           placeholder: "IZBERG token",
                        },
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
                           id: 0,
                           param: "authorization",
                           type: "text",
                           placeholder: "IZBERG token",
                        },
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

    render() {
        return (
            <div className="wrapper">
                <ScriptPage scripts={ this.state.scripts } />
            </div>
        )
    }
}

export default ExportPage
