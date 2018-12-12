// Formsy.js
import React from 'react';
import ReactSelect from 'react-select';
import ReactGA from 'react-ga';

const customStyles = {
  noOptionsMessageCSS: base => ({
    ...base,
    height: 'auto'
  }),
  menu: base => ({
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
    boxSizing: 'border-box'
  }),
  menuList: base => ({
    ...base,
    height: 'auto',
    maxHeight: '25vh',
    overflow: 'auto'
  }),
  option: base => ({
    ...base,
    marginTop: '0',
    padding: '2px 10px 2px',
    zIndex: '10'
  })
};

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.activateField = this.activateField.bind(this);
    this.disableField = this.disableField.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      selectedOption: null,
      fieldActive: false
    };
  }
  // to activate the input field while typing
  activateField(e) {
    this.setState({
      fieldActive: true
    });
  }
  // to deactivate input only if it's empty
  disableField(e) {
    setTimeout(() => {
      if (this.state.selectedOption === null) {
        this.setState({
          fieldActive: false
        });
      }
    }, 10);
    this.props.onBlur(e);
  }

  changeValue(e) {
    ReactGA.event({
      category: 'Form Inputs',
      action: this.props.name + ' ' + e.value
    });
    this.activateField(e);
    this.setState({ selectedOption: e });
    this.props.setFieldValue(this.props.name, e.value, true);

    if (e.value !== 'other') {
      this.props.nextPage();
      document.getElementById(this.props.name).blur();
    }
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
      <div className="position-relative">
        <ReactSelect
          styles={customStyles}
          onKeyDown={this.handleEnter}
          ref={this.props.name}
          className={['floating-label'].join(' ')}
          id={this.props.id}
          onChange={this.changeValue}
          type={this.props.type || 'text'}
          name={this.props.id}
          value={this.state.selectedOption}
          hidden={this.props.hidden}
          onFocus={this.activateField}
          onBlur={this.disableField}
          options={this.props.options}
          placeholder={this.state.fieldActive ? this.props.placeholder : null}
          noOptionsMessage={() => 'Jeśli twój powód nie jest tu podany wybierz "Inny"'}
        />
        <label
          htmlFor={this.props.id}
          className={[this.state.fieldActive ? 'field-active label' : 'label'].join(' ')}
        >
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default Select;
