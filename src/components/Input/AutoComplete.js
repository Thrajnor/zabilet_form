import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);
    this.activateField = this.activateField.bind(this);
    this.disableField = this.disableField.bind(this);
    this.changeValue = this.changeValue.bind(this);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      fieldActive: false
    };
  }
  // FORMSY
  // FLOATING FIELD !!!!!


  changeValue(e) {
    this.props.onChange(e)
    this.activateField();
  }

  // to activate the input field while typing
  activateField() {
    this.setState({
      fieldActive: true,
      showSuggestions: true
    })
  }
  // to deactivate input only if it's empty
  disableField(e) {
    if (e.target.value === "") {
      this.setState({
        fieldActive: false,
        showSuggestions: false
      })
    }
    this.props.onBlur(e)
  }

  // AUTOCOMPLETE
  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    this.changeValue(e)
    let filteredSuggestions = []
    // Filter our suggestions that don't contain the user's input
    if (suggestions[0].city !== undefined) {
      let filteredSuggestionsByCity = suggestions.filter(
        suggestion =>
          suggestion.city.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      ).slice(0, 4)
      let filteredSuggestionsByName = suggestions.filter(
        suggestion =>
          suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      ).slice(0, 4)
      let filteredSuggestionsByCode = suggestions.filter(
        suggestion =>
          suggestion.code.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      ).slice(0, 4)
      let filteredSuggestionsByCountry = suggestions.filter(
        suggestion =>
          suggestion.country.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      ).slice(0, 4)
      let filteredSuggestionsByIcao = suggestions.filter(
        suggestion =>
          suggestion.icao.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      ).slice(0, 4)
      filteredSuggestions = filteredSuggestionsByCity
        .concat(filteredSuggestionsByName)
        .concat(filteredSuggestionsByCountry)
        .concat(filteredSuggestionsByCode)
        .concat(filteredSuggestionsByIcao)
      filteredSuggestions = filteredSuggestions.slice(0, 4)
      filteredSuggestions = [...new Set(filteredSuggestions)]
    } else {
      filteredSuggestions = suggestions.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
    }
    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
    this.props.onChange(e)
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    let value = ''
    if (e.currentTarget.getAttribute('name') !== null && e.currentTarget.getAttribute('name') !== '') {
      value = e.currentTarget.getAttribute('name')
    } else if (e.currentTarget.getAttribute('name') !== null && e.currentTarget.getAttribute('city') !== '') {
      value = e.currentTarget.getAttribute('city')
    } else if (e.currentTarget.getAttribute('name') !== null && e.currentTarget.getAttribute('country') !== '') {
      value = e.currentTarget.getAttribute('country')
    } else {
      value = e.currentTarget.innerText
    }
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: value
    });
    this.props.setFieldValue(this.props.id, value, true)
  };

  handleEnter = (event) => {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    let value = ''
    this.handleEnter(e)

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      if (typeof (filteredSuggestions[activeSuggestion]) === 'undefined') {
        return
      } else if (filteredSuggestions[activeSuggestion].name !== null && filteredSuggestions[activeSuggestion].name !== '') {
        value = filteredSuggestions[activeSuggestion].name
      } else if (filteredSuggestions[activeSuggestion].name !== null && filteredSuggestions[activeSuggestion].city !== '') {
        value = filteredSuggestions[activeSuggestion].city
      } else if (filteredSuggestions[activeSuggestion].name !== null && filteredSuggestions[activeSuggestion].country !== '') {
        value = filteredSuggestions[activeSuggestion].country
      } else {
        value = filteredSuggestions[activeSuggestion]
      }
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: value
      });
      this.props.setFieldValue(this.props.id, value, true)
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              if (typeof (suggestion) === 'object') {
                return (
                  <li
                    className={className}
                    key={suggestion.code + index}
                    onClick={onClick}
                    name={suggestion.name}
                    city={suggestion.city}
                    country={suggestion.country}
                  >
                    {suggestion.name}
                    <span>
                      <small className="form-text text-muted d-inline"> {suggestion.city}, {suggestion.country}</small>
                    </span>
                  </li>
                )
              } else {
                return (
                  <li
                    className={className}
                    key={suggestion + index}
                    onClick={onClick}
                  >
                    {suggestion}
                  </li>
                )
              }
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions suggestion-active">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }
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
      <Fragment>
        <div className={[errorBorder, "form-group mt-4 position-relative"].join(' ')}>
          <label htmlFor={this.props.name} className={[errorText, this.state.fieldActive ? "label field-active" : "label"].join(' ')}>
            {this.props.label}
          </label>
          <input
            className={[errorBorder, "floating-label form-control"].join(' ')}
            id={this.props.name}
            name={this.props.name}
            type="text"
            hidden={this.props.hidden}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={this.state.userInput}
            autoComplete='off'
            onFocus={this.activateField}
            onBlur={this.disableField}
            required={this.props.required}
            placeholder={this.state.fieldActive ? this.props.placeholder : null}
            autofocus={this.state.autofocus || ''}
          />
          {suggestionsListComponent}
          {this.props.error ? <div className={errorText}>{this.props.error}</div> : null}
        </div>
      </Fragment>
    );
  }
}

export default Autocomplete;