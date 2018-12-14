import '@babel/polyfill';
import React from 'react';

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

// Google Analitics
// import ReactGA from 'react-ga';

const styles = {
  loading: {
    fontSize: '3rem',
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  loadingIcon: {
    position: 'relative',
    left: '50%',
    width: '50px',
    transform: 'translateX(-50%)'
  },
  ...pillsStyle
};

// Airports Data
// import AirportDatabase from 'https://cdn.jsdelivr.net/gh/Thrajnor/zabilet_form/src/data/airports-small.json';
// import AirlineDatabase from 'data/airlanes-small.json';
// CONPONENT ======================================================================

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userConsent: false,
      requestID: '',
      didSubmit: false,
      compensation: 400,
      toNextPage: false,
      loading: false,
      error: false
    };
  }
  handleErrors = response => {
    if (!response.ok) {
      // ReactGA.exception({
      //   description: response.message
      // });
      window.gtag('event', 'exception', {
        description: response.message
      });
      throw new Error('HTTP error, status = ' + response.status);
    }
    return response.json();
  };

  componentDidMount() {
    document.getElementById('fromWhere') && document.getElementById('fromWhere').focus();
    fetch('https://cdn.jsdelivr.net/gh/Thrajnor/CDN-data/airports-small.min.json')
      .then(response => response.json())
      .then(AirportDatabase => this.setState({ AirportDatabase }));
    fetch('https://cdn.jsdelivr.net/gh/Thrajnor/CDN-data/airlanes-small.min.json')
      .then(response => response.json())
      .then(AirlineDatabase => this.setState({ AirlineDatabase }));
  }

  nextPage = () => {
    this.setState({ toNextPage: true });
  };
  nextPageUsed = () => {
    this.setState({ toNextPage: false });
  };

  airportsDetails = (name, details) => {
    if (name === 'toWhere') {
      this.setState({ toWhere: details });
    } else if (name === 'fromWhere') {
      this.setState({ fromWhere: details });
    }
  };

  resetButton = () => (
    <Button
      onClick={() => {
        // ReactGA.event({
        //   category: 'Form Reset',
        //   action: 'Reset'
        // });
        window.gtag('event', 'Reset_Form', {
          event_category: 'Form'
        });
        this.props.ownWillHandler(false);
        this.setState({
          didSubmit: false,
          userConsent: false
        });
      }}
      className={'prevButton'}
      type="button"
    >
      Kolejny bilet
    </Button>
  );

  tabPolicy = ({
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
          <GridItem xs={12}>
            <Radio
              label={'Oto nasz '}
              link={'Regulamin'}
              name="consentRules"
              type="checkbox"
              values={values}
              value={values.consentRules}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.consentRules && errors.consentRules}
              touched={touched.consentRules}
            />
          </GridItem>
          <GridItem xs={12}>
            <Radio
              label={'Niżej można znaleźć naszą '}
              link={'Politykę prywatności'}
              name="consentPolicy"
              type="checkbox"
              values={values}
              value={values.consentPolicy}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.consentPolicy && errors.consentPolicy}
              touched={touched.consentPolicy}
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
      </div>
    </span>
  );
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
        <h3 className="justify-content-center">Rozpocznijmy!</h3>
        <h6 className="form-text text-muted mb-3">
          Odszkodowanie za problematyczny lot należy Ci się nawet do 3 lat wstecz, pod warunkiem, że
          miejsce wylotu lub docelowe (albo oba) to terytorium Unii Europejskiej.
        </h6>
        <GridContainer spacing={16}>
          <GridItem xs={12} md={6}>
            <AutoComplete
              id="fromWhere"
              toWhat="airport"
              label="Miejsce wylotu:"
              name="fromWhere"
              airportsDetails={this.airportsDetails}
              placeholder="np. Warsaw lub WAW"
              value={values.formWhere}
              onChange={handleChange}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              values={values}
              suggestions={this.state.AirportDatabase}
              error={touched.fromWhere && errors.fromWhere}
              touched={touched.fromWhere}
            />
          </GridItem>
          <GridItem xs={12} md={6}>
            <AutoComplete
              id="toWhere"
              toWhat="airport"
              label="Miejsce przylotu:"
              name="toWhere"
              airportsDetails={this.airportsDetails}
              placeholder="np. Wroclaw lub WRO "
              value={values.toWhere}
              onChange={handleChange}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              values={values}
              error={touched.toWhere && errors.toWhere}
              touched={touched.toWhere}
              suggestions={this.state.AirportDatabase}
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
              value: 'opóźnienie'
            },
            {
              icon: <PanTool />,
              label: 'Niewpuszczenie na pokład',
              value: 'niewpuszczenie_na_pokład'
            },
            {
              icon: <Cancel />,
              label: 'Lot został odwołany',
              value: 'lot_został_odwołany'
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
          ownWillHandler={this.props.ownWillHandler}
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
            <GridItem xs={12} md={6}>
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
                suggestions={this.state.AirlineDatabase}
              />
            </GridItem>
            <GridItem xs={5} md={2}>
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
            <GridItem xs={7} md={4}>
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
    setErrors,
    setFieldValue,
    setFieldTouched
  }) => (
    <span>
      <div className="slideContent">
        <h4>To już ostatni krok!</h4>
        <h6 className="mb-3">Podaj nam swój adres email, abyśmy mogli się z Tobą skontaktować.</h6>
        <span>
          <GridContainer spacing={16}>
            <GridItem xs={12}>
              <Input
                placeholder="example@gmail.com"
                label="Twój e-mail: "
                name="email"
                id="email"
                type="email"
                value={values.email}
                values={values}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                touched={touched.email}
              />
            </GridItem>
            <GridItem xs={12}>
              <Input
                placeholder="example@gmail.com"
                label="Potwierdź e-mail: "
                name="confirmEmail"
                id="confirmEmail"
                type="email"
                value={values.confirmEmail}
                values={values}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmEmail && errors.confirmEmail}
                touched={touched.confirmEmail}
              />
            </GridItem>
          </GridContainer>
        </span>
      </div>
    </span>
  );

  mainForm = () => {
    return (
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
          email: Yup.string()
            .required('Email jest wymagany!')
            .max(50, 'zbyt długi email!')
            .email('Niepoprawny email!'),
          confirmEmail: Yup.string()
            .required('Potwierdź email!')
            .max(50, 'zbyt długi email!')
            .email('Niepoprawny email!')
            .test('match', 'Emaile muszą się zgadzać!', function(emailConfirmation) {
              return emailConfirmation === this.parent.email;
            }),
          consentPolicy: Yup.boolean().oneOf([true], 'Wymagana zgoda'),
          consentRules: Yup.boolean().oneOf([true], 'Wymagana zgoda')
        })}
        initialValues={{
          fromWhere: '',
          toWhere: '',
          airlane: '',
          flight: '',
          date: '',
          email: '',
          confirmEmail: '',
          consent: false,
          consentPolicy: false,
          consentRules: false
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const This = this;
          if (values.why === '') {
            values.why = 'other';
          }
          let requestSubject =
            (this.state.fromWhere.city ? this.state.fromWhere.city : values.fromWhere) +
            ' ' +
            (this.state.toWhere.city ? this.state.toWhere.city : values.toWhere) +
            ' ' +
            values.date;

          const date = 'Witam, dnia ' + values.date;
          let travel = '';
          let couse = '';
          if (values.whatHappend === 'opóźnienie') {
            travel = ' leciałem/am z ' + values.fromWhere + ' do ' + values.toWhere;
            couse = '. Samolot wylądował w miejscu docelowym z ponad 3 godzinnym opóźnieniem ';
          } else if (values.whatHappend === 'niewpuszczenie_na_pokład') {
            travel = ' planowałem/am lecieć z ' + values.fromWhere + ' do ' + values.toWhere;
            couse = ', jednak odmówiono mi wejścia na pokład ';
          } else if (values.whatHappend === 'lot_został_odwołany') {
            travel = ' planowałem/am lecieć z ' + values.fromWhere + ' do ' + values.toWhere;
            couse = ', jednak lot został odwołany mniej niż na 2 tygodnie przed odlotem ';
          } else {
            travel =
              ' planowałem/am bezproblemowo przelecieć z ' +
              values.fromWhere +
              ' do ' +
              values.toWhere;
            couse = ', jednak niestety nastąpiły komplikacje ';
          }
          const body = date + travel + couse + 'i potrzebuje pomocy w uzyskaniu odszkodowania.';

          This.setState({
            loading: true,
            error: false
          });

          fetch('https://zabilet.zendesk.com/api/v2/requests.json', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              request: {
                requester: { name: values.email, email: values.email },
                subject: requestSubject,
                custom_fields: [
                  { 360008313294: values.flight },
                  { 360008249493: values.airlane },
                  { 360008249553: values.fromWhere },
                  { 360008249573: values.toWhere },
                  { 360008313574: values.date },
                  { 360008249493: values.airlane },
                  { 360011764713: values.whatHappend },
                  { 360011845134: values.why },
                  { 360011767173: values.whyDetails },
                  { 360012245253: values.consent },
                  { 360012245073: values.consentPolicy },
                  { 360012245033: values.consentRules }
                ],
                is_public: false,
                comment: { body: body }
              }
            })
          })
            .then(response => this.handleErrors(response))
            .then(myJson => {
              This.setState({
                requestID: myJson.request.id,
                loading: false,
                error: false,
                didSubmit: true,
                userConsent: values.consent
              });
              // ReactGA.event({
              //   category: 'Form Submit',
              //   action: 'Submitted MainForm'
              // });
              window.gtag('event', 'Submitted_MainForm', {
                event_category: 'Form'
              });
              setSubmitting(false);
              resetForm(values);
            })
            .catch(e => {
              // ReactGA.exception({
              //   description: e.message
              // });

              window.gtag('event', 'exception', {
                description: e.message
              });
              This.setState({
                loading: false,
                error: e
              });
            });
        }}
      >
        {this.mainFormFormikFlow}
      </Formik>
    );
  };

  mainFormFormikFlow = formikProps => {
    let { values, errors, handleSubmit, isSubmitting, submitCount, setFieldTouched } = formikProps;
    let tabs = [
      {
        tabButton: '1',
        tabContent: this.tabPolicy(formikProps)
      },
      {
        tabButton: '2',
        tabContent: this.tabFromWhere(formikProps)
      },
      {
        tabButton: '3',
        tabContent: this.tabWhatHappend(formikProps)
      },
      {
        tabButton: '4',
        tabContent: this.tabWhy(formikProps)
      },
      {
        tabButton: '5',
        tabContent: this.tabFlightDetails(formikProps)
      },
      {
        tabButton: '6',
        tabContent: this.userDetails(formikProps)
      }
    ];
    let content;
    if (this.state.error && !this.state.loading) {
      content = (
        <div className={'outer'}>
          <div className={'middle'}>
            <div className={'inner'}>{this.tryAgain()}</div>
          </div>
        </div>
      );
    } else if (this.state.loading) {
      content = (
        <div className={'outer'}>
          <div className={'middle'}>
            <div className={'inner'}>{this.loading()}</div>
          </div>
        </div>
      );
    } else {
      content = (
        <Steps
          setFieldTouched={setFieldTouched}
          nextPageUsed={this.nextPageUsed}
          toNextPage={this.state.toNextPage}
          ref={ref => (this.child = ref)}
          color="primary"
          isSubmitting={isSubmitting}
          errors={errors}
          submitCount={submitCount}
          values={values}
          didSubmit={this.state.didSubmit}
          tabs={tabs}
        />
      );
    }
    return (
      <form onSubmit={handleSubmit}>
        <div id="navigation-pills">
          <div>{content}</div>
        </div>
      </form>
    );
  };

  loading = () => {
    return (
      <h3 style={styles.loading}>
        <div style={styles.loadingIcon} className={'lds-dual-ring'} />
        <div>Proszę czekać</div>
      </h3>
    );
  };
  somethingWentWrong = () => {
    const { classes } = this.props;
    return (
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
    );
  };

  tryAgain = () => {
    const { classes } = this.props;
    let content;
    if (this.state.error && this.state.error.message === 'HTTP error, status = 422') {
      content = (
        <div>
          <h5>Wygląda na to, że server nie rozumie co dostał!</h5>
          <h5>
            Prosimy spróbować ponownie, jeśli ta informacja znowu się pojawi, bardzo prosimy o
            napisanie do nas emaila na adres{' '}
            <a href="mailto:kontakt@zabilet.pl">kontakt@zabilet.pl</a> :(
          </h5>
        </div>
      );
    } else if (this.state.error && this.state.error.message === 'Failed to fetch') {
      content = (
        <div>
          <h5>Wygląda na to, że nie udało się wysłać zgłoszenia!</h5>
          <h5>
            Najprawdopodobniej jest to spowodowane brakiem dostępu do internetu, proszę się upewnić
            urządzenie ma dostęp do internetu i spróbować ponownie.
          </h5>
          <h5>
            Jeśli błąd się powtarza mimo dostępu do internetu proszę skontaktować się z nami pod
            adresem: <a href="mailto:kontakt@zabilet.pl">kontakt@zabilet.pl</a> :(
          </h5>
        </div>
      );
    }
    return (
      <div>
        <Paper elevation={5} className={[classes.tabContent, 'paperSpace'].join(' ')}>
          <div className="slideContent">
            <h3 className="justify-content-center">O nie!</h3>
            {content || (
              <div>
                <h5>Coś poszło strasznie nie tak!</h5>
                <h5>
                  Prosimy spróbować ponownie, jeśli ta informacja znowu się pojawi, bardzo prosimy o
                  napisanie do nas emaila na adres{' '}
                  <a href="mailto:kontakt@zabilet.pl">kontakt@zabilet.pl</a> :(
                </h5>
              </div>
            )}
            <p>Kod błędu: {this.state.error && this.state.error.message}</p>
          </div>
        </Paper>
        <div className={'navBase'}>
          <Button className={'wholeButton'} type="submit">
            Spróbuj ponownie
          </Button>
        </div>
      </div>
    );
  };

  thankYou = () => {
    return (
      <div>
        <Paper elevation={5} className={['paperSpace'].join(' ')}>
          <div className="slideContent">
            <h3 className="justify-content-center">Gratulacje!</h3>
            <h5>Składanie wniosku przebiegło pomyślnie.</h5>
            <h5>
              Za chwilę otrzymasz maila z podsumowaniem Twojego zgłoszenia o ID:{' '}
              {this.state.requestID}, a my skontaktujemy się z Tobą wkrótce.
            </h5>
            {this.state.userConsent ? (
              <h5>
                szkoda że nie zapisałeś/aś się na beta testy, ale proszę rozważ to w przyszłości.
              </h5>
            ) : (
              ''
            )}
          </div>
        </Paper>
        <div className={'navBase'}>
          {this.resetButton()}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={'https://zabilet.zendesk.com/hc/pl/requests/' + this.state.requestID}
          >
            <Button className={'nextButton'} type="button">
              Sprawdź swoje zgłoszenie!
            </Button>
          </a>
        </div>
      </div>
    );
  };

  render() {
    let content;
    if (!this.state.didSubmit) {
      return this.mainForm();
    } else if (this.state.didSubmit) {
      content = this.thankYou();
    } else {
      content = this.somethingWentWrong();
    }
    return (
      <div className={'outer'}>
        <div className={'middle'}>
          <div className={'inner'}>{content}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Form);
