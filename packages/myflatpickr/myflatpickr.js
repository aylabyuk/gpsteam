import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Flatpickr from 'flatpickr'
import { TextField } from 'material-ui'

import '../../public/css/custom_flatpicker.css'

const hooks = [
  'onChange',
  'onOpen',
  'onClose',
  'onMonthChange',
  'onYearChange',
  'onReady',
  'onValueUpdate',
  'onDayCreate'
]

class DateTimePicker extends Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    options: PropTypes.object,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onMonthChange: PropTypes.func,
    onYearChange: PropTypes.func,
    onReady: PropTypes.func,
    onValueUpdate: PropTypes.func,
    onDayCreate: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    children: PropTypes.node
  }

  static defaultProps = {
    options: {}
  }

  componentWillReceiveProps(props) {
    const { options } = props

    if (props.hasOwnProperty('value')) {
      window.flatpickr.setDate(props.value, false)
    }

    // Add prop hooks to options
    for (let hook of hooks) {
      if (props[hook]) {
        options[hook] = props[hook]
      }
    }

    const optionsKeys = Object.getOwnPropertyNames(props.options)

    for (let index = optionsKeys.length - 1; index >= 0; index--) {
      const key = optionsKeys[index]
      let value = props.options[key]

      // Hook handlers must be set as an array
      if (hooks.indexOf(key) !== -1 && !Array.isArray(value)) {
        value = [value]
      }

      window.flatpickr.set(key, value)
    }
  }

  componentDidMount() {
    const options = {
      onClose: () => {
        this.node.blur && this.node.blur()
      },
      ...this.props.options
    }

    // Add prop hooks to options
    for (let hook of hooks) {
      if (this.props[hook]) {
        options[hook] = this.props[hook]
      }
    }

    window.flatpickr = new Flatpickr(this.node.input, options)

    if (this.props.hasOwnProperty('value')) {
      window.flatpickr.setDate(this.props.value, false)
    }

  }

  componentWillUnmount() {
    window.flatpickr.destroy()
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { fullWidth, onChange, floatingLabelText, options, defaultValue, value, children, ...props } = this.props

    // Don't pass hooks to dom node
    for (let hook of hooks) {
      delete props[hook]
    }

    return options.wrap
      ? (
        <div {...props} ref={node => { this.node = node }}>
          { children }
        </div>
      )
      : (
        <TextField id='dp' floatingLabelText={floatingLabelText} fullWidth={fullWidth} {...props} defaultValue={defaultValue}
          ref={node => { 
              this.node = node
              window.node = node

              document.getElementById('dp').addEventListener("change", (e)=> {
                if(e.target.value != "") {
                  window.node.setState({ hasValue: true })
                }
              })
          }}
          floatingLabelFixed />
      )
  }
}

export default DateTimePicker