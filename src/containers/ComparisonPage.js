import React, { Component } from 'react'

import Button from '../components/Button'
import Input from '../components/Input'
import ComparisonItem from '../components/ComparisonItem'

class ComparisonPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fields: [
                {
                    id: 1,
                    param: "prod_id",
                    type: "text",
                    placeholder: "ID of the Production Application",
                },
                {
                    id: 2,
                    param: "sand_id",
                    type: "text",
                    placeholder: "ID of the Sandbox Application",
                }
            ],
            params: {},
            loading: false,
            data: {},
        }
        this.renderComparisons = this.renderComparisons.bind(this)
    }

    compare(obj) {

        let params = ''

        for (const key in obj) {
            if (!params) {
                params += '?' + key + '=' + obj[key]
            }
            else {
                params += '&' + key + '=' + obj[key]
            }
        }

        this.setState({ loading: true })
        const fetchHeaders = {
          Accept: '*/*',
        }

        fetch('https://izberg-automation-api.herokuapp.com/api/setting_comparison/' + params, {
            method:'GET',
            mode: 'no-cors',
            headers: fetchHeaders
        })
        .then((res) => res.json())
        .then((responseJson) => {
            this.setState({
                loading: false,
                data: responseJson,
            })
        })
        .catch((error) => {
            console.error(error)
        })
    }

    renderInputs() {
        return this.state.fields.map( field => {
            const param = field.param
            return <Input key={ field.id } placeholder={ field.placeholder } type={ field.type } onChange={ this.handleChange.bind(this, param) } />
        })
    }

    handleChange(input, e) {
        this.setState({
            params: {
                ...this.state.params,
                [input] : e
            },
        })
    }

    renderComparisons() {
        if (Object.keys(this.state.data).length === 0) {
            return (
                <div className="pre-launched">
                    Launch the script to display diff
                </div>
            )
        }
        else {
            return Object.keys(this.state.data).map((key, index) => {
                if (this.state.data[key].equal === false) {
                    return <ComparisonItem key={ index } title={ key } production={ this.state.data[key].production } sandbox={ this.state.data[key].sandbox } />
                }
                else {
                    return <ComparisonItem key={ index } title={ key } />
                }
            })
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="script-params">
                    { this.renderInputs() }
                    <Button label="Launch script" loading={ this.state.loading } onClick={ () => this.compare(this.state.params) } />
                </div>
                <div className="script-results">
                    { this.renderComparisons() }
                </div>
            </div>
        )
    }
}

export default ComparisonPage
