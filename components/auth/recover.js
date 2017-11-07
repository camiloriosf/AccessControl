import React, { Component } from 'react';
import Link from 'next/link';
import { gql, graphql } from 'react-apollo';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
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

class Recover extends Component {
  state = {
    email: '',
    emailError: '',
    loading: false,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value, [`${name}Error`]: inputValidation({ name, value: event.target.value }) });
  };

  handleSubmit = (event) => {
    this.setState({ loading: true });
    event.preventDefault();
    const emailError = inputValidation({ name: 'email', value: this.state.email });

    if (emailError !== '') {
      this.setState({ emailError, loading: false });
      return;
    }

    this.props.mutate({
      variables: {
        user: {
          username: {
            eq: this.state.email,
          },
        },
      },
    })
      .then(({ data }) => {
        if (!data.errors) {
          console.log(data);
        } else {
          this.setState({ emailError: 'error al recuperar contraseña, intentalo nuevamente', loading: false });
        }
      })
      .catch(() => this.setState({ emailError: 'error al recuperar contraseña, intentalo nuevamente', loading: false }));
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Paper elevation={4} className={this.props.classes.paper}>
          <form noValidate onSubmit={this.handleSubmit}>
            <Typography type="display1">
              {'Recuperar contraseña'}
            </Typography>
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
            <div className={this.props.classes.wrapper}>
              <Button
                raised
                color="accent"
                className={this.props.classes.button}
                disabled={this.state.loading}
                type="submit"
              >
                {'Recuperar contraseña'}
              </Button>
              {
                this.state.loading &&
                <CircularProgress size={60} className={this.props.classes.buttonProgress} />
              }
            </div>
            <Link href="/">
              <Button className={this.props.classes.buttonSec} color="primary">
                <Typography type="caption">
                  {'Iniciar Sesión'}
                </Typography>
              </Button>
            </Link>
            <Link href="/signup">
              <Button className={this.props.classes.buttonSec} color="primary">
                <Typography type="caption">
                  {'Registrarse'}
                </Typography>
              </Button>
            </Link>
          </form>
        </Paper>
      </div>
    );
  }
}

const findUser = gql`
query findUser($user:UserWhereArgs){
  viewer{
    id
    allUsers(where:$user){
      edges{
        node{
          id
        }
      }
    }
  }
}

`;

export default graphql(findUser)(withStyles(styles)(Recover));
