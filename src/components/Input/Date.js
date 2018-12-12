// Formsy.js
import React from 'react';
import DatePicker from 'react-datepicker';
import windowSize from 'react-window-size';

import 'react-datepicker/dist/react-datepicker.css';

import ReactGA from 'react-ga';

let ua = window.navigator.userAgent;
let iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
let webkit = !!ua.match(/WebKit/i);
let iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

let isSafari = navigator.userAgent.indexOf('Safari') > -1;

let isDeskSafari = isSafari && !iOSSafari;
let isFirefox = typeof InstallTrigger !== 'undefined';
class DateSelect extends React.Component {
  constructor(props) {
    super(props);
    this.activateField = this.activateField.bind(this);
    this.disableField = this.disableField.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      date: this.getDate('today'),
      fieldActive: false,
      dateObject: new Date()
    };
  }

  getDate = val => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (val === 'today') {
      let yyyy = today.getFullYear();
      return yyyy + '-' + mm + '-' + dd;
    } else if (val === 'min') {
      let yyyy = today.getFullYear() - 3; // substract 3 years to get expiration date
      return yyyy + '-' + mm + '-' + dd;
    } else if (val === 'minObject') {
      let yyyy = today.getFullYear() - 3; // substract 3 years to get expiration date
      let date = yyyy + ' ' + mm + ' ' + dd;
      return new Date(date);
    } else {
      return null;
    }
  };
  // to activate the input field while typing
  activateField(e) {
    ReactGA.event({
      category: 'Form Input',
      action: 'Clicked date'
    });
    this.setState({
      fieldActive: true
    });
  }
  // to deactivate input only if it's empty
  disableField() {
    this.props.onBlur(this.state.date);
  }

  changeValue(e) {
    let date;
    if (!e.currentTarget) {
      date = e;
      if (true) {
        let dd = date.getDate();
        let mm = date.getMonth() + 1; //January is 0!
        let yyyy = date.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        date = yyyy + '-' + mm + '-' + dd;
        this.setState({
          date: date,
          dateObject: e
        });
        this.props.setFieldValue(this.props.name, date, true);
        this.props.setFieldValue('dateObject', e, true);
      }
    } else {
      this.setState({
        date: e.currentTarget.value,
        dateObject: e.currentTarget.valueAsDate
      });
      this.props.setFieldValue(this.props.name, e.currentTarget.value, true);
      this.props.setFieldValue('dateObject', e.currentTarget.valueAsDate, true);
    }
    this.activateField(e);

    // if (this.props.nextPage &&
    //   typeof e.currentTarget.value !== 'undefined' &&
    //   typeof this.props.error === 'undefined') {
    //   this.props.nextPage()
    //   document.getElementById(this.props.name).blur()
    // }
  }

  handleEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();

      if (this.props.nextPage && !this.props.values[this.props.name] && !this.props.error) {
        this.props.nextPage();
        document.getElementById(this.props.name).blur();
      }
    }
  };

  componentDidMount() {
    this.props.setFieldValue(this.props.name, this.getDate('today'), true);
    this.props.setFieldValue('dateObject', new Date(), true);
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
    let errorText = '';
    let errorBorder = '';
    if (this.props.error) {
      errorText = 'invalid-text';
      errorBorder = 'invalid-border';
    } else if (!this.props.error && this.props.touched) {
      errorText = 'valid-text';
      errorBorder = 'valid-border';
    }
    let Datepicker;

    if ((isDeskSafari || isFirefox) && this.props.windowWidth > 600) {
      // if ((this.refs.date && this.refs.date.type !== 'date') && this.props.windowWidth > 600) {
      Datepicker = (
        <DatePicker
          selected={this.state.dateObject}
          onKeyDown={this.handleEnter}
          minDate={this.getDate('minObject')}
          maxDate={new Date()}
          onChange={this.changeValue}
          // value={this.state.dateObject || ''}
          showYearDropdown
          dateFormat="dd/MM/yyyy"
          onFocus={this.activateField}
          onBlur={this.disableField}
          withPortal={this.props.windowWidth > 600 ? false : true}
          showDisabledMonthNavigation
          ref={this.props.name}
          id={this.props.name}
          type={this.props.type || 'date'}
          name={this.props.name}
          className={[errorBorder, 'floating-label form-control'].join(' ')}
        />
      );
    } else {
      Datepicker = (
        <input
          // onKeyDown={this.handleEnter}
          ref={this.props.name}
          className={[errorBorder, 'floating-label form-control'].join(' ')}
          pattern={'DD/MM/YYYY'}
          id={this.props.name}
          min={this.getDate('min')}
          max={this.getDate('today')}
          onChange={this.changeValue}
          type={this.props.type || 'date'}
          name={this.props.name}
          value={this.state.date || ''}
          onFocus={this.activateField}
          onBlur={this.disableField}
          placeholder="Podaj datę"
        />
      );
    }

    return (
      <div className={[errorBorder, 'form-group mt-3 position-relative'].join(' ')}>
        <label htmlFor={this.props.name} className={[errorText, 'label field-active'].join(' ')}>
          {this.props.label}
        </label>
        {Datepicker}
        <small className="form-text text-muted">{this.props.placeholder}</small>
        {this.props.error ? <div className={errorText}>{this.props.error}</div> : null}
      </div>
    );
  }
}

export default windowSize(DateSelect);
