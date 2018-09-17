import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Steps from "components/Steps/Steps";
import Choose from 'components/Choose/Choose'
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import './form.css'
import Input from "components/Input/Input";
import Formsy from 'formsy-react';

class SectionPills extends React.Component {
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      canSubmit: false,
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
  render() {
    const { classes } = this.props;
    return (
      <div className={[classes.section, 'formBackground'].join(' ')}>

        <Formsy
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
                              <Input type='text'
                                label='Miejsce wylotu:'
                                name='fromWhere'
                                placeholder='np. Wrocław, lub W-w'
                                required />
                            </GridItem>
                            <GridItem xs={6}>
                              <Input type='text'
                                label='Miejsce przylotu:'
                                name='toWhere'
                                placeholder='np. Oslo'
                                required />
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
                          <h3>Wygląda na to, że może Ci się należeć nawet XXXeuro !</h3>
                          <h3>Podaj jeszcze:</h3>
                          <span>
                            <GridContainer spacing={16}>
                              <GridItem xs={4}>
                                <Input placeholder='np. Oslo' label='Linia: ' type='text' name='lane' required />
                              </GridItem>
                              <GridItem xs={4}>
                                <Input label='Lot: ' type='text' name='flight' required />
                              </GridItem>
                              <GridItem xs={4}>
                                <Input label='Data: ' type='text' name='data' required />
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
