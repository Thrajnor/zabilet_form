// Formsy.js
import React from 'react';
import Input from 'components/Input/Input'

class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      fieldActive: false,
      fieldValue: '',
      otherFieldValue: ''
    };
  }
  // to activate the input field while typing
  activateField = () => {
    if (!this.state.fieldActive) {
      this.setState({
        fieldActive: true,
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
      this.props.onChange(e)
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
    if (e.currentTarget.value !== 'other') {
      if (this.props.nextPage) {
        this.props.nextPage()
      }
    }
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
  // focus text input
  focus = () => {
    setTimeout(() => {
      this.textInput.current.focus()
    }, 10)
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
            onClick={this.focus}
            value={this.props.value || ''}
            onBlur={this.disableField}
          />
          {this.state.fieldActive ?
            (<span className='pl-2 '><small>
              <Input
                refName={this.textInput}
                className="radio-input"
                placeholder='Jaki? :'
                onChange={this.props.onChange}
                type={this.props.labelType || 'text'}
                name={this.props.name + 'Details'}
                id={this.props.name + 'Details'}
                value={this.state.otherFieldValue}
                onBlur={this.props.onBlur}
                values={this.props.values}
                nextPage={this.props.nextPage}
              />
            </small></span>)
            :
            (<span className='label-radio pl-2 '>{this.props.icon} <small>{this.props.label}</small></span>)
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