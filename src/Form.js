import React from "react";

import _ from 'lodash'

import * as Yup from 'yup'
import { withFormik } from 'formik'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Steps from "components/Steps/Steps";
import Choose from 'components/Choose/Choose'
import AutoComplete from 'components/Input/AutoComplete'
import Input from 'components/Input/Input'
import Date from 'components/Input/Date'
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import './form.css'
// Airports Data
import AirportDatabase from 'data/airports.json'
import AirlineDatabase from 'data/airlanes.json'

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    airport: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('First name is required.'),
    airlane: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('Last name is required.'),
    flight: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    date: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),

  mapPropsToValues: ({ user }) => ({
    ...user,
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    alert(payload.email);
    setSubmitting(false);
  },
  displayName: 'ZaBilet',
});



class Form extends React.Component {
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
    };
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  render() {
    const { classes } = this.props;
    const {
      values,
      touched,
      errors,
      dirty,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      isSubmitting,
    } = this.props;
    let Airports = []
    let Airlanes = []
    // parse airports
    // Airports legend
    // - shortcut for airport allAirports = 'iata' Airports = 'code'
    // 'icao' - code of airport only all Airports

    _.each(AirportDatabase, (airport) => {
      let Airport = {
        code: airport.code,
        city: airport.city,
        name: airport.name,
        country: airport.country,
        icao: airport.icao,
        type: airport.type,
      }
      if (Airport.type !== "Railway Stations") {
        Airports.push(Airport)
      }
    })
    _.each(AirlineDatabase, (airlane) => {
      Airlanes.push(airlane)
    })

    return (
      <div className={[classes.section, 'formBackground'].join(' ')}>

        <form
          ref='form'
          onSubmit={handleSubmit}>

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
                              <AutoComplete
                                id='fromWhere'
                                label='Miejsce wylotu:'
                                name='fromWhere'
                                placeholder='np. Tokio, lub HND'
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                suggestions={Airports}
                                error={touched.airport && errors.airport} />
                            </GridItem>
                            <GridItem xs={6}>
                              <AutoComplete
                                id='toWhere'
                                label='Miejsce przylotu:'
                                name='toWhere'
                                placeholder='np. Poland, lub EPWR'
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                suggestions={Airports}
                                error={touched.airport && errors.airport} />
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
                              <GridItem xs={6}>
                                <AutoComplete placeholder='np. LOT Polish Airlines'
                                  label='Linia: '
                                  name='lane'
                                  value={values.firstName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.airlane && errors.airlane}
                                  suggestions={Airlanes} />
                              </GridItem>
                              <GridItem xs={2}>
                                <Input placeholder='np. 1234'
                                  label='Lot: '
                                  name='flight' />
                              </GridItem>
                              <GridItem xs={4}>
                                <Date type='date'
                                  label='Data: '
                                  name='date'
                                />
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
        </form>
      </div>
    );
  }
}

export default formikEnhancer(withStyles(pillsStyle)(Form));
