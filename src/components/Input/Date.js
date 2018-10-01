// Formsy.js
import React from 'react';
import DatePicker from 'react-datepicker';
import windowSize from 'react-window-size';
import moment from 'moment';

import 'moment/locale/pl';

import 'react-datepicker/dist/react-datepicker.css';
let ua = window.navigator.userAgent;
let iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
let webkit = !!ua.match(/WebKit/i);
let iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

let isSafari = navigator.userAgent.indexOf("Safari") > -1

let isDeskSafari = (isSafari && !iOSSafari)
let isFirefox = typeof InstallTrigger !== 'undefined';
class Date extends React.Component {
  constructor(props) {
    super(props);
    this.activateField = this.activateField.bind(this);
    this.disableField = this.disableField.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
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
    if ((isDeskSafari || isFirefox) && this.props.windowWidth > 600) {
      this.setState({
        date: e.format('LL')
      });
      this.props.setFieldValue(this.props.name, e.format('YYYY-MM-DD'), true)
    } else {
      this.setState({
        date: e.currentTarget.value
      });
      this.props.setFieldValue(this.props.name, e.currentTarget.value, true)
    }
    this.activateField(e)

    // if (this.props.nextPage &&
    //   typeof e.currentTarget.value !== 'undefined' &&
    //   typeof this.props.error === 'undefined') {
    //   this.props.nextPage()
    //   document.getElementById(this.props.name).blur()
    // }
  }

  handleEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      if (this.props.nextPage &&
        typeof this.props.values[this.props.name] !== 'undefined' &&
        typeof this.props.error === 'undefined') {
        this.props.nextPage()
        document.getElementById(this.props.name).blur()
      }
    }
  }

  componentDidMount() {
    if ((isDeskSafari || isFirefox) && this.props.windowWidth > 600) {
      console.log(moment().format('YYYY-MM-DD'))
      this.props.setFieldValue(this.props.name, moment().format('YYYY-MM-DD'), true)
    }
    this.props.setFieldValue('consent', false, true)
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
    let Datepicker

    if ((isDeskSafari || isFirefox) && this.props.windowWidth > 600) {
      Datepicker = (
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
        />)
    } else {
      Datepicker = (
        <input
          // onKeyDown={this.handleEnter}
          ref={this.props.name}
          className={[errorBorder, "floating-label form-control"].join(' ')}
          id={this.props.name}
          onChange={this.changeValue}
          type={this.props.type || 'date'}
          name={this.props.name}
          value={this.state.date || ''}
          onFocus={this.activateField}
          onBlur={this.disableField}
          placeholder="YYYY-MM-DD"
        />)
    }

    return (
      <div className={[errorBorder, "form-group mt-3 position-relative"].join(' ')} >
        <label htmlFor={this.props.name} className={[errorText, "label field-active"].join(' ')}>
          {this.props.label}
        </label>
        {Datepicker}
        <small className="form-text text-muted">{this.props.placeholder}</small>
        {this.props.error ? <div className={errorText}>{this.props.error}</div> : null}
      </div>
    );
  }
}

export default windowSize(Date);