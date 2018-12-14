import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

//  @material-ui/icons components
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Send from '@material-ui/icons/Send';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';

// Google Analitics
// import ReactGA from 'react-ga';

import navPillsStyle from 'assets/jss/material-kit-react/components/navPillsStyle.jsx';

const style = {
  overflow: 'visible'
};

class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0,
      active: 0,
      submit: null,
      scrollingInProgress: false
    };
  }
  handleChange = (event, active) => {
    this.setState({ active });
  };

  scrollStep = element => {
    if (element) {
      if (element.scrollTop <= 2) {
        clearInterval(this.state.intervalId);
        this.setState({ scrollingInProgress: false });
      }
      element.scrollTop -= 2;
    }
  };

  scrollToTop = () => {
    clearInterval(this.state.intervalId);
    const formatka = document.getElementsByClassName('ml-popup-window');
    let intervalId = setInterval(() => this.scrollStep(formatka[0]), 1);
    this.setState({ scrollingInProgress: true });
    this.setState({ intervalId: intervalId });
  };
  handleNext = e => {
    if (e) {
      e.target.blur();
    }
    if (this.props.tabs.length <= this.state.active + 1) {
      // ReactGA.event({
      //   category: 'Form Submit',
      //   action: 'Attempted to submit'
      // });
      window.gtag('event', 'Attempting_To_Submit', {
        event_category: 'Form'
      });
      return;
    } else if (
      this.state.active === 0 &&
      this.props.values.consentPolicy &&
      this.props.values.consentRules
    ) {
      // ReactGA.event({
      //   category: 'Navigation',
      //   action: 'Go tab 2'
      // });
      window.gtag('event', 'Go_Tab_2', {
        event_category: 'Form_Navigation'
      });
      const active = this.state.active + 1;
      this.setState({ active: active });
      this.scrollToTop();
    } else if (
      this.state.active === 1 &&
      this.props.values.fromWhere &&
      this.props.values.toWhere &&
      !this.props.errors.fromWhere &&
      !this.props.errors.toWhere
    ) {
      // ReactGA.event({
      //   category: 'Navigation',
      //   action: 'Go tab 3'
      // });
      window.gtag('event', 'Go_Tab_3', {
        event_category: 'Form_Navigation'
      });
      const active = this.state.active + 1;
      this.setState({ active: active });
      this.scrollToTop();
    } else if (this.state.active === 2 && this.props.values.whatHappend) {
      // ReactGA.event({
      //   category: 'Navigation',
      //   action: 'Go tab 4'
      // });
      window.gtag('event', 'Go_Tab_4', {
        event_category: 'Form_Navigation'
      });
      const active = this.state.active + 1;
      this.setState({ active: active });
      this.scrollToTop();
    } else if (this.state.active === 3 && this.props.values.why) {
      // ReactGA.event({
      //   category: 'Navigation',
      //   action: 'Go tab 5'
      // });
      window.gtag('event', 'Go_Tab_5', {
        event_category: 'Form_Navigation'
      });
      const active = this.state.active + 1;
      this.setState({ active: active });
      this.scrollToTop();
    } else if (
      this.state.active === 4 &&
      this.props.values.flight &&
      this.props.values.airlane &&
      !this.props.errors.flight &&
      !this.props.errors.airlane
    ) {
      // ReactGA.event({
      //   category: 'Navigation',
      //   action: 'Go tab 6'
      // });
      window.gtag('event', 'Go_Tab_6', {
        event_category: 'Form_Navigation'
      });
      const active = this.state.active + 1;
      this.setState({ active: active });
      this.scrollToTop();
    } else if (this.state.active === 5 && this.props.values.email && !this.props.errors.email) {
      // ReactGA.event({
      //   category: 'Navigation',
      //   action: 'Go tab 7?'
      // });
      window.gtag('event', 'Go_Tab_7? (ERROR)', {
        event_category: 'Form_Navigation'
      });
      const active = this.state.active + 1;
      this.setState({ active: active });
      this.scrollToTop();
    }
  };
  handlePrev = e => {
    e.target.blur();
    if (this.state.active === 0) {
      return;
    }
    // ReactGA.event({
    //   category: 'Navigation',
    //   action: 'Previous page'
    // });
    window.gtag('event', 'Go_Back', {
      event_category: 'Form_Navigation'
    });
    const active = this.state.active - 1;
    this.setState({ active: active });
  };
  handleChangeIndex = index => {
    this.setState({ active: index });
  };

  handleEnterPress = e => {
    if (e.key === 'Tab') {
      // prevent tabbing between inputs
      e.preventDefault();
    }
  };

  componentWillMount() {
    window.addEventListener('keydown', e => this.handleEnterPress(e));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', e => this.handleEnterPress(e));
  }

  componentDidUpdate() {
    if (this.props.toNextPage && !this.state.scrollingInProgress) {
      this.handleNext();
      this.props.nextPageUsed();
    }
  }

  render() {
    const { classes, tabs, direction, color, horizontal } = this.props;
    const flexContainerClasses = classNames({
      [classes.horizontalDisplay]: horizontal
    });
    const visibility = this.state.active === 0 ? 'visibility-hidden' : '';
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
        className="tabPanel"
      >
        {tabs.map((prop, key) => {
          const pillsClasses = classNames({
            [classes.pills]: true,
            [classes.horizontalPills]: horizontal,
            [classes.pillsWithIcons]: prop.tabIcon
          });
          let disabled = true;
          // HARDCODE #toRefactor ============================================================================================

          if (prop.tabButton === '1') {
            disabled = false;
          } else if (
            prop.tabButton === '2' &&
            this.props.values.consentPolicy &&
            this.props.values.consentRules
          ) {
            disabled = false;
          } else if (
            prop.tabButton === '3' &&
            this.props.values.fromWhere &&
            this.props.values.toWhere &&
            !this.props.errors.fromWhere &&
            !this.props.errors.toWhere
          ) {
            disabled = false;
          } else if (prop.tabButton === '4' && this.props.values.whatHappend) {
            disabled = false;
          } else if (prop.tabButton === '5' && this.props.values.why) {
            disabled = false;
          } else if (
            prop.tabButton === '6' &&
            this.props.values.flight &&
            this.props.values.airlane &&
            this.props.values.date &&
            !this.props.errors.flight &&
            !this.props.errors.airlane &&
            !this.props.errors.date
          ) {
            disabled = false;
          }
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
              className="tabButton"
              disabled={disabled}
            />
          );
        })}
      </Tabs>
    );
    const tabContent = (
      <div>
        <SwipeableViews
          axis={direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.active}
          onChangeIndex={this.handleChangeIndex}
          className="swieableViews"
          disabled={true}
          animateHeight={false}
          style={style}
          slideStyle={style}
        >
          {tabs.map((prop, key) => {
            let disabled = true;
            // HARDCODE #toRefactor ============================================================================================
            if (
              prop.tabButton === '1' &&
              this.props.values.consentPolicy &&
              this.props.values.consentRules
            ) {
              disabled = false;
            } else if (
              prop.tabButton === '2' &&
              this.props.values.fromWhere &&
              this.props.values.toWhere &&
              !this.props.errors.fromWhere &&
              !this.props.errors.toWhere
            ) {
              disabled = false;
            } else if (prop.tabButton === '3' && this.props.values.whatHappend) {
              disabled = false;
            } else if (prop.tabButton === '4' && this.props.values.why) {
              disabled = false;
            } else if (
              prop.tabButton === '5' &&
              this.props.values.flight &&
              this.props.values.airlane &&
              this.props.values.date &&
              !this.props.errors.flight &&
              !this.props.errors.airlane &&
              !this.props.errors.date
            ) {
              disabled = false;
            } else if (
              prop.tabButton === '6' &&
              this.props.values.email &&
              !this.props.errors.email
            ) {
              disabled = false;
            }
            return (
              <div className={'outer'} key={key}>
                <div className={'middle'}>
                  <div className={'inner'}>
                    <Paper elevation={5} className={[classes.tabContent, 'paperSpace'].join(' ')}>
                      {prop.tabContent}
                    </Paper>
                    <div className={'navBase'}>
                      <Button
                        onClick={this.handlePrev}
                        className={[visibility, 'prevButton'].join(' ')}
                      >
                        <ArrowBack />
                        <span>Wstecz</span>
                      </Button>
                      <Button
                        disabled={this.props.isSubmitting}
                        onClick={() => {
                          this.props.setFieldTouched(this.props.values);
                          this.handleNext();
                        }}
                        className={[
                          'nextButton',
                          this.props.tabs.length === this.state.active + 1 ? '' : 'display-none'
                        ].join(' ')}
                        type="submit"
                      >
                        <span className="pr-1">Wyślij </span> <Send />
                      </Button>
                      <Button
                        onClick={this.handleNext}
                        className={[
                          'nextButton',
                          this.props.tabs.length < this.state.active + 2 ? 'display-none' : ''
                        ].join(' ')}
                        disabled={disabled}
                      >
                        <span className="pr-1">Dalej</span>
                        <ArrowForward />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </SwipeableViews>
      </div>
    );
    return horizontal ? (
      <GridContainer>
        <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
        <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
      </GridContainer>
    ) : (
      <div>
        {tabButtons}
        {tabContent}
      </div>
    );
  }
}

Steps.defaultProps = {
  active: 0,
  color: 'primary'
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
  color: PropTypes.oneOf(['primary', 'warning', 'danger', 'success', 'info', 'rose']),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object
  }),
  alignCenter: PropTypes.bool
};

export default withStyles(navPillsStyle)(Steps);
