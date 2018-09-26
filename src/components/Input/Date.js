// Formsy.js
import React from 'react';
import DatePicker from 'react-datepicker';
import windowSize from 'react-window-size';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'moment/locale/pl';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.activateField = this.activateField.bind(this);
    this.disableField = this.disableField.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      date: moment().format('LL'),
      fieldActive: false
    };
  }
  // to activate the input field while typing
  activateField() {
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
    this.setState({
      date: e.format('LL')
    });
    this.activateField(e)
    this.props.setFieldValue(this.props.name, e.format(), true)
    // this.props.onChange(e)
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
    moment().locale('pl')

    return (
      <div className={[errorBorder, "form-group mt-3 position-relative"].join(' ')} >
        <label htmlFor={this.props.name} className={[errorText, this.state.fieldActive ? "label field-active" : "label"].join(' ')}>
          {this.props.label}
        </label>
        <DatePicker
          selected={this.state.startDate}
          onKeyDown={this.handleEnter}
          ref={this.props.name}
          className={[errorBorder, "floating-label form-control"].join(' ')}
          id={this.props.name}
          onChange={this.changeValue}
          type={this.props.type || 'date'}
          name={this.props.name}
          value={this.state.date || ''}
          onFocus={this.activateField}
          onBlur={this.disableField}
          withPortal={this.props.windowWidth > 600 ? false : true}
        />
        {/* <input
          // onKeyDown={this.handleEnter}
          ref={this.props.name}
          className={[errorBorder, "floating-label form-control"].join(' ')}
          id={this.props.name}
          onChange={this.changeValue}
          type={this.props.type || 'date'}
          name={this.props.name}
          value={this.props.value || ''}
          hidden={this.props.hidden}
          onFocus={this.activateField}
          onBlur={this.disableField}
          placeholder={' '}
        /> */}
        <small className="form-text text-muted">{this.props.placeholder}</small>
        {this.props.error ? <div className={errorText}>{this.props.error}</div> : null}
      </div>
    );
  }
}

export default windowSize(Input);