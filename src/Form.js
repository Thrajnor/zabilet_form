import '@babel/polyfill';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './form.css';
import pillsStyle from 'assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx';

import withStyles from '@material-ui/core/styles/withStyles';

import NoCompensation from 'components/Forms/NoCompensation';
import MainForm from 'components/Forms/MainForm';

// Google Analitics
import ReactGA from 'react-ga';
// ReactGA.initialize('UA-130272294-1', {
//   titleCase: false,
//   gaOptions: {
//     userId: 123,
//     siteSpeedSampleRate: 100
//   }
// });
// ReactGA.pageview(window.location.pathname + window.location.search);

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compensation: 400,
      ownWill: false
    };
  }
  componentWillMount() {
    ReactGA.event({
      category: 'Form',
      action: 'Open'
    });
  }
  componentWillUnmount() {
    ReactGA.event({
      category: 'Form',
      action: 'Close'
    });
  }

  ownWillHandler = bool => {
    this.setState({ ownWill: bool });
  };

  render() {
    const { classes } = this.props;
    let content;
    if (this.state.ownWill) {
      content = <NoCompensation ownWillHandler={this.ownWillHandler} />;
    } else {
      content = <MainForm ownWillHandler={this.ownWillHandler} />;
    }
    return <div className={[classes.section, 'formBackground'].join(' ')}>{content}</div>;
  }
}

export default withStyles(pillsStyle)(Form);
