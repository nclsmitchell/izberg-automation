import React, { Component } from 'react'

class Button extends Component {

    render() {
        const label = this.props.label

        return (
          <button className="btn main" onClick={this.props.onClick}>{label}</button>
        )
    }
}

export default Button
