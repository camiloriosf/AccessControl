import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  logo: {
    maxWidth: 300,
  },
};

class Footer extends Component {
  state = {

  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Typography type="button" paragraph>
          {'Powered by'}
        </Typography>
        <a href="https://bittersweet.io">
          <img
            className={this.props.classes.logo}
            src="/static/Logo-Bittersweet-final.png"
            alt="BitterSweet.io"
          />
        </a>
      </div>
    );
  }
}

export default (withStyles(styles)(Footer));
