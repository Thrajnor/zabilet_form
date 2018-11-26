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

import navPillsStyle from 'assets/jss/material-kit-react/components/navPillsStyle.jsx';

const style = {
  overflow: 'hidden visible'
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
      return;
    } else if (
      this.state.active === 0 &&
      this.props.values.fromWhere !== undefined &&
      this.props.values.toWhere !== undefined &&
      this.props.errors.fromWhere === undefined &&
      this.props.errors.toWhere === undefined
    ) {
      const active = this.state.active + 1;
      this.setState({ active: active });
      this.scrollToTop();
    } else if (this.state.active === 1 && this.props.values.whatHappend !== undefined) {
      const active = this.state.active + 1;
      this.setState({ active: active });
      this.scrollToTop();
    } else if (this.state.active === 2 && this.props.values.why !== undefined) {
      const active = this.state.active + 1;
      this.setState({ active: active });
      this.scrollToTop();
    } else if (
      this.state.active === 3 &&
      this.props.values.flight !== undefined &&
      this.props.values.airlane !== undefined &&
      this.props.errors.flight === undefined &&
      this.props.errors.airlane === undefined
    ) {
      const active = this.state.active + 1;
      this.setState({ active: active });
      this.scrollToTop();
    } else if (
      this.state.active === 4 &&
      this.props.values.email !== undefined &&
      this.props.errors.email === undefined
    ) {
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
      [classes.horizontalDisplay]: horizontal !== undefined
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
            [classes.horizontalPills]: horizontal !== undefined,
            [classes.pillsWithIcons]: prop.tabIcon !== undefined
          });
          let disabled = true;
          // HARDCODE #toRefactor ============================================================================================
          if (prop.tabButton === '1') {
            disabled = false;
          } else if (
            prop.tabButton === '2' &&
            this.props.values.fromWhere !== undefined &&
            this.props.values.toWhere !== undefined &&
            this.props.errors.fromWhere === undefined &&
            this.props.errors.toWhere === undefined
          ) {
            disabled = false;
          } else if (prop.tabButton === '3' && this.props.values.whatHappend !== undefined) {
            disabled = false;
          } else if (prop.tabButton === '4' && this.props.values.why !== undefined) {
            disabled = false;
          } else if (
            prop.tabButton === '5' &&
            this.props.values.flight !== undefined &&
            this.props.values.airlane !== undefined &&
            this.props.values.date !== undefined &&
            this.props.errors.flight === undefined &&
            this.props.errors.airlane === undefined &&
            this.props.errors.date === undefined
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
              this.props.values.fromWhere !== undefined &&
              this.props.values.toWhere !== undefined &&
              this.props.errors.fromWhere === undefined &&
              this.props.errors.toWhere === undefined
            ) {
              disabled = false;
            } else if (prop.tabButton === '2' && this.props.values.whatHappend !== undefined) {
              disabled = false;
            } else if (prop.tabButton === '3' && this.props.values.why !== undefined) {
              disabled = false;
            } else if (
              prop.tabButton === '4' &&
              this.props.values.flight !== undefined &&
              this.props.values.airlane !== undefined &&
              this.props.values.date !== undefined &&
              this.props.errors.flight === undefined &&
              this.props.errors.airlane === undefined &&
              this.props.errors.date === undefined
            ) {
              disabled = false;
            } else if (
              prop.tabButton === '5' &&
              this.props.values.email !== undefined &&
              this.props.errors.email === undefined
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
    return horizontal !== undefined ? (
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
