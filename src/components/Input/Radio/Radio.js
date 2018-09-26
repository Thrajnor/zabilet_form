// Formsy.js
import React from 'react';

class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldActive: false,
      fieldValue: '',
    };
  }
  // to activate the input field while typing
  activateField = () => {
    if (!this.state.fieldActive) {
      this.setState({
        fieldActive: true
      })
    }
  }
  // to deactivate input only if it's empty
  disableField = (e) => {
    if (typeof (this.props.values.why) !== 'undefined'
      // WIPE whyDetails after changing to another radio
      && this.props.values.why !== 'other'
      && this.props.name === 'why'
      && this.props.values.whyDetails !== '') {
      this.props.setFieldValue(this.props.name + 'Details', '', true)
    }
    if (this.props.type === 'checkbox') {
      // checkbox onBlurHandle
      if (!this.props.values[this.props.name]) {
        this.setState({
          fieldActive: false
        })
      } else {
        this.activateField(e)
      }
    } else {
      // Radio onBlurHandle
      if (this.props.values[this.props.name] !== this.state.fieldValue) {
        this.setState({
          fieldActive: false
        })
      } else {
        this.activateField(e)
      }
      this.props.onBlur(e)
    }
  }

  changeValue = (e) => {
    this.setState({ fieldValue: e.currentTarget.value })
    this.activateField()
    this.props.onChange(e)
    if (typeof (this.props.values.why) !== 'undefined'
      && this.props.values.why !== 'other'
      && this.props.name === 'why') {
      this.props.setFieldValue(this.props.name + 'Details', '', true)
    }
  }
  changeDetailValue = (e) => {
    this.props.onChange(e)
  }
  componentWillUpdate() {
    if (this.props.type === 'checkbox') {
      if (!this.props.values[this.props.name] && this.state.fieldActive) {
        this.setState({
          fieldActive: false
        })
      }
    } else {
      if (typeof this.props.values !== 'undefined') {
        if (this.props.values[this.props.name] !== this.state.fieldValue && this.state.fieldActive) {
          this.setState({
            fieldActive: false
          })
        }
      }
    }
  }

  render() {

    if (this.props.labelType === 'text') {
      return (
        <label htmlFor={this.props.id} className={[this.state.fieldActive ? 'focus' : '', "radioBundle position-relative pb-1 form-control"].join(' ')}>
          <input
            ref={this.props.name}
            className="radio"
            onChange={this.changeValue}
            type={this.props.type || 'radio'}
            name={this.props.name}
            value={this.props.value || ''}
            onBlur={this.disableField}
          />
          {this.state.fieldActive ?
            (<span className='pl-1 '><small>
              <input
                ref={this.props.name + 'Details'}
                className="radio-input"
                placeholder='Jaki? :'
                onChange={this.changeDetailValue}
                type={this.props.labelType || 'text'}
                name={this.props.name + 'Details'}
                value={this.props.values[this.props.name + 'Details'] || ''}
              />
            </small></span>)
            :
            (<span className='label-radio pl-1 '>{this.props.icon} <small>{this.props.label}</small></span>)
          }
        </label>
      )
    } else {
      return (
        <label htmlFor={this.props.id} className={[this.state.fieldActive ? 'focus' : '', "radioBundle position-relative pb-1 form-control"].join(' ')}>
          <input
            ref={this.props.name}
            className="radio"
            onChange={this.changeValue}
            type={this.props.type || 'radio'}
            name={this.props.name}
            value={this.props.value || ''}
            onBlur={this.disableField}
            hidden={this.props.hidden}
          // checked={this.props.checked === true? true : false}
          />
          <span className='label-radio pl-1 '>{this.props.icon} <small>{this.props.label}</small></span>
        </label>
      );
    }
  }
}

export default Radio;