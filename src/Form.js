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
import RadioGroup from 'components/Radio/RadioGroup'
import Button from "components/CustomButtons/Button.jsx"

import './form.css'
// Airports Data
import AirportDatabase from 'data/airports-small.json'
import AirlineDatabase from 'data/airlanes-small.json'

// variables ==========================================================================
let didSubmit = false
let emailGiven = false
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
            emailGiven = true
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
                    <h3 className='justify-content-center'>Gratulacje!</h3>
                    <h5>Przejrzeliśmy Twoją petycję, jednak nie możliwe będzie uzyskanie odszkodowanie, ponieważ dobrowolnie zrezygnowałeś/aś z wejścia na pokład</h5>
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
        <h5>Za moment zajmiemy się Twoim odszkodowaniem, narazie odpowiedz na te kilka pytań dotyczących Twojego lotu :)</h5>
        <GridContainer spacing={16}>
          <GridItem xs={12} sm={6}>
            <AutoComplete
              id='fromWhere'
              label='Miejsce wylotu:'
              name='fromWhere'
              placeholder='np. Tokio, lub HND'
              value={values.formWhere}
              onChange={handleChange}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              suggestions={this.airports()}
              error={touched.fromWhere && errors.fromWhere}
              touched={touched.fromWhere} />
          </GridItem>
          <GridItem xs={12} sm={6}>
            <AutoComplete
              id='toWhere'
              label='Miejsce przylotu:'
              name='toWhere'
              placeholder='np. Poland, lub EPWR'
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
          <h3>Co się stało ?</h3>
          <small className="form-text text-muted">Linie lotnicze odpowiadają tylko za sytuacje nad którymi mają względną kontrolę, jednak każdy przypadek jest indywidualny i bardzo często ustalenie odpowiedzialności odbywa się z korzyścią dla klienta.</small>
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
              label: 'Nie przyjęli mnie na pokład',
              value: 'boardingRefused',
            },
            {
              icon: (<Cancel />),
              label: 'Lot został Odwołany',
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
        // compensation={this.handleCompensation()}
        ></Choose>
      </div>
    </span>
  )

  tabFlightDetails = ({ values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting, submitCount, setFieldValue, }) => (
    <span>
      <div className='slideContent'>
        <h4>Wygląda na to, że może Ci się należeć nawet {this.state.compensation}euro !</h4>
        <h4>Podaj jeszcze tylko te kilka informacji:</h4>
        <span>
          <GridContainer spacing={16}>
            <GridItem xs={12} sm={6}>
              <AutoComplete placeholder='np. LOT Polish Airlines'
                label='Linia: '
                name='airlane'
                id='airlane'
                value={values.airlane}
                onChange={handleChange}
                setFieldValue={setFieldValue}
                onBlur={handleBlur}
                error={touched.airlane && errors.airlane}
                suggestions={this.airlanes()}
                touched={touched.airlane} />
            </GridItem>
            <GridItem xs={4} sm={2}>
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
            <GridItem xs={8} sm={4}>
              <Date type='date'
                label='Data: '
                name='date'
                id='date'
                value={values.date}
                onChange={handleChange}
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

  tabCongrats = ({ values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting, submitCount, setFieldValue, }) => (
    <span>
      <div className='slideContent'>
        <div className='mb-5'>
          <h3>Co się stało ?</h3>
          <small className="form-text text-muted">Linie lotnicze odpowiadają tylko za sytuacje nad którymi mają względną kontrolę, jednak każdy przypadek jest indywidualny i bardzo często ustalenie odpowiedzialności odbywa się z korzyścią dla klienta.</small>
        </div>
      </div>
    </span>
  )

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
        tabContent: this.tabCongrats(formikProps)
      },
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
                .required('Numer lotu jest wymagany!'),
              date: Yup.date()
                .max(50, 'zbyt długa data!')
                .required('Data jest wymagana!'),
              email: Yup.string()
                .max(50, 'zbyt długi email!')
                .email('Niepoprawny email!')
              //   .required('Email jest wymagany do zapisów na beta testy!'),
            })
          }
          onSubmit={(values, { setSubmitting }) => {
            if (values.whatHappend === 'deniedBoarding' && values.why === 'ownWill') {
              ownWill = true
              return this.forceUpdate()
            } else {
              console.log(values);
              didSubmit = true;
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

  congratScreen = () => {
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
            emailGiven = true
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
                    <h3 className='justify-content-center'>Gratulacje!</h3>
                    <h5>Twój wniosek został pomyślnie przesłany</h5>
                    <h5>Może rozważył/a byś zapisanie się na beta testy naszej aplikacji która szanując w najwyższym stopniu Twoją prywatność, przeszukuje Twój email w poszukiwaniu starszych lub przyszłych biletów które zasługują na odszkodowanie?</h5>
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

  thankYouBetaTest = () => {
    return (
      <div className={['formBackground'].join(' ')}>
        <Paper elevation={5} className={['paperSpace'].join(' ')}>
          <div className='slideContent'>
            <h3 className='justify-content-center'>Gratulacje!</h3>
            <h5>Dziękujemy za Twoje zaufanie!</h5>
            <h5>Obiecujemy, że go nie zawiedziemy :)</h5>
          </div>
        </Paper>
      </div>
    )
  }

  render() {

    if (ownWill) { // sorry no compensation, maybe beta
      return this.noCompensationScreen()
    } else if (!didSubmit) { //firstStep of the form
      return this.mainForm()
    } else if (didSubmit === true && emailGiven === false) {
      return this.congratScreen()
    } else {
      return this.thankYouBetaTest()
    }
  }
}

export default withStyles(pillsStyle)(Form);
