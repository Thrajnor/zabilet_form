// Formsy.js
import React from 'react';

class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.activateField = this.activateField.bind(this);
    this.disableField = this.disableField.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      fieldActive: false,
      fieldValue: ''
    };
  }
  // to activate the input field while typing
  activateField() {
    this.setState({
      fieldActive: true
    })
  }
  // to deactivate input only if it's empty
  disableField() {
    this.setState({
      fieldActive: false
    })
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    console.log(event.currentTarget.value)
    this.props.setValue(event.currentTarget.value);
    // this.setState({ fieldValue: event.currentTarget.value }, function () {
    //   console.log(event.currentTarget.value)
    //   console.log(this === This)
    // })
    this.activateField()
  }

  render() {
    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage();

    return (
      <label htmlFor={this.props.getValue()} className={[!this.state.fieldActive === false ? 'focus' : '', "radioBundle position-relative pb-1 form-control"].join(' ')}>
        <input
          className="radio"
          id={this.props.getValue()}
          onChange={this.changeValue}
          type={this.props.type || 'radio'}
          name={this.props.name}
          value={this.props.getValue() || ''}
          onBlur={this.disableField}
          hidden={this.props.hidden}
        // checked={this.props.checked === true? true : false}
        />
        <label htmlFor={this.props.getValue()} className='label-radio pl-3'>
          {this.props.label}
        </label>
        <span>{errorMessage}</span>
      </label>
    );
  }
}

export default Radio;