// Formsy.js
import React from 'react';
import Input from 'components/Input/Input';
import ReactGA from 'react-ga';

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
        fieldActive: true
      });
    }
  };
  // to deactivate input only if it's empty
  disableField = e => {
    if (
      this.props.values.why &&
      // WIPE whyDetails after changing to another radio
      this.props.values.why !== 'inny' &&
      this.props.name === 'why' &&
      this.props.values.whyDetails
    ) {
      this.props.setFieldValue(this.props.name + 'Details', '', true);
    }
    if (this.props.type === 'checkbox') {
      if (this.props.name === 'consent' && e.currentTarget.value) {
        ReactGA.event({
          category: 'consentBetaTest',
          action: 'true'
        });
      }
      // checkbox onBlurHandle
      if (!this.props.values[this.props.name]) {
        this.setState({
          fieldActive: false
        });
      } else {
        this.activateField(e);
      }
    } else {
      ReactGA.event({
        category: this.props.name,
        action: e.currentTarget.value
      });
      // Radio onBlurHandle
      if (this.props.values[this.props.name] !== this.state.fieldValue) {
        this.setState({
          fieldActive: false
        });
      } else {
        this.activateField(e);
      }
      this.props.onChange(e);
      this.props.onBlur(e);
    }
  };

  changeValue = e => {
    this.setState({ fieldValue: e.currentTarget.value });
    this.activateField();
    this.props.onChange(e);
    if (this.props.values.why && this.props.values.why !== 'inny' && this.props.name === 'why') {
      this.props.setFieldValue(this.props.name + 'Details', '', true);
    }
    if (e.currentTarget.value !== 'inny') {
      if (this.props.nextPage) {
        this.props.nextPage();
      }
    }
  };
  componentWillUpdate() {
    if (this.props.type === 'checkbox') {
      if (!this.props.values[this.props.name] && this.state.fieldActive) {
        this.setState({
          fieldActive: false
        });
      }
    } else {
      if (this.props.values) {
        if (
          this.props.values[this.props.name] !== this.state.fieldValue &&
          this.state.fieldActive
        ) {
          this.setState({
            fieldActive: false
          });
        }
      }
    }
  }
  // focus text input
  focus = () => {
    setTimeout(() => {
      this.textInput.current.focus();
    }, 10);
  };
  ownWillHandler = () => {
    if (this.props.ownWillHandler && this.props.ownWill) {
      this.props.ownWillHandler(true);
    }
  };

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
    if (this.props.labelType === 'text') {
      return (
        <label
          htmlFor={this.props.id}
          className={[
            this.state.fieldActive ? 'focus' : '',
            'radioBundle position-relative pb-1 form-control'
          ].join(' ')}
        >
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
          {this.state.fieldActive ? (
            <span className="pl-2 ">
              <small>
                <Input
                  refName={this.textInput}
                  className="radio-input"
                  placeholder="Jaki? :"
                  onChange={this.props.onChange}
                  type={this.props.labelType || 'text'}
                  name={this.props.name + 'Details'}
                  id={this.props.name + 'Details'}
                  value={this.state.otherFieldValue}
                  onBlur={this.props.onBlur}
                  values={this.props.values}
                  nextPage={this.props.nextPage}
                />
              </small>
            </span>
          ) : (
            <span className="label-radio pl-2 ">
              {this.props.icon} <small>{this.props.label}</small>
            </span>
          )}
        </label>
      );
    } else {
      return (
        <label
          htmlFor={this.props.id}
          className={[
            errorBorder,
            this.state.fieldActive ? 'focus' : '',
            'radioBundle position-relative pb-1 form-control'
          ].join(' ')}
        >
          <input
            ref={this.props.name}
            className="radio"
            onChange={this.changeValue}
            type={this.props.type || 'radio'}
            name={this.props.name}
            onClick={this.ownWillHandler}
            value={this.props.value || ''}
            onBlur={this.disableField}
            hidden={this.props.hidden}
            required={this.props.required}
            // checked={this.props.checked === true? true : false}
          />
          <span className="label-radio pl-1 ">
            {this.props.icon}{' '}
            <small className={errorText}>
              {this.props.label}
              {this.props.link ? (
                <ReactGA.OutboundLink
                  eventLabel="Check Privacy"
                  to="http://www.zabilet.pl/policy"
                  target="_blank"
                >
                  {this.props.link}
                </ReactGA.OutboundLink>
              ) : (
                ''
              )}
            </small>
          </span>
        </label>
      );
    }
  }
}

export default Radio;
