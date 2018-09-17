import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from '@material-ui/core/Paper'

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx"

import navPillsStyle from "assets/jss/material-kit-react/components/navPillsStyle.jsx";

class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      submit: null
    };
  }
  handleChange = (event, active) => {
    this.setState({ active });
  };
  handleNext = () => {
    if (this.props.tabs.length <= this.state.active + 1) {
      return
    }

    const active = this.state.active + 1

    this.setState({ active: active });
  };
  handlePrev = () => {
    if (this.state.active === 0) {
      return
    }
    const active = this.state.active - 1
    this.setState({ active: active });
  };
  handlePrevName = () => {
    return this.state.active === 0 ? '' : '<= Poprzednie'
  }
  handleChangeIndex = index => {
    this.setState({ active: index });
  };
  render() {
    const {
      classes,
      tabs,
      direction,
      color,
      horizontal
    } = this.props;
    const flexContainerClasses = classNames({
      [classes.flexContainer]: true,
      [classes.horizontalDisplay]: horizontal !== undefined
    });
    const visibility = this.state.active === 0 ? 'display-none' : ''
    const tabButtons = (
      <Tabs
        classes={{
          root: classes.root,
          fixed: classes.fixed,
          flexContainer: flexContainerClasses,
          indicator: classes.displayNone
        }}
        value={this.state.active}
        onChange={this.handleChange}
        centered={true}
        className='tabPanel'
      >
        {tabs.map((prop, key) => {
          const pillsClasses = classNames({
            [classes.pills]: true,
            [classes.horizontalPills]: horizontal !== undefined,
            [classes.pillsWithIcons]: prop.tabIcon !== undefined
          });
          return (
            <Tab
              label={prop.tabButton}
              key={key}
              classes={{
                root: pillsClasses,
                labelContainer: classes.labelContainer,
                label: classes.label,
                selected: classes[color]
              }}
              className='tabButton'
            />
          );
        })}
      </Tabs>
    );
    const tabContent = (
      <div className={classes.contentWrapper}>
        <SwipeableViews
          axis={direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.active}
          onChangeIndex={this.handleChangeIndex}
        >
          {tabs.map((prop, key) => {
            return (
              <div key={key} className='veltically-center'>
                <Paper elevation={5} className={[classes.tabContent, 'paperSpace'].join(' ')}>
                  {prop.tabContent}
                </Paper>
                <div className={'navBase'}>
                  <Button
                    onClick={this.handlePrev}
                    className={[visibility, 'prevButton'].join(' ')}
                  >
                    {this.handlePrevName()}
                  </Button>
                  {this.props.tabs.length < this.state.active + 2 ?
                    <Button
                      disabled={!this.props.canSubmit}
                      className={'nextButton'}
                      type='submit'
                    >
                      {!this.props.canSubmit ?
                        'Wszystkie pola są wymagane!'
                        :
                        'Odbierz odszkodowanie!'
                      }
                    </Button>
                    :
                    <Button
                      onClick={this.handleNext}
                      className={'nextButton'}
                    >
                      Następne =>
                    </Button>
                  }
                </div>
              </div>
            );
          })}
        </SwipeableViews>
      </div>
    );
    return horizontal !== undefined ? (
      <GridContainer>
        <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
        <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
      </GridContainer>
    ) : (
        <div>
          {tabContent}
          {tabButtons}
        </div>
      );
  }
}

Steps.defaultProps = {
  active: 0,
  color: "primary"
};

Steps.propTypes = {
  classes: PropTypes.object.isRequired,
  // index of the default active pill
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.func,
      tabContent: PropTypes.node
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object
  }),
  alignCenter: PropTypes.bool
};

export default withStyles(navPillsStyle)(Steps);
