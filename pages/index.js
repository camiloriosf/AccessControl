import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import withData from '../lib/withData';
import withRoot from '../components/withRoot';
import IndexContainer from '../components/index';

const styles = {
  root: {

  },
};

class Index extends Component {
  state = {

  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <IndexContainer />
      </div>
    );
  }
}

export default withRoot(withData(withStyles(styles)(Index)));
