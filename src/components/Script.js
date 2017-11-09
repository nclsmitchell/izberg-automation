import React, { Component } from 'react'

import Button from '../components/Button'
import Download from '../components/Download'

class Script extends Component {

  constructor(props) {
      super(props)
      this.state = {
          params: {
              id: '',
          },
          file: {}
      }
  }

  exporter(route, id) {
      fetch('http://192.168.103.223:5000/api/' + route + '/export/?id=' + id)
      .then((res) => res.text())
      .then((responseText) => {
          this.setState({ file: {
            active: true,
            file_href: 'http://192.168.103.223:5000/api/download/' + route + '_' + id,
          }})
      })
      .catch((error) => {
          console.error(error)
      })
  }

  handleInputChange(input, e) {
    this.setState({
      params: {
          ...this.state.params,
          [input] : e.target.value
      },
      file: {}
    })
  }

  render() {

      const label = this.props.label
      const placeholder = this.props.placeholder
      const route = this.props.route

      const active = this.state.file.active
      const href = this.state.file.file_href

      return (
          <div className="script-item">
              <h2>{ label }</h2>
              <div className="checkout-form">
                  <div className="field-line">
                      <input className="field-input"
                          placeholder={ placeholder }
                          type="text"
                          value={ this.state.params.id }
                          onChange={ this.handleInputChange.bind(this, 'id') }
                      />
                  </div>
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
