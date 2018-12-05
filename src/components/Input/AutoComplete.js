import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ReactGA from 'react-ga';

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

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: '',
      fieldActive: false
    };
  }

  // AUTOCOMPLETE
  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    this.activateField();
    let filteredSuggestions = [];

    if (this.props.airportsDetails) {
      this.props.airportsDetails(this.props.name, { city: '', country: '' });
    }
    // Filter our suggestions that don't contain the user's input
    if (suggestions) {
      if (suggestions[0] && suggestions[0].city) {
        // POLISH
        let polishAirports = suggestions.filter(suggestion => {
          return suggestion.country.toLowerCase().indexOf('poland') > -1;
        });
        // NON POLISH
        let nonPolishAirports = suggestions.filter(suggestion => {
          return suggestion.country.toLowerCase().indexOf('poland') <= -1;
        });
        // COUNTRY
        let filteredSuggestionsByCountry = polishAirports
          .filter(
            suggestion => suggestion.country.toLowerCase().indexOf(userInput.toLowerCase()) > -1
          )
          .slice(0, 4)
          .concat(
            nonPolishAirports
              .filter(
                suggestion => suggestion.country.toLowerCase().indexOf(userInput.toLowerCase()) > -1
              )
              .slice(0, 4)
          );
        // CITY
        let filteredSuggestionsByCity = polishAirports
          .filter(suggestion => {
            if (suggestion.city) {
              return suggestion.city.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
            }
            return false;
          })
          .slice(0, 4)
          .concat(
            nonPolishAirports
              .filter(suggestion => {
                if (suggestion.city) {
                  return suggestion.city.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
                }
                return false;
              })
              .slice(0, 4)
          );
        // NAME
        let filteredSuggestionsByName = polishAirports
          .filter(suggestion => suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
          .slice(0, 4)
          .concat(
            nonPolishAirports.filter(
              suggestion => suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            )
          );
        // IATA
        let filteredSuggestionsByIata = polishAirports
          .filter(suggestion => {
            if (suggestion.iata) {
              return suggestion.iata.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
            }
            return false;
          })
          .slice(0, 4)
          .concat(
            nonPolishAirports
              .filter(suggestion => {
                if (suggestion.iata) {
                  return suggestion.iata.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
                }
                return false;
              })
              .slice(0, 4)
          );

        filteredSuggestions = filteredSuggestionsByIata
          .concat(filteredSuggestionsByCity)
          .concat(filteredSuggestionsByName)
          .concat(filteredSuggestionsByCountry);
        filteredSuggestions = [...new Set(filteredSuggestions)];
        filteredSuggestions = filteredSuggestions.slice(0, 4);
      } else {
        filteredSuggestions = suggestions
          .filter(suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
          .slice(0, 4);
      }
    } else {
      filteredSuggestions = ['Brak połączenia z bazą danych!'];
    }
    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      userInput: userInput
    });
    if (userInput === '') {
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false
      });
    } else {
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions,
        showSuggestions: true
      });
    }
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    const { filteredSuggestions } = this.state;
    let details = {};
    // Update the user input and reset the rest of the state

    let value = '';
    if (e.currentTarget.getAttribute('name')) {
      value = e.currentTarget.getAttribute('name');
    } else if (e.currentTarget.getAttribute('city')) {
      value = e.currentTarget.getAttribute('city');
    } else if (e.currentTarget.getAttribute('country')) {
      value = e.currentTarget.getAttribute('country');
    } else {
      value = e.currentTarget.innerText;
    }
    if (this.props.airportsDetails) {
      if (e.currentTarget.getAttribute('city')) {
        details.city = e.currentTarget.getAttribute('city');
      } else if (e.currentTarget.getAttribute('country')) {
        details.city = e.currentTarget.getAttribute('country');
      } else if (e.currentTarget.getAttribute('name')) {
        details.city = e.currentTarget.getAttribute('name');
      }
      details.country = e.currentTarget.getAttribute('country');
      this.props.airportsDetails(this.props.name, details);
    }
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [filteredSuggestions[e.currentTarget.getAttribute('index')]],
      showSuggestions: false,
      userInput: value,
      details
    });
    this.props.setFieldValue(this.props.id, value, true);
  };

  handleEnter = event => {
    if (event.keyCode === 13 || event.keyCode === 9) {
      ReactGA.event({
        category: 'Input',
        action: 'Clicked ' + event.key + ' on ' + this.props.name
      });
      event.preventDefault();
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      if (this.props.nextPage && this.props.values[this.props.name] && !this.props.error) {
        this.props.nextPage();
        document.getElementById(this.props.name).blur();
      }
    }
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    let value = '';
    let details = {};
    // this.props.handleEnterPress(e)

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.props.onChange(e);
      setTimeout(() => {
        this.handleEnter(e);
      }, 10);
      if (!filteredSuggestions[activeSuggestion]) {
        return;
      } else if (filteredSuggestions[activeSuggestion].name) {
        value = filteredSuggestions[activeSuggestion].name;
      } else if (filteredSuggestions[activeSuggestion].city) {
        value = filteredSuggestions[activeSuggestion].city;
      } else if (filteredSuggestions[activeSuggestion].country) {
        value = filteredSuggestions[activeSuggestion].country;
      } else {
        value = filteredSuggestions[activeSuggestion];
      }

      if (this.props.airportsDetails) {
        if (!filteredSuggestions[activeSuggestion]) {
          return;
        } else if (filteredSuggestions[activeSuggestion].city) {
          details.city = filteredSuggestions[activeSuggestion].city;
        } else if (filteredSuggestions[activeSuggestion].country) {
          details.city = filteredSuggestions[activeSuggestion].country;
        } else if (filteredSuggestions[activeSuggestion].name) {
          details.city = filteredSuggestions[activeSuggestion].name;
        }
        details.country = filteredSuggestions[activeSuggestion].country;
        this.props.airportsDetails(this.props.name, details);
      }
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [filteredSuggestions[activeSuggestion]],
        showSuggestions: false,
        userInput: value,
        details
      });
      this.props.setFieldValue(this.props.id, value, true);
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
    } else if (e.keyCode === 9) {
      this.props.onChange(e);
      setTimeout(() => {
        this.handleEnter(e);
      }, 10);
    }
  };

  // to activate the input field while typing
  activateField() {
    ReactGA.event({
      category: 'Input',
      action: 'Clicked ' + this.props.name
    });
    this.setState({
      fieldActive: true,
      showSuggestions: true
    });
  }
  // to deactivate input only if it's empty
  disableField(e) {
    e.persist();
    if (!e.target.value) {
      this.setState({
        fieldActive: false,
        showSuggestions: false
      });
    } else {
      setTimeout(() => {
        this.setState({
          showSuggestions: false
        });
      }, 500);
    }
    this.props.onChange(e);
    setTimeout(() => {
      this.props.onBlur(e);
    }, 10);
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeSuggestion, filteredSuggestions, showSuggestions, userInput }
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
                className = 'suggestion-active';
              }
              if (typeof suggestion === 'object') {
                return (
                  <li
                    className={className}
                    key={suggestion.iata + 'auto' + index}
                    onClick={onClick}
                    name={suggestion.name}
                    city={suggestion.city}
                    country={suggestion.country}
                    index={index}
                  >
                    {suggestion.name}
                    <br />
                    <small className="form-text text-muted d-inline">
                      {' '}
                      {suggestion.city}, {suggestion.country}
                    </small>
                  </li>
                );
              } else {
                return (
                  <li
                    className={className}
                    key={suggestion + index}
                    onClick={onClick}
                    index={index}
                  >
                    {suggestion}
                  </li>
                );
              }
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = <div />;
      }
    }
    let errorText = '';
    let errorBorder = '';
    if (this.props.error) {
      errorText = 'invalid-text';
      errorBorder = 'invalid-border';
    } else if (!this.props.error && this.props.touched) {
      errorText = 'valid-text';
      errorBorder = 'valid-border';
    }

    return (
      <Fragment>
        <div className={[errorBorder, 'form-group mt-3 position-relative'].join(' ')}>
          <label
            htmlFor={this.props.name}
            className={[errorText, this.state.fieldActive ? 'label field-active' : 'label'].join(
              ' '
            )}
          >
            {this.props.label}
          </label>
          <input
            className={[errorBorder, 'floating-label form-control'].join(' ')}
            id={this.props.name}
            name={this.props.name}
            type="text"
            hidden={this.props.hidden}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={this.state.userInput}
            autoComplete="off"
            onFocus={this.activateField}
            onBlur={this.disableField}
            required={this.props.required}
            placeholder={this.state.fieldActive ? this.props.placeholder : null}
          />
          {suggestionsListComponent}
          {this.props.error ? <div className={errorText}>{this.props.error}</div> : null}
        </div>
      </Fragment>
    );
  }
}

export default Autocomplete;
