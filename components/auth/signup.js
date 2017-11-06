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
    email: '',
    password: '',
    nameError: '',
    emailError: '',
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
    const emailError = inputValidation({ name: 'email', value: this.state.email });
    const passwordError = inputValidation({ name: 'password', value: this.state.password });

    if (nameError !== '' || emailError !== '' || passwordError !== '') {
      this.setState({ nameError, emailError, passwordError });
      this.setState({ loading: false });
      return;
    }

    this.props.mutate({
      variables: {
        user: {
          name: this.state.name,
          username: this.state.email,
          password: this.state.password,
        },
      },
    })
      .then(({ data }) => {
        if (!data.errors) {
          localStorage.setItem('token', data.createUser.token); // eslint-disable-line no-undef
          localStorage.setItem('user', JSON.stringify(data.createUser.changedUser)); // eslint-disable-line no-undef
          this.setState({ name: '', email: '', password: '' });
          Router.push('/user');
        } else {
          this.setState({ signinError: 'error al crear cuenta, intentalo nuevamente', loading: false });
        }
      })
      .catch(() => this.setState({ emailError: 'error al crear cuenta, intentalo nuevamente', loading: false }));
  }

  renderTextFields = () => (
    <div>
      <TextField
        id="name"
        label="nombre"
        type="name"
        fullWidth
        error={this.state.nameError !== ''}
        helperText={this.state.nameError}
        value={this.state.name}
        onChange={this.handleChange('name')}
      />
      <TextField
        id="email"
        label="correo"
        type="email"
        fullWidth
        error={this.state.emailError !== ''}
        helperText={this.state.emailError}
        value={this.state.email}
        onChange={this.handleChange('email')}
      />
      <TextField
        id="password"
        label="contraseña"
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
              {'Registrarse'}
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
                {'Registrarse'}
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
                  {'Iniciar sesión'}
                </Typography>
              </Button>
            </Link>
            <Link href="/recover">
              <Button className={this.props.classes.buttonSec} color="primary" disabled={this.state.loading}>
                <Typography type="caption">
                  {'Recuperar contraseña'}
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
