import React, { Component } from 'react';
import Link from 'next/link';
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

class Recover extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Paper elevation={4} className={this.props.classes.paper}>
          <Typography type="display1">
            Recover password
          </Typography>
          <TextField id="email" label="email" type="email" fullWidth />
          <Button raised className={this.props.classes.button} color="accent" onClick={this.handleClick}>
            Recover password
          </Button>
          <Link href="/">
            <Button className={this.props.classes.buttonSec} color="primary">
              <Typography type="caption">
                Signin
              </Typography>
            </Button>
          </Link>
          <Link href="/signup">
            <Button className={this.props.classes.buttonSec} color="primary">
              <Typography type="caption">
                Signup
              </Typography>
            </Button>
          </Link>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Recover);
