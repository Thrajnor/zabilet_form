import React from "react";

import MediaQuery from 'react-responsive'

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
import Select from 'components/Input/Select'
import Input from 'components/Input/Input'

let whyAnswers = [
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
    labelType: 'text',
    label: 'Inny',
    value: 'other',
  }
]

let yesNoAnswer = [
  {
    label: 'Tak',
    value: 'ownWill',
  },
  {
    label: 'Nie',
    value: 'forced',
  }
]


class Choose extends React.Component {
  // delay
  delay = () => (
    <div>
      <h4 className=''>Jaki był powód spóźnienia do miejsca docelowego?</h4>
      <small className="form-text text-muted pb-2 mb-3">
        Jeśli Twoj samolot spóźnił się więcej niż 3 godziny załugujesz na odszkodowanie!
      </small>
      <RadioGroup
        nextPage={this.props.nextPage}
        setFieldValue={this.props.setFieldValue}
        values={this.props.values}
        onBlur={this.props.onBlur}
        onChange={this.props.onChange}
        compensation={this.props.compensation}
        name='why'
        grid={12}
        gridSM={6}
        radios={whyAnswers} />
    </div>
  )

  boardingRefused = () => (
    <div>
      <h4 className=''>Czy dobrowolnie zrezygnowałaś/eś z lotu?</h4>
      <small className="form-text text-muted pb-2 mb-3">
        Jeśli zrezygnowałaś/eś ze swojej rezerwacji w zamian za bilet na późniejszy lot lub inne bonusy od linii lotniczej, nie będzie należało Ci się odszkodowanie.
          </small>
      <RadioGroup
        nextPage={this.props.nextPage}
        setFieldValue={this.props.setFieldValue}
        values={this.props.values}
        onBlur={this.props.onBlur}
        onChange={this.props.onChange}
        name='why'
        compensation={this.props.compensation}
        grid={12}
        gridSM={6}
        radios={yesNoAnswer} />
    </div>
  )

  dismissed = () => (
    <div>
      <h4 className=''>Jaki był powód odwołania lotu?</h4>
      <small className="form-text text-muted pb-2 mb-3">
        Jeśli odwołanie nastąpiło mniej niż 14 dni przed wylotem zasługujesz do odszkodowanie!
      </small>
      <RadioGroup
        nextPage={this.props.nextPage}
        setFieldValue={this.props.setFieldValue}
        values={this.props.values}
        onBlur={this.props.onBlur}
        onChange={this.props.onChange}
        name='why'
        compensation={this.props.compensation}
        grid={12}
        gridSM={6}
        radios={whyAnswers} />
    </div>
  )

  // MOBILE

  delayMobile = () => (
    <div>
      <h4 className=''>Czemu Twoj samolot się opóźnił?</h4>
      <small className="form-text text-muted pb-2 mb-3">
        Jeśli Twoj samolot spóźnił się więcej niż 3 godziny do miejsca docelowego załugujesz na odszkodowanie!
      </small>
      <Select
        nextPage={this.props.nextPage}
        placeholder='Wybierz Przyczynę'
        label='Powód: '
        name='why'
        id='why'
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        options={whyAnswers}
        setFieldValue={this.props.setFieldValue}
      />
      {this.props.values.why === 'other' ?
        (<Input
          nextPage={this.props.nextPage}
          placeholder='np. Napad na samolot'
          label='Opisz co się stało: '
          name='whyDetails'
          id='whyDetails'
          className='mt-4'
          onChange={this.props.onChange}
          onBlur={this.props.onBlur} />)
        :
        ''
      }
    </div>
  )

  dismissedMobile = () => (
    <div>
      <h4 className=''>Jaki był powód odwołania lotu?</h4>
      <small className="form-text text-muted pb-2 mb-3">
        Jeśli odwołanie nastąpiło mniej niż 14 dni przed wylotem zasługujesz do odszkodowanie!
      </small>
      <Select
        nextPage={this.props.nextPage}
        placeholder='Wybierz Przyczynę'
        label='Powód: '
        name='why'
        id='why'
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        options={whyAnswers}
        setFieldValue={this.props.setFieldValue}
      />
      {this.props.values.why === 'other' ?
        (<Input
          nextPage={this.props.nextPage}
          placeholder='np. Napad na samolot'
          label='Opisz co się stało: '
          name='whyDetails'
          id='whyDetails'
          className='mt-4'
          onChange={this.props.onChange}
          onBlur={this.props.onBlur} />)
        :
        ''
      }
    </div>
  )



  whichRadioGroup = () => {
    let other = ''
    // this.props.values.why === 'other' ?
    //   other = (<Input
    //     placeholder='np. '
    //     label='Opisz problem: '
    //     name='why'
    //     id='why'
    //     type='textarea'
    //     onChange={this.props.onChange}
    //     onBlur={this.props.onBlur} />)
    //   :
    //   other = ''

    if (this.props.values.whatHappend === 'delay') {
      return (
        <div>
          <MediaQuery maxWidth={600}>
            {this.delayMobile()}
          </MediaQuery>
          <MediaQuery minWidth={600}>
            {this.delay()}
          </MediaQuery>
          {other}
        </div>
      )
    } else if (this.props.values.whatHappend === 'boardingRefused') {
      return this.boardingRefused()
    } else if (this.props.values.whatHappend === 'dismissed') {
      return (
        <div>
          <MediaQuery maxWidth={600}>
            {this.dismissedMobile()}
          </MediaQuery>
          <MediaQuery minWidth={600}>
            {this.dismissed()}
          </MediaQuery>
          {other}
        </div>
      )
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
