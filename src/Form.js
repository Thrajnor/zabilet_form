import React from "react";

// import _ from 'lodash'

import * as Yup from 'yup'
import { Formik } from 'formik'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper'

//  @material-ui/icons components
import Timer from '@material-ui/icons/Timer'
import PanTool from '@material-ui/icons/PanTool'
import Cancel from '@material-ui/icons/Cancel'

// core components
import Steps from "components/Steps/Steps";
import Choose from 'components/Choose/Choose'
import AutoComplete from 'components/Input/AutoComplete'
import Input from 'components/Input/Input'
import Date from 'components/Input/Date'
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import RadioGroup from 'components/Input/Radio/RadioGroup'
import Radio from 'components/Input/Radio/Radio'
import Button from "components/CustomButtons/Button.jsx"

import './form.css'
// Airports Data
import AirportDatabase from 'data/airports-small.json'
import AirlineDatabase from 'data/airlanes-small.json'

// variables ==========================================================================
let didSubmit = false
let userConsent = false
let ownWill = false
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
      compensation: 400
    };
  }
  componentDidMount() {
    document.getElementById("fromWhere").focus();
  }
  // handleCompensation = (value) => {
  //   this.setState({compensation: value})
  // }
  // _airports = null
  airports = () => {
    return AirportDatabase
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
  }
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
    return AirlineDatabase
  }

  noCompensationScreen = () => {
    const { classes } = this.props;
    return (
      <div className={[classes.section, 'formBackground'].join(' ')}>
        <Formik
          validationSchema={
            Yup.object().shape({
              email: Yup.string()
                .email('Niepoprawny email!')
                .required('Email jest wymagany do zapisów na beta testy!'),
            })
          }
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            didSubmit = true;
            setSubmitting(false);
            this.forceUpdate()
          }}
        >
          {({ values, touched, errors, handleSubmit, handleChange, handleBlur }) => (
            <span>
              <form
                onSubmit={handleSubmit}>
                <Paper elevation={5} className={[classes.tabContent, 'paperSpace'].join(' ')}>
                  <div className='slideContent'>
                    <h3 className='justify-content-center'>Niestety!</h3>
                    <h5>Przejrzeliśmy Twoją petycję, jednak nie możliwe będzie uzyskanie odszkodowanie, ponieważ dobrowolnie zrezygnowałeś/aś z wejścia na pokład</h5>
                    {values.consent ?
                      (<h5>Na szczęście zaufałeś\aś nam w sprawie beta testów i już niedługo możliwe, ze okaże się, ze któryś z poprzednich Twoich lotów będzie objęty odszkodowaniem</h5>)
                      :
                      (<div>
                        <h5>Jednak może mimo to rozważył/a byś zapisanie się na beta testy naszej aplikacji która szanując w najwyższym stopniu Twoją prywatność, przeszukuje Twój email w poszukiwaniu starszych lub przyszłych biletów które zasługują na odszkodowanie?</h5>
                        <Input
                          placeholder='np. example@gmail.com'
                          label='Twój Email: '
                          name='email'
                          id='email'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && errors.email}
                          touched={touched.email} />
                      </div>)
                    }
                  </div>
                </Paper>
                <div className={'navBase'}>
                  <Button
                    disabled={this.props.isSubmitting}
                    className={['nextButton'].join(' ')}
                    type='submit'
                  >
                    Zapisz się na beta testy!
                        </Button>
                </div>
              </form>
            </span>
          )}
        </Formik>
      </div>
    )
  }

  tabFromWhere = ({ values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting, submitCount, setFieldValue }) => (
    <span>
      <div className='slideContent'>
        <h3 className='justify-content-center'>Cześć!</h3>
        <h6 className='form-text text-muted mb-3'>Za chwilę zajmiemy się Twoim odszkodowaniem, na razie odpowiedz na te kilka pytań dotyczących Twojego lotu.</h6>
        <GridContainer spacing={16}>
          <GridItem xs={12} sm={6}>
            <AutoComplete
              id='fromWhere'
              toWhat='airport'
              label='Miejsce wylotu:'
              name='fromWhere'
              placeholder='np. Tokio lub HND'
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
              id='toWhere'
              toWhat='airport'
              label='Miejsce przylotu:'
              name='toWhere'
              placeholder='np. Poland lub EPWR'
              value={values.toWhere}
              onChange={handleChange}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              error={touched.toWhere && errors.toWhere}
              touched={touched.toWhere}
              suggestions={this.airports()} />
          </GridItem>
        </GridContainer>
      </div>
    </span>
  )

  tabWhatHappend = ({ values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting, submitCount, setFieldValue, }) => (
    <span>
      <div className='slideContent'>
        <div className='pb-2 mb-3'>
          <h3>Co się stało?</h3>
          <small className="form-text text-muted">Linie lotnicze odpowiadają tylko za sytuacje, nad którymi mają względną kontrolę, jednak każdy przypadek jest indywidualny i bardzo często ustalenie odpowiedzialności odbywa się z korzyścią dla klienta.</small>
        </div>
        <RadioGroup
          values={values}
          onBlur={handleBlur}
          onChange={handleChange}
          name='whatHappend'
          grid={12}
          size='big'
          radios={[
            {
              icon: (<Timer />),
              label: 'Duże opóźnienie lądowania',
              value: 'delay',
            },
            {
              icon: (<PanTool />),
              label: 'Niewpuszczenie na pokład',
              value: 'boardingRefused',
            },
            {
              icon: (<Cancel />),
              label: 'Lot został odwołany',
              value: 'dismissed',
            },
          ]} />
      </div>
    </span>
  )

  tabWhy = ({ values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting, submitCount, setFieldValue, }) => (
    <span>
      <div className='slideContent'>
        <Choose
          values={values}
          onBlur={handleBlur}
          onChange={handleChange}
          setFieldValue={setFieldValue}
        // compensation={this.handleCompensation()}
        ></Choose>
      </div>
    </span>
  )

  tabFlightDetails = ({ values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting, submitCount, setFieldValue, }) => (
    <span>
      <div className='slideContent'>
        <h4>Wygląda na to, że może Ci się należeć nawet {this.state.compensation}euro !</h4>
        <h6>Podaj nam teraz te kilka detali dotyczących Twojego lotu:</h6>
        <span>
          <GridContainer spacing={16}>
            <GridItem xs={12} sm={6}>
              <AutoComplete
                label='Linia: '
                name='airlane'
                id='airlane'
                toWhat='airlane'
                placeholder='np. LOT Polish Airlines'
                value={values.airlane}
                onChange={handleChange}
                setFieldValue={setFieldValue}
                onBlur={handleBlur}
                error={touched.airlane && errors.airlane}
                touched={touched.airlane}
                suggestions={this.airlanes()} />
            </GridItem>
            <GridItem xs={5} sm={2}>
              <Input placeholder='np. 1234'
                label='Lot: '
                name='flight'
                id='flight'
                value={values.flight}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.flight && errors.flight}
                touched={touched.flight} />
            </GridItem>
            <GridItem xs={7} sm={4}>
              <Date type='date'
                label='Data: '
                name='date'
                id='date'
                value={values.date}
                values={values}
                onChange={handleChange}
                setFieldValue={setFieldValue}
                onBlur={handleBlur}
                error={touched.date && errors.date}
                touched={touched.date}
              />
            </GridItem>
          </GridContainer>
        </span>
      </div>
    </span>
  )
  userDetails = ({ values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting, submitCount, setFieldValue, }) => (
    <span>
      <div className='slideContent'>
        <h4>Super!</h4>
        <h6>Teraz potrzeba nam już tylko Twojego emaila do zarejestrowania zgłoszenia i opcjonalnie zgodę na beta testy:</h6>
        <span>
          <GridContainer spacing={16}>
            <GridItem xs={12}>
              <Input placeholder='example@gmail.com'
                label='E-mail: '
                name='email'
                id='email'
                type='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                touched={touched.email} />
            </GridItem>
            <GridItem xs={12}>
              <Radio
                label='Twoja opcjonalna zgoda na specjalne beta testy aplikacji która sama wyszukuje na Twoim emailu przeszłych i przyszłych lotów za które może Ci przysługiwać odszkodowanie!'
                name='consent'
                id='consent'
                type='checkbox'
                value={values.consent}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.consent && errors.consent}
                touched={touched.consent} />
            </GridItem>
          </GridContainer>
        </span>
      </div>
    </span>
  )

  tabCongrats = ({ values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting, submitCount, setFieldValue, }) => (
    <span>
      <div className='slideContent'>
        <h4>Wygląda na to, że może Ci się należeć nawet {this.state.compensation}euro !</h4>
        <h4>Podaj jeszcze tylko te kilka informacji:</h4>
        <span>
          <GridContainer spacing={16}>
            <GridItem xs={12}>
              <h3 className='justify-content-center'>Gratulacje!</h3>
              <h5>Twój wniosek został pomyślnie przesłany</h5>
              <h6>Może rozważył/a byś zapisanie się na beta testy naszej aplikacji która szanując w najwyższym stopniu Twoją prywatność, przeszukuje Twój email w poszukiwaniu starszych lub przyszłych biletów które zasługują na odszkodowanie?</h6>
            </GridItem>
          </GridContainer>
        </span>
      </div>
    </span>
  )

  mainForm = () => {
    const { classes } = this.props;
    return (
      <div className={[classes.section, 'formBackground'].join(' ')}>
        <Formik
          validationSchema={
            Yup.object().shape({
              fromWhere: Yup.string()
                .required('Lotnisko jest wymagane!'),
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
                .required('Pole Wymagane!'),
              date: Yup.string()
                .required('Data jest wymagana!'),
              email: Yup.string()
                .required('Email jest wymagany!')
                .max(50, 'zbyt długi email!')
                .email('Niepoprawny email!')
            })
          }
          onSubmit={(values, { setSubmitting }) => {
            if (values.whatHappend === 'deniedBoarding' && values.why === 'ownWill') {
              ownWill = true
              didSubmit = true;
              return this.forceUpdate()
            } else {
              console.log(values);
              if (values.why === '') {
                values.why = 'other'
              }
              console.log(values);
              didSubmit = true;
              userConsent = values.consent
              setSubmitting(false);
              this.forceUpdate();
            }
          }}
        >
          {this.mainFormFormikFlow}
        </Formik>
      </div >
    );
  }

  mainFormFormikFlow = (formikProps) => {
    let { values, errors, handleSubmit, isSubmitting, submitCount, } = formikProps
    let tabs = [
      {
        tabButton: "1",
        tabContent: this.tabFromWhere(formikProps)
      },
      {
        tabButton: "2",
        tabContent: this.tabWhatHappend(formikProps)
      },
      {
        tabButton: "3",
        tabContent: this.tabWhy(formikProps)
      },
      {
        tabButton: "4",
        tabContent: this.tabFlightDetails(formikProps)
      },
      {
        tabButton: "5",
        tabContent: this.userDetails(formikProps)
      }
    ]
    return (
      <form
        onSubmit={handleSubmit}>

        <div id="navigation-pills">
          <div>
            <Steps
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
    )
  }

  somethingWentWrong = () => {
    const { classes } = this.props
    return (
      <div className={[classes.section, 'formBackground'].join(' ')}>
        <span>
          <Paper elevation={5} className={[classes.tabContent, 'paperSpace'].join(' ')}>
            <div className='slideContent'>
              <h3 className='justify-content-center'>O nie!</h3>
              <h5>Coś poszło strasznie nie tak!</h5>
              <h5>Prosimy spróbować ponownie, jeśli ta informacja znowu się pojawi, bardzo prosimy o napisanie do nas. :(</h5>
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
    )
  }

  thankYouBetaTest = () => {
    return (
      <div className={['formBackground'].join(' ')}>
        <div className={'outer'}>
          <div className={'middle'}>
            <div className={'inner'}>
              <Paper elevation={5} className={['paperSpace'].join(' ')}>
                <div className='slideContent'>
                  <h3 className='justify-content-center'>Gratulacje!</h3>
                  <h5>Składanie wniosku przebiegło pomyśle!</h5>
                  <h5>I dziękujemy za Twoje zaufanie! Obiecujemy, że go nie zawiedziemy :)</h5>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    )
  }
  thankYou = () => {
    return (
      <div className={['formBackground'].join(' ')}>
        <div className={'outer'}>
          <div className={'middle'}>
            <div className={'inner'}>
              <Paper elevation={5} className={['paperSpace'].join(' ')}>
                <div className='slideContent'>
                  <h3 className='justify-content-center'>Gratulacje!</h3>
                  <h5>Twoj wniosek został pomyślnie złożony</h5>
                  <h5>Przykro nam, że nie zapisałeś/aś się na beta testy, ale proszę rozważ to w przyszłości.</h5>
                </div>
              </Paper>
            </div>
          </div >
        </div >
      </div >
    )
  }

  render() {

    if (ownWill) { // sorry no compensation, maybe beta
      return this.noCompensationScreen()
    } else if (!didSubmit) { //firstStep of the form
      return this.mainForm()
    } else if (didSubmit === true && userConsent === true) {
      return this.thankYouBetaTest()
    } else if (didSubmit === true && (typeof userConsent === 'undefined' || userConsent === false)) {
      return this.thankYou()
    } else {
      return this.somethingWentWrong()
    }
  }
}

export default withStyles(pillsStyle)(Form);
