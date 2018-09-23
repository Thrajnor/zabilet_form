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
  disableField(e) {
    // if(this.props.values.$(this.props.id))
    this.setState({
      fieldActive: false
    })
    this.props.onBlur(e)
  }

  changeValue(event) {
    this.activateField()
    this.props.onChange(event)
    // , () => {
    //   let value = 250
    //   if (this.props.values.why) {

    //   }
    //   this.props.compensation(value)
    // }
  }

  render() {

    return (
      <label htmlFor={this.props.id} className={[!this.state.fieldActive === false ? 'focus' : '', "radioBundle position-relative pb-1 form-control"].join(' ')}>
        <input
          ref={this.props.name}
          className="radio"
          id={this.props.id}
          onChange={this.changeValue}
          type={this.props.type || 'radio'}
          name={this.props.name}
          value={this.props.value || ''}
          onBlur={this.disableField}
          hidden={this.props.hidden}
        // checked={this.props.checked === true? true : false}
        />
        <span className='label-radio pl-3 pr-1'>{this.props.icon} {this.props.label}</span>
      </label>
    );
  }
}

export default Radio;