// Formsy.js
import React from 'react';
import ReactSelect from 'react-select';

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.activateField = this.activateField.bind(this);
    this.disableField = this.disableField.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
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
    if (e.target.value === "") {
      this.setState({
        fieldActive: false
      })
    }
    this.props.onBlur(e)
  }

  changeValue(e) {
    this.activateField(e)
    this.props.onChange(e)
  }

  // handleEnter = (event) => {
  //   if (event.keyCode === 13) {
  //     const form = event.target.form;
  //     const index = Array.prototype.indexOf.call(form, event.target);
  //     form.elements[index + 1].focus();
  //     event.preventDefault();
  //   }
  // }

  render() {
    let errorText = ''
    let errorBorder = ''
    if (this.props.error) {
      errorText = 'invalid-text'
      errorBorder = 'invalid-border'
    } else if (!this.props.error && this.props.touched) {
      errorText = 'valid-text'
      errorBorder = 'valid-border'
    }


    return (
      <div className={[errorBorder, "form-group mt-4 position-relative"].join(' ')} >
        <label htmlFor={this.props.id} className={[errorText, this.state.fieldActive ? "field-active label" : "label"].join(' ')}>
          {this.props.label}
        </label>
        <ReactSelect
          onKeyDown={this.handleEnter}
          ref={this.props.name}
          className={[errorBorder, "floating-label form-control"].join(' ')}
          id={this.props.id}
          onChange={this.changeValue}
          type={this.props.type || 'text'}
          name={this.props.id}
          value={this.props.value || ''}
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

export default Select;