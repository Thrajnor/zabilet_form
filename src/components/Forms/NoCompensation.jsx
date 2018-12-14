import '@babel/polyfill';
import React from 'react';

import * as Yup from 'yup';
import { Formik } from 'formik';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

//  @material-ui/icons components

// core components
import Input from 'components/Input/Input';
import pillsStyle from 'assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Radio from 'components/Input/Radio/Radio';
import Button from 'components/CustomButtons/Button.jsx';

// Google Analitics
// import ReactGA from 'react-ga';

const styles = {
  loading: {
    fontSize: '3rem',
    position: 'absolute',
    top: '50%',
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

class NoCompensation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      submitBeta: false
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

  noCompensationScreen = () => {
    return (
      <Formik
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required('Email jest wymagany do zapisów na beta testy!')
            .email('Niepoprawny email!'),
          confirmEmail: Yup.string()
            .required('Potwierdź email!')
            .max(50, 'zbyt długi email!')
            .email('Niepoprawny email!')
            .test('match', 'Emaile muszą się zgadzać!', function(emailConfirmation) {
              return emailConfirmation === this.parent.email;
            }),
          consent: Yup.boolean().oneOf([true], 'Wymagana zgoda na beta testy')
        })}
        initialValues={{
          email: '',
          confirmEmail: '',
          consent: false
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const This = this;
          const requestSubject = 'Beta testy';
          const body =
            'Niestety, lot za który próbowałem dostać odszkodowanie, nie podlega mu. Jednak mam nadzieje, że w mojej skrzynce pocztowej znajdą się zaległe loty za które dostanę odszkodowanie. więc z chęcią zapiszę sie na beta testy Waszej aplikacji.';
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
                  { 360012245253: values.consent },
                  { 360012245073: true },
                  { 360012245033: true }
                ],
                is_public: false,
                comment: { body: body }
              }
            })
          })
            .then(response => this.handleErrors(response))
            .then(myJson => {
              This.setState({
                loading: false,
                error: false
              });
              // ReactGA.event({
              //   category: 'Form Submit',
              //   action: 'Submitted Betatest'
              // });
              window.gtag('event', 'Submitted_BetaTest', {
                event_category: 'Form'
              });
              this.setState({ submitBeta: true });
              setSubmitting(false);
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
          if (window.MyVars.send_to) {
            window.gtag('event', 'conversion', {
              send_to: window.MyVars.send_to
            });
          } else {
            window.gtag('event', 'Conversion_Without_Tag', {
              event_category: 'Form'
            });
          }
          this.setState({
            error: false,
            loading: true
          });
          // console.log(values);
        }}
      >
        {this.noCompensationContent}
      </Formik>
    );
  };

  noCompensationContent = ({
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldTouched
  }) => {
    const { classes } = this.props;
    let content;
    if (this.state.error && !this.state.loading) {
      content = this.tryAgain();
    } else if (this.state.loading) {
      content = this.loading();
    } else {
      content = (
        <div className={'outer'}>
          <div className={'middle middleButtonLess'}>
            <div className={'inner'}>
              <form onSubmit={handleSubmit}>
                <Paper elevation={5} className={[classes.tabContent, 'paperSpace'].join(' ')}>
                  <div className="slideContent">
                    <h4 className="justify-content-center">Niestety!</h4>
                    <p className="mb-4">
                      Ponieważ dobrowolnie zrezygnowałeś/aś z wejścia na pokład nie będzie możliwe
                      uzyskanie odszkodowania. Możesz jednak zapisać się na beta testy naszej
                      aplikacji, która szanując Twoją prywatność, sprawdzi czy na skrzynce pocztowej
                      masz więcej biletów mogących podlegać odszkodowaniu
                    </p>
                    <GridContainer spacing={16}>
                      <GridItem xs={12}>
                        <Input
                          placeholder="np. example@gmail.com"
                          label="Twój email: "
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
                        <Input
                          placeholder="np. example@gmail.com"
                          label="Potwierdź email: "
                          name="confirmEmail"
                          id="confirmEmail"
                          value={values.confirmEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.confirmEmail && errors.confirmEmail}
                          touched={touched.confirmEmail}
                        />
                      </GridItem>
                      <GridItem xs={12}>
                        <Radio
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
                    onClick={() => {
                      // ReactGA.event({
                      //   category: 'Form Reset',
                      //   action: 'Reset'
                      // });
                      window.gtag('event', 'Reset_Form', {
                        event_category: 'Form'
                      });
                      this.props.ownWillHandler(false);
                    }}
                    className={'prevButton'}
                    type="button"
                  >
                    Kolejny bilet
                  </Button>
                  <Button
                    disabled={this.props.isSubmitting}
                    onClick={() => setFieldTouched(values)}
                    className={['nextButton'].join(' ')}
                    type="submit"
                  >
                    Zapisz się na beta testy!
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return <span>{content}</span>;
  };

  betaTesty = () => (
    <div className={'outer'}>
      <div className={'middle'}>
        <div className={'inner'}>
          <Paper elevation={5} className={['paperSpace'].join(' ')}>
            <div className="slideContent">
              <h3 className="justify-content-center">Pomyślnie zapisałeś/aś się na beta testy!</h3>
              <h5>
                Gdy nasza aplikacja będzie gotowa sprawdzimy czy na Twojej skrzynce jest więcej
                biletów, za które należy Ci się odszkodowanie.
              </h5>
            </div>
          </Paper>
          <div className={'navBase'}>
            <Button
              onClick={() => {
                // ReactGA.event({
                //   category: 'User',
                //   action: 'Reset'
                // });

                window.gtag('event', 'Reset_Form', {
                  event_category: 'Form'
                });
                this.props.ownWillHandler(false);
              }}
              className={['prevButton'].join(' ')}
              type="button"
            >
              Kolejny bilet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  loading = () => {
    return (
      <span>
        <h3 style={styles.loading}>
          <div style={styles.loadingIcon} className={'lds-dual-ring'} />
          <div>Proszę czekać</div>
        </h3>
      </span>
    );
  };
  somethingWentWrong = () => {
    const { classes } = this.props;
    return (
      <span>
        <div className={'outer'}>
          <div className={'middle middleButtonLess'}>
            <div className={'inner'}>
              <Paper elevation={5} className={[classes.tabContent, 'paperSpace'].join(' ')}>
                <div className="slideContent">
                  <h3 className="justify-content-center">O nie!</h3>
                  <h5>Coś poszło strasznie nie tak!</h5>
                  <h5>
                    Prosimy spróbować ponownie, jeśli ta informacja znowu się pojawi, bardzo prosimy
                    o napisanie do nas. :(
                  </h5>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </span>
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
            <a
              onClick={() => {
                window.gtag('event', 'Go_To_Mail_422_Bad_Json_Sent', {
                  event_category: 'outbound',
                  event_label: 'mailto:kontakt@zabilet.pl',
                  transport_type: 'beacon',
                  event_callback: function() {
                    document.location = 'mailto:kontakt@zabilet.pl';
                  }
                });
              }}
              href="mailto:kontakt@zabilet.pl"
            >
              kontakt@zabilet.pl
            </a>{' '}
            :(
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
            adresem:{' '}
            <a
              onClick={() => {
                window.gtag('event', 'Go_To_Mail_Cant_Send_Form', {
                  event_category: 'outbound',
                  event_label: 'mailto:kontakt@zabilet.pl',
                  transport_type: 'beacon',
                  event_callback: function() {
                    document.location = 'mailto:kontakt@zabilet.pl';
                  }
                });
              }}
              href="mailto:kontakt@zabilet.pl"
            >
              kontakt@zabilet.pl
            </a>{' '}
            :(
          </h5>
        </div>
      );
    }
    return (
      <span>
        <div className={'outer'}>
          <div className={'middle middleButtonLess'}>
            <div className={'inner'}>
              <Paper elevation={5} className={[classes.tabContent, 'paperSpace'].join(' ')}>
                <div className="slideContent">
                  <h3 className="justify-content-center">O nie!</h3>
                  {content || (
                    <div>
                      <h5>Coś poszło strasznie nie tak!</h5>
                      <h5>
                        Prosimy spróbować ponownie, jeśli ta informacja znowu się pojawi, bardzo
                        prosimy o napisanie do nas emaila na adres{' '}
                        <a 
                    onClick={() => {
                      window.gtag('event', 'Go_To_Mail_Error_' + this.state.error && this.state.error.message, {
                        event_category: 'outbound',
                        event_label: 'mailto:kontakt@zabilet.pl',
                        transport_type: 'beacon',
                        event_callback: function() {
                          document.location = 'mailto:kontakt@zabilet.pl';
                        }
                      });
                    }} href="mailto:kontakt@zabilet.pl">kontakt@zabilet.pl</a> :(
                      </h5>
                    </div>
                  )}
                  <p>Kod błędu: {this.state.error && this.state.error.message}</p>
                </div>
              </Paper>
              <div className={'navBase'}>
                <Button className={['wholeButton'].join(' ')} type="submit">
                  Spróbuj ponownie
                </Button>
              </div>
            </div>
          </div>
        </div>
      </span>
    );
  };

  render() {
    let content;
    if (!this.state.submitBeta) {
      // sorry no compensation, maybe beta
      content = this.noCompensationScreen();
    } else if (this.state.submitBeta) {
      content = this.betaTesty();
    }
    return <div>{content}</div>;
  }
}

export default withStyles(styles)(NoCompensation);
