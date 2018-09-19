// Formsy.js
import { withFormsy } from 'formsy-react';
import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.activateField = this.activateField.bind(this);
    this.disableField = this.disableField.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      inputValue: '',
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
  }
  // to update the changes in the input and activate it
  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value,
    });
    this.activateField(e);
    e.preventDefault();
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
    this.updateInputValue(event)
  }

  render() {
    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage();

    return (
      <div className={["form-group mt-4 position-relative", this.props.type === 'date' ? 'date' : ''].join(' ')} >
        <label htmlFor={this.props.name} className={[this.state.fieldActive ? "field-active" : "", this.props.type === 'date' ? '' : 'label'].join[' ']}>
          {this.props.label}
        </label>
        <input
          className="floating-label form-control"
          id={this.props.name}
          onChange={this.changeValue}
          type={this.props.type || 'text'}
          name={this.props.name}
          value={this.props.getValue() || ''}
          hidden={this.props.hidden}
          onFocus={this.activateField}
          onBlur={this.disableField}
        />
        <small className="form-text text-muted">{this.props.placeholder}</small>
        <span>{errorMessage}</span>
      </ div>
    );
  }
}

export default withFormsy(Input);