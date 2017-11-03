import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { gql, graphql } from 'react-apollo';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import {
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import inputValidation from './inputValidation';

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
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -30,
  },
};

class Signin extends Component {
  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    signinError: '',
    loading: false,
    remember: false,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value, [`${name}Error`]: inputValidation({ name, value: event.target.value }) });
  };

  handleCheckBoxChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  handleSubmit = (event) => {
    this.setState({ loading: true, signinError: '' });
    event.preventDefault();
    const usernameError = inputValidation({ name: 'username', value: this.state.username });
    const passwordError = inputValidation({ name: 'password', value: this.state.password });

    if (usernameError !== '' || passwordError !== '') {
      this.setState({ usernameError, passwordError });
      this.setState({ loading: false });
      return;
    }

    this.props.mutate({
      variables: {
        user: {
          username: this.state.username,
          password: this.state.password,
        },
      },
    })
      .then(({ data }) => {
        if (!data.errors) {
          localStorage.setItem('token', data.loginUser.token); // eslint-disable-line no-undef
          localStorage.setItem('user', JSON.stringify(data.loginUser.user)); // eslint-disable-line no-undef

          if (data.loginUser.user.type === 'admin') Router.push('/admin');
          else if (data.loginUser.user.type === 'user') Router.push('/user');
          else {
            localStorage.removeItem('token'); // eslint-disable-line no-undef
            localStorage.removeItem('user'); // eslint-disable-line no-undef
            this.setState({ loading: false });
            this.setState({ signinError: 'error al iniciar sesión, intentalo nuevamente', loading: false });
          }
        } else {
          this.setState({ signinError: 'error al iniciar sesión, intentalo nuevamente', loading: false });
        }
      })
      .catch(() => this.setState({ signinError: 'error al iniciar sesión, intentalo nuevamente', loading: false }));
  }

  renderTextFields = () => (
    <div>
      <TextField
        id="email"
        label="email"
        type="email"
        fullWidth
        error={this.state.usernameError !== ''}
        helperText={this.state.usernameError}
        value={this.state.username}
        onChange={this.handleChange('username')}
      />
      <TextField
        id="password"
        label="password"
        type="password"
        fullWidth
        error={this.state.passwordError !== ''}
        helperText={this.state.passwordError}
        value={this.state.password}
        onChange={this.handleChange('password')}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={this.state.remember}
            onChange={this.handleCheckBoxChange('remember')}
            value="remember"
          />
        }
        label="Remember me"
      />
    </div>
  )

  render() {
    return (
      <div className={this.props.classes.root}>
        <Paper elevation={4} className={this.props.classes.paper}>
          <form noValidate onSubmit={this.handleSubmit}>
            <Typography type="display1">
              Signin
            </Typography>
            {this.renderTextFields()}
            <div className={this.props.classes.wrapper}>
              <Button
                raised
                color="accent"
                className={this.props.classes.button}
                disabled={this.state.loading}
                type="submit"
              >
                Signin
              </Button>
              {
                this.state.loading &&
                <CircularProgress size={60} className={this.props.classes.buttonProgress} />
              }
            </div>
            {
              this.state.signinError !== ''
                ? <FormHelperText error>{this.state.signinError}</FormHelperText>
                : null
            }
            <Link href="/signup">
              <Button className={this.props.classes.buttonSec} color="primary">
                <Typography type="caption">
                  Signup
                </Typography>
              </Button>
            </Link>
            <Link href="/recover">
              <Button className={this.props.classes.buttonSec} color="primary" disabled={this.state.loading}>
                <Typography type="caption">
                  Recover Password
                </Typography>
              </Button>
            </Link>
          </form>
        </Paper>
      </div>
    );
  }
}

const loginUser = gql`
mutation loginUser($user: LoginUserInput!) {
  loginUser(input:$user) {
    token
    user {
      id
      username
      type
    }
  }
}
`;

export default graphql(loginUser)(withStyles(styles)(Signin));
