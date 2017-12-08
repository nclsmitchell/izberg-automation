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
          file: {},
          loading: false,
      }
  }

  exporter(route, obj) {

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
      fetch('http://192.168.103.206:5000/api/' + route + '/' + params)
      .then((res) => res.text())
      .then((responseText) => {

          if (route === 'channel_item' && obj.merchant_id !== '') {
              route = 'merchant_' + obj.merchant_id + '_items'
          }
          else {
              route = route + '_' + obj.id
          }

          this.setState({
              file: {
                active: true,
                file_href: 'http://192.168.103.206:5000/api/download/' + route,
              },
              loading: false,
          })
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
      const description = this.props.description
      const route = this.props.route

      const active = this.state.file.active
      const href = this.state.file.file_href

      return (
          <div className="script-item">
              <h2>{ label }</h2>
              <p>{ description }</p>
              <div className="checkout-form">
                  { this.renderInputs() }
                  <div className="launch-script">
                      <Button label="Launch script" loading={ this.state.loading } onClick={ () => this.exporter(route, this.state.params) } />
                      <Download active={ active } href={ href } />
                  </div>
              </div>
          </div>
      )
  }
}

export default Script
