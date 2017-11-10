import React, { Component } from 'react'

class Input extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: ''
        };
    }

    handleInputChange(e) {
        this.setState({ value: e.target.value })
        const new_value = e.target.value
        this.props.onChange(new_value)
    }

    render() {

        const placeholder = this.props.placeholder
        const type = this.props.type

        return (
            <div className="field-line">
                <input className="field-input"
                    placeholder={ placeholder }
                    type={ type }
                    value={ this.state.value }
                    onChange={ this.handleInputChange.bind(this) }
                />
            </div>
        )
    }
}

export default Input
