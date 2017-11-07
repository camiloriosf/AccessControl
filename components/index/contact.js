import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { FormHelperText } from 'material-ui/Form';
import Send from 'material-ui-icons/Send';
import inputValidation from './inputValidation';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  paper: {
    padding: 20,
    maxWidth: 400,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
  icon: {
    marginLeft: 5,
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

class Contact extends Component {
  state = {
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    comments: '',
    commentsError: '',
    loading: false,
    message: '',
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value, [`${name}Error`]: inputValidation({ name, value: event.target.value }) });
  };

  handleSubmit = (event) => {
    this.setState({ loading: true, message: '' });
    event.preventDefault();
    const nameError = inputValidation({ name: 'name', value: this.state.name });
    const emailError = inputValidation({ name: 'email', value: this.state.email });
    const commentsError = inputValidation({ name: 'comments', value: this.state.comments });

    if (nameError !== '' || emailError !== '' || commentsError !== '') {
      this.setState({ nameError, emailError, commentsError });
      this.setState({ loading: false });
      return;
    }

    this.props.mutate({
      variables: {
        input: {
          name: this.state.name,
          email: this.state.email,
          comments: this.state.comments,
        },
      },
    })
      .then(() => this.setState({
        message: 'mensaje recibido', loading: false, name: '', email: '', comments: '',
      }))
      .catch(() => this.setState({ message: 'error al enviar mensaje, intentalo nuevamente', loading: false }));
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Paper elevation={4} className={this.props.classes.paper}>
          <Typography type="body2">
            {'¿Tienes dudas? Envianos un mensaje y te contactaremos a la brevedad'}
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="name"
              label="nombre"
              type="text"
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
              id="comments"
              label="mensaje"
              type="text"
              fullWidth
              multiline
              rows="4"
              error={this.state.commentsError !== ''}
              helperText={this.state.commentsError}
              value={this.state.comments}
              onChange={this.handleChange('comments')}
            />
            <div className={this.props.classes.wrapper}>
              <Button
                raised
                className={this.props.classes.button}
                disabled={this.state.loading}
                type="submit"
              >
              Enviar
              <Send className={this.props.classes.icon} />
              </Button>
              {
                this.state.loading &&
                <CircularProgress size={60} className={this.props.classes.buttonProgress} />
              }
            </div>
            <FormHelperText>{this.state.message}</FormHelperText>
          </form>
        </Paper>
      </div>
    );
  }
}

const sendComment = gql`
mutation addContact($input:CreateContactInput!) {
  createContact(input:$input){
    changedContact{
      id
    }
  }
}
`;

export default graphql(sendComment)(withStyles(styles)(Contact));
