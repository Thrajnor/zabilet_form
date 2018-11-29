import React from 'react';

import MediaQuery from 'react-responsive';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

//  @material-ui/icons components
// import ReportProblem from '@material-ui/icons/ReportProblem'
// import LocalAirport from '@material-ui/icons/LocalAirport'
// import Settings from '@material-ui/icons/Settings'
// import Accessibility from '@material-ui/icons/Accessibility'
// import Cloud from '@material-ui/icons/Cloud'
// import FlightTakeoff from '@material-ui/icons/FlightTakeoff'
// import WbIncandescent from '@material-ui/icons/WbIncandescent'

// core components
import tabsStyle from 'assets/jss/material-kit-react/views/componentsSections/tabsStyle.jsx';

import RadioGroup from 'components/Input/Radio/RadioGroup';
import Select from 'components/Input/Select';
import Input from 'components/Input/Input';

let whyAnswers = [
  {
    label: 'Problemy Techniczne',
    value: 'problemy_techniczne'
  },
  {
    label: 'Wpływ innych lotów',
    value: 'wpływ_innych_lotów'
  },
  {
    label: 'Strajk',
    value: 'strajk'
  },
  {
    label: 'Problemy na lotnisku',
    value: 'problemy_na_lotnisku'
  },
  {
    label: 'Złe warunki pogodowe',
    value: 'złe_warunki_pogodowe'
  },
  {
    label: 'Nie podano powodu',
    value: 'nie_podano_powodu'
  },
  {
    label: 'Nie pamiętam',
    value: 'nie_pamiętam'
  },
  {
    labelType: 'text',
    label: 'Inny',
    value: 'inny'
  }
];

let yesNoAnswer = [
  {
    label: 'Tak',
    value: 'tak',
    ownWill: true
  },
  {
    label: 'Nie',
    value: 'nie'
  }
];

class Choose extends React.Component {
  // delay
  delay = () => (
    <div>
      <h4 className="">Jaki był powód spóźnienia do miejsca docelowego?</h4>
      <small className="form-text text-muted pb-2 mb-3">
        Jeżeli Twój samolot wylądował w miejscu docelowym z powyżej 3 godzinnym opóźnieniem należy
        Ci się odszkodowanie
      </small>
      <RadioGroup
        nextPage={this.props.nextPage}
        setFieldValue={this.props.setFieldValue}
        values={this.props.values}
        onBlur={this.props.onBlur}
        onChange={this.props.onChange}
        compensation={this.props.compensation}
        name="why"
        grid={12}
        gridSM={6}
        radios={whyAnswers}
      />
    </div>
  );

  boardingRefused = () => (
    <div>
      <h4 className="">Czy dobrowolnie zrezygnowałaś/eś z lotu?</h4>
      <small className="form-text text-muted pb-2 mb-3">
        Jeśli zrezygnowałaś/eś ze swojej rezerwacji w zamian za bilet na późniejszy lot lub inne
        bonusy od linii lotniczej, nie będzie należało Ci się odszkodowanie.
      </small>
      <RadioGroup
        ownWillHandler={this.props.ownWillHandler}
        nextPage={this.props.nextPage}
        setFieldValue={this.props.setFieldValue}
        values={this.props.values}
        onBlur={this.props.onBlur}
        onChange={this.props.onChange}
        name="why"
        compensation={this.props.compensation}
        grid={12}
        gridSM={6}
        radios={yesNoAnswer}
      />
    </div>
  );

  dismissed = () => (
    <div>
      <h4 className="">Jaki był powód odwołania lotu?</h4>
      <small className="form-text text-muted pb-2 mb-3">
        Jeśli odwołanie nastąpiło mniej niż 14 dni przed wylotem zasługujesz do odszkodowanie!
      </small>
      <RadioGroup
        nextPage={this.props.nextPage}
        setFieldValue={this.props.setFieldValue}
        values={this.props.values}
        onBlur={this.props.onBlur}
        onChange={this.props.onChange}
        name="why"
        compensation={this.props.compensation}
        grid={12}
        gridSM={6}
        radios={whyAnswers}
      />
    </div>
  );

  // MOBILE

  delayMobile = () => (
    <div>
      <h4 className="">Czemu Twoj samolot się opóźnił?</h4>
      <small className="form-text text-muted pb-2 mb-3">
        Jeśli Twoj samolot spóźnił się więcej niż 3 godziny do miejsca docelowego załugujesz na
        odszkodowanie!
      </small>
      <Select
        nextPage={this.props.nextPage}
        placeholder="Wybierz Przyczynę"
        label="Powód: "
        name="why"
        id="why"
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        options={whyAnswers}
        setFieldValue={this.props.setFieldValue}
      />
      {this.props.values.why === 'other' ? (
        <Input
          nextPage={this.props.nextPage}
          placeholder="np. Napad na samolot"
          label="Opisz co się stało: "
          name="whyDetails"
          id="whyDetails"
          className="mt-4"
          values={this.props.values}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        />
      ) : (
        ''
      )}
    </div>
  );

  dismissedMobile = () => (
    <div>
      <h4 className="">Jaki był powód odwołania lotu?</h4>
      <small className="form-text text-muted pb-2 mb-3">
        Jeśli odwołanie nastąpiło mniej niż 14 dni przed wylotem zasługujesz do odszkodowanie!
      </small>
      <Select
        nextPage={this.props.nextPage}
        placeholder="Wybierz Przyczynę"
        label="Powód: "
        name="why"
        id="why"
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        options={whyAnswers}
        setFieldValue={this.props.setFieldValue}
      />
      {this.props.values.why === 'other' ? (
        <Input
          nextPage={this.props.nextPage}
          placeholder="np. Napad na samolot"
          label="Opisz co się stało: "
          name="whyDetails"
          id="whyDetails"
          className="mt-4"
          values={this.props.values}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        />
      ) : (
        ''
      )}
    </div>
  );

  whichRadioGroup = () => {
    let other = '';
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

    if (this.props.values.whatHappend === 'opóźnienie') {
      return (
        <div>
          <MediaQuery maxWidth={763}>{this.delayMobile()}</MediaQuery>
          <MediaQuery minWidth={763}>{this.delay()}</MediaQuery>
          {other}
        </div>
      );
    } else if (this.props.values.whatHappend === 'niewpuszczenie_na_pokład') {
      return this.boardingRefused();
    } else {
      return (
        <div>
          <MediaQuery maxWidth={763}>{this.dismissedMobile()}</MediaQuery>
          <MediaQuery minWidth={763}>{this.dismissed()}</MediaQuery>
          {other}
        </div>
      );
    }
  };
  render() {
    return <div>{this.whichRadioGroup()}</div>;
  }
}

export default withStyles(tabsStyle)(Choose);
