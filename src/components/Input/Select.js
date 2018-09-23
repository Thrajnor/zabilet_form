// Formsy.js
import React from 'react';
import ReactSelect from 'react-select';

const customStyles = {
  menu: (base) => ({
    ...base,
    top: '100%',
    backgroundColor: 'hsl(0, 0%, 100%)',
    borderRadius: '4px',
    boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
    marginBottom: '8px',
    marginTop: '0px',
    position: 'absolute',
    width: '100%',
    overflow: 'auto',
    zIndex: '10000',
    boxSizing: 'border-box',
  }),
  menuList: (base) => ({
    ...base,
    height: '40vh',
    overflow: 'auto'
  }),
  option: (base) => ({
    ...base,
    marginTop: '0',
    zIndex: '10',
  })
}

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


    return (
      <div>
        <label htmlFor={this.props.id} className={[this.state.fieldActive ? "field-active label" : "label"].join(' ')}>
          {this.props.label}
        </label>
        <ReactSelect
          styles={customStyles}
          onKeyDown={this.handleEnter}
          ref={this.props.name}
          className={["floating-label"].join(' ')}
          id={this.props.id}
          onChange={this.changeValue}
          type={this.props.type || 'text'}
          name={this.props.id}
          value={this.props.value || ''}
          hidden={this.props.hidden}
          onFocus={this.activateField}
          onBlur={this.disableField}
          options={this.props.options}
          placeholder={this.state.fieldActive ? this.props.placeholder : null}
        />
      </ div>
    );
  }
}

export default Select;