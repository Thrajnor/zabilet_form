import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Steps from "components/Steps/Steps";
import Choose from 'components/Choose/Choose'
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";

import './form.css'
import Input from "components/Input/Input";
import Formsy from 'formsy-react';

class SectionPills extends React.Component {
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = { canSubmit: false };
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  submit(model) {
    fetch('http://example.com/', {
      method: 'post',
      body: JSON.stringify(model)
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={[classes.section, 'formBackground'].join(' ')}>

        <Formsy onValidSubmit={this.submit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}>

          <div id="navigation-pills">
            <div>
              <Steps
                color="primary"
                tabs={[
                  {
                    tabButton: "1",
                    tabContent: (
                      <span>
                        <div className='slideContent'>
                          <h2>Cześć! Za moment zajmiemy się Twoim problemem, narazie odpowiedz na te kilka pytań :)</h2>
                          <h3>Skąd dokąd leciałeś/aś</h3>
                          <span>
                            <label>
                              Skąd? :
                              <Input type='text'
                                name='fromWhere'
                                validations="isEmail"
                                validationError="To nie jest poprawne miasto"
                                placeholder='np. Wrocław, lub W-w'
                                required />
                            </label>
                            <label>
                              Dokąd? :
                              <Input type='text'
                                name='toWhere'
                                validations="isEmail"
                                validationError="To nie jest poprawne miasto"
                                placeholder='np. Oslo'
                                required />
                            </label>
                          </span>
                        </div>
                      </span>
                    )
                  },
                  {
                    tabButton: "2",
                    tabContent: (
                      <span>
                        <div className='slideContent'>
                          <h2>Co się stało ?</h2>
                          <Choose></Choose>
                        </div>
                      </span>
                    )
                  },
                  {
                    tabButton: "3",
                    tabContent: (
                      <span>
                        <div className='slideContent'>
                          <h2>Wygląda na to, że może Ci się należeć nawet XXXeuro !</h2>
                          <h3>Podaj jeszcze:</h3>
                          <span>
                            <label>
                              Linia? :
                              <Input type='text' name='lane' />
                            </label>
                            <label>
                              lot? :
                              <Input type='text' name='flight' />
                            </label>
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
