import '@babel/polyfill';
import React from 'react';

// import _ from 'lodash'

import * as Yup from 'yup';
import { Formik } from 'formik';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

//  @material-ui/icons components
import Timer from '@material-ui/icons/Timer';
import PanTool from '@material-ui/icons/PanTool';
import Cancel from '@material-ui/icons/Cancel';

// core components
import Steps from 'components/Steps/Steps';
import Choose from 'components/Choose/Choose';
import AutoComplete from 'components/Input/AutoComplete';
import Input from 'components/Input/Input';
import Date from 'components/Input/Date';
import pillsStyle from 'assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import RadioGroup from 'components/Input/Radio/RadioGroup';
import Radio from 'components/Input/Radio/Radio';
import Button from 'components/CustomButtons/Button.jsx';

import './form.css';
// Airports Data
import AirportDatabase from 'airport-data';
import AirlineDatabase from 'data/airlanes-small.json';

// variables ==========================================================================
let didSubmit = false;
let userConsent = false;
let ownWill = false;
let submitBeta = false;
// yup

// Yup.addMethod(Yup.type, 'isTheSame', function (anyArgsYouNeed) {
//   const { message } = anyArgsYouNeed;
//   return this.test('isTheSame', message, function (value) {
//     const { path, createError } = this;
//     const { some, more, args } = anyArgsYouNeed;
//     console.log(anyArgsYouNeed)
//     // [value] - value of the property being tested
//     // [path]  - property name,
//     // ...
//     return database || createError(error);
//   });
// CONPONENT ======================================================================

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compensation: 400,
      toNextPage: false
    };
  }

  nextPage = () => {
    this.setState({ toNextPage: true });
  };
  nextPageUsed = () => {
    this.setState({ toNextPage: false });
  };
  ownWillHandler = bool => {
    ownWill = bool;
  };

  componentDidMount() {
    document.getElementById('fromWhere').focus();
  }
  // handleCompensation = (value) => {
  //   this.setState({compensation: value})
  // }
  // _airports = null
  airports = () => {
    return AirportDatabase;
    // if (this._airports === null) {
    //   // parse airports
    //   // Airports legend
    //   // - shortcut for airport allAirports = 'iata' Airports = 'code'
    //   // 'icao' - code of airport only all Airports
    //   _.each(AirportDatabase, (airport) => {
    //     this._airports = []
    //     if (airport.type !== "Railway Stations") {
    //       this._airports.push({ airport })
    //     }
    //   })
    //   return this._airports;
    // } else {
    //   return this._airports;
    // }
  };
  // _airlanes = null;
  airlanes = () => {
    // if (this._airlanes === null) {
    //   this._airlanes = []
    //   _.each(AirlineDatabase, (airlane) => {
    //     this._airlanes.push(airlane)
    //   })
    // } else {
    //   return this._airlanes;
    // }
    return AirlineDatabase;
  };

  noCompensationScreen = () => {
    const { classes } = this.props;
    return (
      <div className={[classes.section, 'formBackground'].join(' ')}>
        <Formik
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Niepoprawny email!')
              .required('Email jest wymagany do zapisów na beta testy!'),
            consent: Yup.boolean().oneOf([true], 'Wymagana zgoda na beta testy')
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            didSubmit = true;
            submitBeta = true;
            setSubmitting(false);
            this.forceUpdate();
          }}
        >
          {({ values, touched, errors, handleSubmit, handleChange, handleBlur }) => (
            <span>
              <div className={'outer'}>
                <div className={'middle middleButtonLess'}>
                  <div className={'inner'}>
                    <form onSubmit={handleSubmit}>
                      <Paper elevation={5} className={[classes.tabContent, 'paperSpace'].join(' ')}>
                        <div className="slideContent">
                          <h4 className="justify-content-center">Niestety!</h4>
                          <p className="mb-4">
                            Ponieważ dobrowolnie zrezygnowałeś/aś z wejścia na pokład nie będzie
                            możliwe uzyskanie odszkodowania. Możesz jednak zapisać się na beta testy
                            naszej aplikacji, która szanując Twoją prywatność, sprawdzi czy na
                            skrzynce pocztowej masz więcej biletów mogących podlegać odszkodowaniu
                          </p>
                          <GridContainer spacing={16}>
                            <GridItem xs={12}>
                              <Input
                                placeholder="np. example@gmail.com"
                                label="Twój Email: "
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && errors.email}
                                touched={touched.email}
                              />
                            </GridItem>
                            <GridItem xs={12}>
                              <Radio
                                // label='* Zgoda na beta testy aplikacji, przeszukującej Twój e-mail pod kątem  poprzednich lotów, za które może Ci za nie przysługiwać odszkodowanie.'
                                label="Zgoda na beta testy aplikacji, która wyszuka na Twojej skrzynce bilety za poprzednie loty (do 3 lat). Być może należy Ci się więcej odszkodowań."
                                name="consent"
                                type="checkbox"
                                values={values}
                                value={values.consent}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.consent && errors.consent}
                                touched={touched.consent}
                              />
                            </GridItem>
                          </GridContainer>
                        </div>
                      </Paper>
                      <div className={'navBase'}>
                        <Button
                          disabled={this.props.isSubmitting}
                          className={['wholeButton'].join(' ')}
                          type="submit"
                        >
                          Zapisz się na beta testy!
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </span>
          )}
        </Formik>
      </div>
    );
  };

  tabFromWhere = ({
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    submitCount,
    setFieldValue,
    validateField
  }) => (
    <span>
      <div className="slideContent">
        <h3 className="justify-content-center">Witaj!</h3>
        <h6 className="form-text text-muted mb-3">
          Odszkodowanie za problematyczny lot należy Ci się nawet do 3 lat wstecz, pod warunkiem, że
          miejsce wylotu lub docelowe (albo oba) to terytorium Unii Europejskiej.
        </h6>
        <GridContainer spacing={16}>
          <GridItem xs={12} sm={6}>
            <AutoComplete
              id="fromWhere"
              toWhat="airport"
              label="Miejsce wylotu:"
              name="fromWhere"
              placeholder="np. Tokio lub HND"
              value={values.formWhere}
              onChange={handleChange}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              suggestions={this.airports()}
              error={touched.fromWhere && errors.fromWhere}
              touched={touched.fromWhere}
            />
          </GridItem>
          <GridItem xs={12} sm={6}>
            <AutoComplete
              id="toWhere"
              toWhat="airport"
              label="Miejsce przylotu:"
              name="toWhere"
              placeholder="np. Poland lub EPWR"
              value={values.toWhere}
              onChange={handleChange}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              values={values}
              error={touched.toWhere && errors.toWhere}
              touched={touched.toWhere}
              suggestions={this.airports()}
              nextPage={this.nextPage}
              validateField={validateField}
            />
          </GridItem>
        </GridContainer>
      </div>
    </span>
  );

  tabWhatHappend = ({
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    submitCount,
    setFieldValue
  }) => (
    <span>
      <div className="slideContent">
        <div className="pb-2 mb-3">
          <h3>Co się stało?</h3>
          <small className="form-text text-muted">
            Linie lotnicze odpowiadają tylko za sytuacje, nad którymi mają względną kontrolę, jednak
            każdy przypadek jest indywidualny i bardzo często ustalenie odpowiedzialności odbywa się
            z korzyścią dla klienta.
          </small>
        </div>
        <RadioGroup
          nextPage={this.nextPage}
          values={values}
          onBlur={handleBlur}
          onChange={handleChange}
          name="whatHappend"
          grid={12}
          size="big"
          radios={[
            {
              icon: <Timer />,
              label: 'Duże opóźnienie lądowania',
              value: 'delay'
            },
            {
              icon: <PanTool />,
              label: 'Niewpuszczenie na pokład',
              value: 'boardingRefused'
            },
            {
              icon: <Cancel />,
              label: 'Lot został odwołany',
              value: 'dismissed'
            }
          ]}
        />
      </div>
    </span>
  );

  tabWhy = ({
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    submitCount,
    setFieldValue
  }) => (
    <span>
      <div className="slideContent">
        <Choose
          nextPage={this.nextPage}
          values={values}
          onBlur={handleBlur}
          onChange={handleChange}
          setFieldValue={setFieldValue}
          ownWillHandler={this.ownWillHandler}
          // compensation={this.handleCompensation()}
        />
      </div>
    </span>
  );

  tabFlightDetails = ({
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    submitCount,
    setFieldValue
  }) => (
    <span>
      <div className="slideContent">
        <h4>Możliwe że należy Ci się odszkodowanie!</h4>
        <h6 className="mb-3">Podaj nam detale lotu, abyśmy mogli to sprawdzić:</h6>
        <span>
          <GridContainer spacing={16}>
            <GridItem xs={12} sm={6}>
              <AutoComplete
                label="Linia: "
                name="airlane"
                id="airlane"
                toWhat="airlane"
                placeholder="np. LOT Polish Airlines"
                value={values.airlane}
                onChange={handleChange}
                setFieldValue={setFieldValue}
                onBlur={handleBlur}
                error={touched.airlane && errors.airlane}
                touched={touched.airlane}
                suggestions={this.airlanes()}
              />
            </GridItem>
            <GridItem xs={5} sm={2}>
              <Input
                placeholder="np. 1234"
                label="Lot: "
                name="flight"
                id="flight"
                value={values.flight}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.flight && errors.flight}
                touched={touched.flight}
              />
            </GridItem>
            <GridItem xs={7} sm={4}>
              <Date
                type="date"
                label="Data: "
                name="date"
                id="date"
                value={values.date}
                values={values}
                onChange={handleChange}
                setFieldValue={setFieldValue}
                onBlur={handleBlur}
                error={touched.date && errors.date}
                touched={touched.date}
                nextPage={this.nextPage}
              />
            </GridItem>
          </GridContainer>
        </span>
      </div>
    </span>
  );
  userDetails = ({
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    submitCount,
    setFieldValue
  }) => (
    <span>
      <div className="slideContent">
        <h4>Super!</h4>
        <h6 className="mb-3">
          Teraz już tylko Email do zarejestrowania zgłoszenia i opcjonalnie zgoda na beta testy:
        </h6>
        <span>
          <GridContainer spacing={16}>
            <GridItem xs={12}>
              <Input
                placeholder="example@gmail.com"
                label="E-mail: "
                name="email"
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                touched={touched.email}
              />
            </GridItem>
            <GridItem xs={12}>
              <Radio
                // label='* Zgoda na beta testy aplikacji, przeszukującej Twój e-mail pod kątem  poprzednich lotów, za które może Ci za nie przysługiwać odszkodowanie.'
                label="Opcjonalna zgoda na beta testy aplikacji, która wyszuka na Twojej skrzynce bilety za poprzednie loty (do 3 lat). Być może należy Ci się więcej odszkodowań."
                name="consent"
                type="checkbox"
                values={values}
                value={values.consent}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.consent && errors.consent}
                touched={touched.consent}
              />
            </GridItem>
          </GridContainer>
        </span>
      </div>
    </span>
  );

  betaTesty = () => (
    <div className={['formBackground'].join(' ')}>
      <div className={'outer'}>
        <div className={'middle middleButtonLess'}>
          <div className={'inner'}>
            <Paper elevation={5} className={['paperSpace'].join(' ')}>
              <div className="slideContent">
                <h3 className="justify-content-center">
                  Pomyślnie zapisałeś/aś się na beta testy!
                </h3>
                <h5>
                  Gdy nasza aplikacja będzie gotowa sprawdzimy czy na Twojej skrzynce jest więcej
                  biletów, za które należy Ci się odszkodowanie.
                </h5>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );

  mainForm = () => {
    const { classes } = this.props;
    return (
      <div className={[classes.section, 'formBackground'].join(' ')}>
        <Formik
          validationSchema={Yup.object().shape({
            fromWhere: Yup.string().required('Lotnisko jest wymagane!'),
            toWhere: Yup.string()
              .max(50, 'zbyt długa nazwa!')
              // .required('Wybierz z listy lotnisk!'),
              .max(50, 'zbyt długa nazwa!')
              .required('Lotnisko jest wymagane!'),
            airlane: Yup.string()
              .max(50, 'zbyt długa nazwa!')
              .required('Linia lotnicza jest wymagana!'),
            flight: Yup.string()
              .max(50, 'zbyt długa nazwa!')
              .required('Wymagane!'),
            date: Yup.string().required('Wymagane!'),
            whyDetails: Yup.string(),
            email: Yup.string()
              .required('Email jest wymagany!')
              .max(50, 'zbyt długi email!')
              .email('Niepoprawny email!')
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (values.why === '') {
              values.why = 'other';
            }
            console.log(values);
            didSubmit = true;
            userConsent = values.consent;
            setSubmitting(false);
            this.forceUpdate();
          }}
        >
          {this.mainFormFormikFlow}
        </Formik>
      </div>
    );
  };

  mainFormFormikFlow = formikProps => {
    let { values, errors, handleSubmit, isSubmitting, submitCount } = formikProps;
    let tabs = [
      {
        tabButton: '1',
        tabContent: this.tabFromWhere(formikProps)
      },
      {
        tabButton: '2',
        tabContent: this.tabWhatHappend(formikProps)
      },
      {
        tabButton: '3',
        tabContent: this.tabWhy(formikProps)
      },
      {
        tabButton: '4',
        tabContent: this.tabFlightDetails(formikProps)
      },
      {
        tabButton: '5',
        tabContent: this.userDetails(formikProps)
      }
    ];
    return (
      <form onSubmit={handleSubmit}>
        <div id="navigation-pills">
          <div>
            <Steps
              nextPageUsed={this.nextPageUsed}
              toNextPage={this.state.toNextPage}
              ref={ref => (this.child = ref)}
              color="primary"
              isSubmitting={isSubmitting}
              errors={errors}
              submitCount={submitCount}
              values={values}
              didSubmit={didSubmit}
              tabs={tabs}
            />
          </div>
        </div>
      </form>
    );
  };

  somethingWentWrong = () => {
    const { classes } = this.props;
    return (
      <div className={[classes.section, 'formBackground'].join(' ')}>
        <span>
          <Paper elevation={5} className={[classes.tabContent, 'paperSpace'].join(' ')}>
            <div className="slideContent">
              <h3 className="justify-content-center">O nie!</h3>
              <h5>Coś poszło strasznie nie tak!</h5>
              <h5>
                Prosimy spróbować ponownie, jeśli ta informacja znowu się pojawi, bardzo prosimy o
                napisanie do nas. :(
              </h5>
            </div>
          </Paper>
          {/* <div className={'navBase'}>
          <Button
            disabled={this.props.isSubmitting}
            className={['nextButton'].join(' ')}
            type='submit'
          >
            Zapisz się na beta testy!
                    </Button>
        </div> */}
        </span>
      </div>
    );
  };

  thankYouBetaTest = () => {
    return (
      <div className={['formBackground'].join(' ')}>
        <div className={'outer'}>
          <div className={'middle middleButtonLess'}>
            <div className={'inner'}>
              <Paper elevation={5} className={['paperSpace'].join(' ')}>
                <div className="slideContent">
                  <h3 className="justify-content-center">Gratulacje!</h3>
                  <h5>Składanie wniosku przebiegło pomyślnie.</h5>
                  <h5>Skontaktujemy się z Tobą jak najszybciej :)</h5>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    );
  };
  thankYou = () => {
    return (
      <div className={['formBackground'].join(' ')}>
        <div className={'outer'}>
          <div className={'middle middleButtonLess'}>
            <div className={'inner'}>
              <Paper elevation={5} className={['paperSpace'].join(' ')}>
                <div className="slideContent">
                  <h3 className="justify-content-center">Gratulacje!</h3>
                  <h5>Składanie wniosku przebiegło pomyślnie.</h5>
                  <h5>Skontaktujemy się z Tobą jak najszybciej :)</h5>
                  <h5>
                    Przykro nam, że nie zapisałeś/aś się na beta testy, ale proszę rozważ to w
                    przyszłości.
                  </h5>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    if (!submitBeta && ownWill) {
      // sorry no compensation, maybe beta
      return this.noCompensationScreen();
    } else if (submitBeta) {
      return this.betaTesty();
    } else if (!didSubmit) {
      //firstStep of the form
      return this.mainForm();
    } else if (didSubmit && userConsent) {
      return this.thankYouBetaTest();
    } else if (didSubmit && (typeof userConsent === 'undefined' || !userConsent)) {
      return this.thankYou();
    } else {
      return this.somethingWentWrong();
    }
  }
}

export default withStyles(pillsStyle)(Form);
