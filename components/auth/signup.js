/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    maxWidth: 400,
  },
  button: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonSec: {
    width: '100%',
  },
  paper: {
    padding: 20,
  },
};

class Signup extends Component {
  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Paper elevation={4} className={this.props.classes.paper}>
          <Typography type="display1">
            Signup
          </Typography>
          <TextField id="name" label="name" type="name" fullWidth />
          <TextField id="email" label="email" type="email" fullWidth />
          <TextField id="password" label="password" type="password" fullWidth />
          <Button raised className={this.props.classes.button} color="accent" onClick={this.handleClick}>
            Signup
          </Button>
          <Button className={this.props.classes.buttonSec} color="primary" onClick={this.props.handleFormChange('signin')}>
            <Typography type="caption">
              Signin
            </Typography>
          </Button>
          <Button className={this.props.classes.buttonSec} color="primary" onClick={this.props.handleFormChange('recover')}>
            <Typography type="caption">
              Recover Password
            </Typography>
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Signup);
