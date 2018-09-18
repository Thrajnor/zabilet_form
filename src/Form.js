import React from "react";

import _ from 'lodash'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Steps from "components/Steps/Steps";
import Choose from 'components/Choose/Choose'
import AutoComplete from 'components/Input/AutoComplete'
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import './form.css'
import Formsy from 'formsy-react';
// Airports Data
import AirportDatabase from 'data/airports.json'



class SectionPills extends React.Component {
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      canSubmit: false,
      formsy: ''
    };
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  submit(model) {
    console.log(JSON.stringify(model))
    // fetch('http://localhost:3000/', {
    //   method: 'post',
    //   body: JSON.stringify(model)
    // });
  }
  componentDidMount() {
    this.setState({ formsy: this })
  }
  render() {
    const { classes } = this.props;
    let Airports = []
    // parse airports
    // Airports legend
    // - shortcut for airport allAirports = 'iata' Airports = 'code'
    // 'icao' - code of airport only all Airports

    _.each(AirportDatabase, (airport) => {
      Airports.push(airport.code)
    })

    return (
      <div className={[classes.section, 'formBackground'].join(' ')}>

        <Formsy
          ref='form'
          onValidSubmit={this.submit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}>

          <div id="navigation-pills">
            <div>
              <Steps
                color="primary"
                canSubmit={this.state.canSubmit}
                tabs={[
                  {
                    tabButton: "1",
                    tabContent: (
                      <span>
                        <div className='slideContent'>
                          <h3>Cześć!</h3>
                          <h5>Za moment zajmiemy się Twoim odszkodowaniem, narazie odpowiedz na te kilka pytań dotyczących Twojego lotu :)</h5>
                          <GridContainer spacing={16}>
                            <GridItem xs={6}>
                              {/* <Input type='text'
                                label='Miejsce wylotu:'
                                name='fromWhere'
                                placeholder='np. Wrocław, lub W-w'
                                required /> */}
                              <AutoComplete
                                label='Miejsce wylotu:'
                                name='fromWhere'
                                placeholder='np. Wrocław, lub W-w'
                                required
                                suggestions={Airports} />
                            </GridItem>
                            <GridItem xs={6}>
                              <AutoComplete
                                label='Miejsce przylotu:'
                                name='toWhere'
                                placeholder='np. Oslo'
                                required
                                suggestions={[
                                  "Alligator",
                                  "Bask",
                                  "Crocodilian",
                                  "Death Roll",
                                  "Eggs",
                                  "Jaws",
                                  "Reptile",
                                  "Solitary",
                                  "Tail",
                                  "Wetlands"
                                ]} />
                            </GridItem>
                          </GridContainer>
                        </div>
                      </span>
                    )
                  },
                  {
                    tabButton: "2",
                    tabContent: (
                      <span>
                        <div className='slideContent'>
                          <div className='mb-5'>
                            <h3>Co się stało ?</h3>
                            <small className="form-text text-muted">Linie lotnicze odpowiadają tylko za sytuacje nad którymi mają względną kontrolę, jednak każdy przypadek jest indywidualny i bardzo często ustalenie odpowiedzialności odbywa się z korzyścią dla klienta.</small>
                          </div>
                          <Choose formsy={this.state.formsy}></Choose>
                        </div>
                      </span>
                    )
                  },
                  {
                    tabButton: "3",
                    tabContent: (
                      <span>
                        <div className='slideContent'>
                          <h3>Wygląda na to, że może Ci się należeć nawet XXXeuro !</h3>
                          <h3>Podaj jeszcze:</h3>
                          <span>
                            <GridContainer spacing={16}>
                              <GridItem xs={4}>
                                <AutoComplete placeholder='np. Oslo' label='Linia: ' name='lane' required
                                  suggestions={[
                                    "Alligator",
                                    "Bask",
                                    "Crocodilian",
                                    "Death Roll",
                                    "Eggs",
                                    "Jaws",
                                    "Reptile",
                                    "Solitary",
                                    "Tail",
                                    "Wetlands"
                                  ]} />
                              </GridItem>
                              <GridItem xs={4}>
                                <AutoComplete placeholder='np. Oslo' label='Lot: ' name='flight' required
                                  suggestions={[
                                    "Alligator",
                                    "Bask",
                                    "Crocodilian",
                                    "Death Roll",
                                    "Eggs",
                                    "Jaws",
                                    "Reptile",
                                    "Solitary",
                                    "Tail",
                                    "Wetlands"
                                  ]} />
                              </GridItem>
                              <GridItem xs={4}>
                                <AutoComplete placeholder='np. Oslo' label='Data: ' name='data' required
                                  suggestions={[
                                    "Alligator",
                                    "Bask",
                                    "Crocodilian",
                                    "Death Roll",
                                    "Eggs",
                                    "Jaws",
                                    "Reptile",
                                    "Solitary",
                                    "Tail",
                                    "Wetlands"
                                  ]} />
                              </GridItem>
                            </GridContainer>
                          </span>
                        </div>
                      </span>
                    )
                  }
                ]}
              />
            </div>
          </div>
        </Formsy>
      </div>
    );
  }
}

export default withStyles(pillsStyle)(SectionPills);
