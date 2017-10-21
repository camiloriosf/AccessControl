/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import withRoot from '../components/withRoot';
import Signin from '../components/auth/signin';
import Signup from '../components/auth/signup';
import Recover from '../components/auth/recover';

const styles = {
  root: {
    paddingTop: 200,
  },
};

class Index extends Component {
  state = {
    form: 'signin',
  };

  handleFormChange = name => () => {
    this.setState({ form: name });
  };

  renderForm = () => {
    switch (this.state.form) {
      case 'signin':
        return <Signin handleFormChange={this.handleFormChange} />;
      case 'signup':
        return <Signup handleFormChange={this.handleFormChange} />;
      case 'recover':
        return <Recover handleFormChange={this.handleFormChange} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        {this.renderForm()}
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
