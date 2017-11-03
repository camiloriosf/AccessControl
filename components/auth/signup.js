import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { gql, graphql } from 'react-apollo';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {
  FormHelperText,
} from 'material-ui/Form';
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

class Signup extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    nameError: '',
    usernameError: '',
    passwordError: '',
    signinError: '',
    loading: false,
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value, [`${name}Error`]: inputValidation({ name, value: event.target.value }) });
  };

  handleSubmit = (event) => {
    this.setState({ loading: true, signinError: '' });
    event.preventDefault();
    const nameError = inputValidation({ name: 'name', value: this.state.name });
    const usernameError = inputValidation({ name: 'username', value: this.state.username });
    const passwordError = inputValidation({ name: 'password', value: this.state.password });

    if (nameError !== '' || usernameError !== '' || passwordError !== '') {
      this.setState({ nameError, usernameError, passwordError });
      this.setState({ loading: false });
      return;
    }

    this.props.mutate({
      variables: {
        user: {
          name: this.state.name,
          username: this.state.username,
          password: this.state.password,
        },
      },
    })
      .then(({ data }) => {
        if (!data.errors) {
          localStorage.setItem('token', data.createUser.token); // eslint-disable-line no-undef
          localStorage.setItem('user', JSON.stringify(data.createUser.changedUser)); // eslint-disable-line no-undef
          this.setState({
            name: '', username: '', password: '', loading: false,
          });
          Router.push('/user');
        } else {
          this.setState({ signinError: 'error al crear cuenta, intentalo nuevamente', loading: false });
        }
      })
      .catch(() => this.setState({ usernameError: 'error al crear cuenta, intentalo nuevamente', loading: false }));
  }

  renderTextFields = () => (
    <div>
      <TextField
        id="name"
        label="name"
        type="name"
        fullWidth
        error={this.state.nameError !== ''}
        helperText={this.state.nameError}
        value={this.state.name}
        onChange={this.handleChange('name')}
      />
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
    </div>
  )

  render() {
    return (
      <div className={this.props.classes.root}>
        <Paper elevation={4} className={this.props.classes.paper}>
          <form noValidate onSubmit={this.handleSubmit}>
            <Typography type="display1">
              Signup
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
              Signup
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
            <Link href="/">
              <Button className={this.props.classes.buttonSec} color="primary" disabled={this.state.loading}>
                <Typography type="caption">
                  Signin
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

const createUser = gql`
mutation createUser($user: CreateUserInput!) {
  createUser(input:$user) {
    token
    changedUser {
      id
      username
    }
  }
}
`;

export default graphql(createUser)(withStyles(styles)(Signup));
