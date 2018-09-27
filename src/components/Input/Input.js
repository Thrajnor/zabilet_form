// Formsy.js
import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.activateField = this.activateField.bind(this);
    this.disableField = this.disableField.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      userInput: '',
      fieldActive: false
    };
  }
  // to activate the input field while typing
  activateField(e) {
    this.setState({
      fieldActive: true
    })
  }
  // to deactivate input only if it's empty
  disableField(e) {
    e.persist()
    if (e.target.value === "") {
      this.setState({
        fieldActive: false
      })
    }
    this.props.onChange(e)
    setTimeout(() => {
      this.props.onBlur(e)
    }, 10)
  }

  changeValue(e) {
    this.activateField(e)
    this.setState({
      userInput: e.currentTarget.value
    });
  }

  handleEnter = (event) => {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }

  render() {
    let errorText = ''
    let errorBorder = ''
    if (this.props.className === 'radio-input') {
      errorText = ''
      errorBorder = ''
      return (
        <input
          onKeyDown={this.handleEnter}
          ref={this.props.refName}
          className={this.props.className}
          onChange={this.changeValue}
          type={this.props.type || 'text'}
          name={this.props.name}
          value={this.state.userInput}
          hidden={this.props.hidden}
          onFocus={this.activateField}
          onBlur={this.disableField}
          placeholder={this.state.fieldActive ? this.props.placeholder : null}
        />)
    } else if (this.props.error) {
      errorText = 'invalid-text'
      errorBorder = 'invalid-border'
    } else if (!this.props.error && this.props.touched) {
      errorText = 'valid-text'
      errorBorder = 'valid-border'
    }


    return (
      <div className={[errorBorder, "form-group mt-3 position-relative"].join(' ')} >
        <label htmlFor={this.props.name} className={[errorText, this.state.fieldActive ? "field-active label" : "label"].join(' ')}>
          {this.props.label}
        </label>
        <input
          onKeyDown={this.handleEnter}
          ref={this.props.refName || this.props.name}
          id={this.props.name}
          className={this.props.className || [errorBorder, "floating-label form-control"].join(' ')}
          onChange={this.changeValue}
          type={this.props.type || 'text'}
          name={this.props.name}
          value={this.state.userInput}
          hidden={this.props.hidden}
          onFocus={this.activateField}
          onBlur={this.disableField}
          placeholder={this.state.fieldActive ? this.props.placeholder : null}
        />
        {this.props.error ? <div className={errorText}>{this.props.error}</div> : null}
      </ div>
    );
  }
}

export default Input;