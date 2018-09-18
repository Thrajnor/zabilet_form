import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withFormsy } from 'formsy-react';

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.activateField = this.activateField.bind(this);
    this.disableField = this.disableField.bind(this);

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


  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
    this.updateInputValue(event)
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
  }
  // to update the changes in the input and activate it
  updateInputValue(e) {
    this.setState({
      userInput: e.target.value,
    });
    this.activateField(e);
    e.preventDefault();
  }

  // AUTOCOMPLETE
  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    this.changeValue(e)
    let filteredSuggestions = []
    // Filter our suggestions that don't contain the user's input
    if (typeof (suggestions[0]) === 'object') {
      let filteredSuggestionsByCity = suggestions.filter(
        suggestion =>
          suggestion.city.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
      let filteredSuggestionsByName = suggestions.filter(
        suggestion =>
          suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      )
      let filteredSuggestionsByCode = suggestions.filter(
        suggestion =>
          suggestion.code.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      )
      let filteredSuggestionsByCountry = suggestions.filter(
        suggestion =>
          suggestion.country.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      )
      let filteredSuggestionsByIcao = suggestions.filter(
        suggestion =>
          suggestion.icao.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      )
      filteredSuggestions = filteredSuggestionsByCity
        .concat(filteredSuggestionsByName)
        .concat(filteredSuggestionsByCountry)
        .concat(filteredSuggestionsByCode)
        .concat(filteredSuggestionsByIcao)
      filteredSuggestions = filteredSuggestions.slice(0, 40)
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
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    console.log(e.currentTarget)
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
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
                    value={suggestion}
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
                    key={suggestion}
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

    return (
      <Fragment>
        <div className="form-group mt-4 position-relative">
          <label htmlFor={this.props.name} className={this.state.fieldActive ? "label field-active" : "label"}>
            {this.props.label}
          </label>
          <input
            className="floating-label form-control"
            id={this.props.name}
            name={this.props.name}
            type="text"
            hidden={this.props.hidden}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            autoComplete='off'
            onFocus={this.activateField}
            onBlur={this.disableField}
            required={this.props.required}
            placeholder={this.state.fieldActive ? this.props.placeholder : null}
          />
          {suggestionsListComponent}
        </div>
      </Fragment>
    );
  }
}

export default withFormsy(Autocomplete);