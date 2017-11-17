import React, { Component } from 'react'

import ScriptPage from '../containers/ScriptPage'

class UpdatePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            scripts: [
                {
                    id: 1,
                    label: "Images migration",
                    description: "Migrate all images of the channel items from `assigned_images` to `images`",
                    fields: [
                        {
                            id: 1,
                            param: "id",
                            type: "text",
                            placeholder: "Channel ID",
                        }
                    ],
                    route: "image_migration",
                },
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

export default UpdatePage