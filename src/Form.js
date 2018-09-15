import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Steps from "components/Steps/Steps.jsx";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";

import './form.css'

class SectionPills extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={[classes.section, 'formContent'].join(' ')}>
        <div className={classes.container}>
          <div id="navigation-pills">
            <div>
              <Steps
                color="primary"
                tabs={[
                  {
                    tabButton: "1",
                    tabContent: (
                      <span>
                        <p>
                          Collaboratively administrate empowered
                        </p>
                      </span>
                    )
                  },
                  {
                    tabButton: "2",
                    tabContent: (
                      <span>
                        <p>
                          Efficiently unleash cross-media
                        </p>
                      </span>
                    )
                  },
                  {
                    tabButton: "3",
                    tabContent: (
                      <span>
                        <p>
                          Collaboratively administrate
                        </p>
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
