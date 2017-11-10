import React, { Component } from 'react'

import Button from '../components/Button'
import Download from '../components/Download'
import Input from '../components/Input'

class Script extends Component {

  constructor(props) {
      super(props)
      this.renderInputs = this.renderInputs.bind(this)
      this.state = {
          params: {},
          file: {}
      }
  }

  exporter(route, id) {
      fetch('http://192.168.103.62:5000/api/' + route + '/export/?id=' + id)
      .then((res) => res.text())
      .then((responseText) => {
          this.setState({ file: {
            active: true,
            file_href: 'http://192.168.103.62:5000/api/download/' + route + '_' + id,
          }})
      })
      .catch((error) => {
          console.error(error)
      })
  }

  renderInputs() {
      return this.props.fields.map( field => {
          const param = field.param
          return <Input key={ field.id } placeholder={ field.placeholder } type={ field.type } onChange={ this.handleChange.bind(this, param) } />
      })
  }

  handleChange(input, e) {
      console.log(input, e)
      this.setState({
          params: {
              ...this.state.params,
              [input] : e
          },
          file: {}
      })
  }

  render() {

      const label = this.props.label
      const route = this.props.route

      const active = this.state.file.active
      const href = this.state.file.file_href

      return (
          <div className="script-item">
              <h2>{ label }</h2>
              <div className="checkout-form">
                  { this.renderInputs() }
                  <div className="launch-script">
                      <Button label="Launch script" onClick={ () => this.exporter(route, this.state.params.id) } />
                      <Download active={ active } href={ href } />
                  </div>
              </div>
          </div>
      )
  }
}

export default Script
