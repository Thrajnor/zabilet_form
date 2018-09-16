import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Steps from "components/Steps/Steps";
import Choose from 'components/Choose/Choose'
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";

import './form.css'

class SectionPills extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={[classes.section, 'formBackground'].join(' ')}>
        <div>
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
                              <input type='text' />
                            </label>
                            <label>
                              Dokąd? :
                              <input type='text' />
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
                              <input type='text' />
                            </label>
                            <label>
                              lot? :
                              <input type='text' />
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
        </div>
      </div>
    );
  }
}

export default withStyles(pillsStyle)(SectionPills);
