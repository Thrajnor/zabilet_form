import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

//  @material-ui/icons components
// import ReportProblem from '@material-ui/icons/ReportProblem'
// import LocalAirport from '@material-ui/icons/LocalAirport'
// import Settings from '@material-ui/icons/Settings'
// import Accessibility from '@material-ui/icons/Accessibility'
// import Cloud from '@material-ui/icons/Cloud'
// import FlightTakeoff from '@material-ui/icons/FlightTakeoff'
// import WbIncandescent from '@material-ui/icons/WbIncandescent'

// core components
import tabsStyle from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.jsx";

import RadioGroup from 'components/Input/Radio/RadioGroup'


class Choose extends React.Component {
  // delay
  delay = () => (
    <div>
      <h4 className=''>Jaki był powód spóźnienia do miejsca docelowego?</h4>
      <small className="form-text text-muted pb-2 mb-3">
        Jeśli Twoj samolot spóźnił się więcej niż 3 godziny załugujesz na odszkodowanie!
          </small>
      <RadioGroup
        onBlur={this.props.onBlur}
        onChange={this.props.onChange}
        compensation={this.props.compensation}
        name='why'
        grid={12}
        gridSM={6}
        radios={[
          {
            label: 'Problemy Techniczne',
            value: 'techProblem',
          },
          {
            label: 'Wpływ innych lotów',
            value: 'otherFlights',
          },
          {
            label: 'Strajk',
            value: 'strike',
          },
          {
            label: 'Problemy na lotnisku',
            value: 'airPortProblems',
          },
          {
            label: 'Złe warunki pogodowe',
            value: 'badWeather',
          },
          {
            label: 'Nie podano powodu',
            value: 'noCauseGiven',
          },
          {
            label: 'Nie pamiętam',
            value: 'dontRemember',
          },
          {
            label: 'Inny',
            value: 'Other',
          }
        ]} />
    </div>
  )

  boardingRefused = () => (
    <div>
      <h4 className=''>Czy dobrowolnie zrezygnowałaś/eś z lotu?</h4>
      <small className="form-text text-muted pb-2 mb-3">
        Jeśli zrezygnowałaś/eś ze swojej rezerwacji w zamian za bilet na późniejszy lot lub inne bonusy od linii lotniczej nie będzie należało Ci się odszkodowanie.
          </small>
      <RadioGroup
        onBlur={this.props.onBlur}
        onChange={this.props.onChange}
        name='why'
        compensation={this.props.compensation}
        grid={12}
        gridSM={6}
        radios={[
          {
            label: 'Tak',
            value: 'ownWill',
          },
          {
            label: 'Nie',
            value: 'forced',
          }
        ]} />
    </div>
  )

  dismissed = () => (
    <div>
      <h4 className=''>Jaki był powód odwołania lotu?</h4>
      <small className="form-text text-muted pb-2 mb-3">
        Jeśli odwołanie nastąpiło mniej niż 14 dni przed wylotem zasługujesz do odszkodowanie!
          </small>
      <RadioGroup
        onBlur={this.props.onBlur}
        onChange={this.props.onChange}
        name='why'
        compensation={this.props.compensation}
        grid={12}
        gridSM={6}
        radios={[
          {
            label: 'Problemy Techniczne',
            value: 'techProblem',
          },
          {
            label: 'Wpływ innych lotów',
            value: 'otherFlights',
          },
          {
            label: 'Strajk',
            value: 'strike',
          },
          {
            label: 'Problemy na lotnisku',
            value: 'airPortProblems',
          },
          {
            label: 'Złe warunki pogodowe',
            value: 'badWeather',
          },
          {
            label: 'Nie podano powodu',
            value: 'noCauseGiven',
          },
          {
            label: 'Nie pamiętam',
            value: 'dontRemember',
          },
          {
            label: 'Inny',
            value: 'Other',
          }
        ]} />
    </div>
  )



  whichRadioGroup = () => {
    if (this.props.values.whatHappend === 'delay') {
      return this.delay()
    } else if (this.props.values.whatHappend === 'boardingRefused') {
      return this.boardingRefused()
    } else if (this.props.values.whatHappend === 'dismissed') {
      return this.dismissed()
    }
  }
  render() {

    return (
      <div>
        {this.whichRadioGroup()}
      </div>
    );
  }
}

export default withStyles(tabsStyle)(Choose);
