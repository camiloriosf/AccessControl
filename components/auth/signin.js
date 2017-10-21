/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import {
  FormControlLabel,
} from 'material-ui/Form';
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

class Signin extends Component {
  state = {
    remember: true,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Paper elevation={4} className={this.props.classes.paper}>
          <Typography type="display1">
            Signin
          </Typography>
          <TextField id="email" label="email" type="email" fullWidth />
          <TextField id="password" label="password" type="password" fullWidth />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.remember}
                onChange={this.handleChange('remember')}
                value="remember"
              />
            }
            label="Remember me"
          />
          <Button raised className={this.props.classes.button} color="accent" onClick={this.handleClick}>
            Signin
          </Button>
          <Button className={this.props.classes.buttonSec} color="primary" onClick={this.props.handleFormChange('signup')}>
            <Typography type="caption">
              Signup
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

export default withStyles(styles)(Signin);
