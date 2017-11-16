import React, { Component } from 'react'
import ReactLoading from 'react-loading'

class Button extends Component {

    render() {
        const label = this.props.label
        const loading = this.props.loading

        if (loading) {
          return (
              <button className="btn main" onClick={this.props.onClick}><ReactLoading className="loader" type="spin" width="13" height="13" /><span>Loading</span></button>
          )
        }
        else {
            return (
              <button className="btn main" onClick={this.props.onClick}>{label}</button>
            )
        }
    }
}

export default Button
