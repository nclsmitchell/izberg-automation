import React, { Component } from 'react'

class ComparisonItem extends Component {

    render() {
        const production = this.props.production
        const sandbox = this.props.sandbox

        if (production != null || sandbox != null) {
            return (
                <div className="comparison-item">
                    <h2>{ this.props.title }</h2>
                    <span className="identical">Identical</span>
                    <div className="container">
                        <span><strong>Production:</strong> { production }</span>
                        <span>||</span>
                        <span><strong>Sandbox:</strong> { sandbox }</span>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="comparison-item equal">
                    <h2>{ this.props.title }</h2>
                    <span className="identical">Identical</span>
                </div>
            )
        }
    }
}

export default ComparisonItem
