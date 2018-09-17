import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
// core components
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import tabsStyle from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.jsx";

import Input from 'components/Input/Input'
import Radio from 'components/Radio/Radio'

class Choose extends React.Component {
  state = {
    tabClicked: false,
    option: 'delay'
  }
  selectHandler = (value) => {
    this.setState({ tabClicked: value }, function () {
      if (value === 0) {
        this.setState({ option: 'delay' })
      } else if (value === 1) {
        this.setState({ option: 'boarding' })
      } else if (value === 2) {
        this.setState({ option: 'dismiss' })
      }
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <span>
          <Input type='text' name='whatHappend' value={this.state.option} hidden='hidden' required></Input>
        </span>
        <CustomTabs
          headerColor="primary"
          onClick={this.selectHandler}
          tabs={[
            {
              tabName: "Opóźnienie",
              tabIcon: Face,
              value: 'delay',
              tabContent: (
                <div>
                  <p className={[classes.textCenter, 'mb-2 pb-1'].join(' ')}>
                    Jaki był powód spóźnienia do miejsca docelowego?
                  </p>
                  <GridContainer spacing={0} className="form-group mt-1">
                    <GridItem xs={6}>
                      <Radio label='Problemy Techniczne' value='techProblem' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Wpływ innych lotów' value='otherFlights' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Strajk' value='strike' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Problemy na lotnisku' value='airPortProblems' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Złe warunki pogodowe' value='badWeather' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Nie podano powodu' value='noCauseGiven' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Nie pamiętam' value='dontRemember' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Inny' value='Other' name='why'></Radio>
                    </GridItem>
                  </GridContainer>
                </div>
              )
            },
            {
              tabName: "Nie przyjęli mnie na pokład",
              tabIcon: Chat,
              value: 'boarding',
              tabContent: (
                <div>
                  <h6 className={classes.textCenter}>Czy dobrowolnie zrezygnowałaś/eś z lotu?</h6>
                  <p className={[classes.textCenter, 'mb-2 pb-1'].join(' ')}>
                    Jeśli zrezygnowałaś/eś ze swojej rezerwacji w zamian za bilet na późniejszy lot lub inne bonusy od linii lotniczej nie będzie należało Ci się odszkodowanie.
                  </p>
                  <GridContainer spacing={0} className="form-group mt-1">
                    <GridItem xs={6}>
                      <Radio label='Tak' value='yes' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Nie' value='no' name='why'></Radio>
                    </GridItem>
                  </GridContainer>
                </div>
              )
            },
            {
              tabName: "Odwołany lot",
              tabIcon: Build,
              value: 'dismiss',
              tabContent: (
                <div>
                  <p className={[classes.textCenter, 'mb-2 pb-1'].join(' ')}>
                    Jaki był powód odwołania lotu?
                  </p>
                  <GridContainer spacing={0} className="form-group mt-1">
                    <GridItem xs={6}>
                      <Radio label='Problemy Techniczne' value='techProblem' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Wpływ innych lotów' value='otherFlights' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Strajk' value='strike' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Problemy na lotnisku' value='airPortProblems' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Złe warunki pogodowe' value='badWeather' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Nie podano powodu' value='noCauseGiven' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Nie pamiętam' value='dontRemember' name='why'></Radio>
                    </GridItem>
                    <GridItem xs={6}>
                      <Radio label='Inny' value='Other' name='why'></Radio>
                    </GridItem>
                  </GridContainer>
                </div>
              )
            }
          ]}
        />
      </div>
    );
  }
}

export default withStyles(tabsStyle)(Choose);
