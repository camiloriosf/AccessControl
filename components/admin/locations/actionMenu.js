import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';
import inputValidation from './inputValidation';

const styles = {
  root: {
    margin: 20,
  },
  textField: {
    marginTop: 10,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dialog: {
    minWidth: 400,
  },
  flex: {
    flex: 1,
  },
};

class ActionMenu extends Component {
  state = {
    name: '',
    identifier: '',
    nameError: '',
    loading: false,
    open: false,
  };

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
      identifier: _.replace(_.toLower(event.target.value), / /g, ''),
      [`${name}Error`]: inputValidation({ name, value: event.target.value }),
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false, name: '', nameError: '' });
  };

  handleClick = () => {
    this.setState({ loading: true });
    const nameError = inputValidation({ name: 'name', value: this.state.name });

    if (nameError !== '') {
      this.setState({ nameError });
      this.setState({ loading: false });
      return;
    }

    this.props.mutate({
      variables: {
        input: {
          name: this.state.name,
          identifier: this.state.identifier,
          active: true,
          userId: this.props.id,
        },
      },
      refetchQueries: [{
        query: gql`
          query GetUser($id:ID!){
            getUser(id: $id){
              id
              locations {
                edges {
                  node {
                    id
                    name
                    identifier
                    active
                    users{
                      aggregations{
                        count
                      }
                    }
                }
              }
            }
            }
          }
        `,
        variables: { id: this.props.id },
      }],
    })
      .then(() => {
        this.setState({
          name: '', identifier: '', nameError: '', loading: false, open: false,
        });
      })
      .catch(() => console.log('error')); // eslint-disable-line no-console
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.button}>
          <Typography type="title" color="inherit" noWrap className={this.props.classes.flex}>
                Locaciones
          </Typography>
          <Button
            fab
            color="primary"
            onClick={this.handleClickOpen}
          >
            <AddIcon />
          </Button>
        </div>
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle className={this.props.classes.dialog}>Crear Emplazamiento</DialogTitle>
          <DialogContent>
            <TextField
              id="name"
              label="nombre"
              type="name"
              autoFocus
              fullWidth
              autoComplete="off"
              error={this.state.nameError !== ''}
              helperText={this.state.nameError}
              value={this.state.name}
              className={this.props.classes.textField}
              onChange={this.handleChange('name')}
            />
            <TextField
              id="identifier"
              label="identificador"
              fullWidth
              value={this.state.identifier}
              className={this.props.classes.textField}
              disabled
            />
          </DialogContent>
          <DialogActions>
            <Button
              raised
              color="primary"
              disabled={this.state.loading}
              type="submit"
              onClick={this.handleClick}
            >
              Agregar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const createLocation = gql`
mutation createLocation($input: CreateLocationInput!) {
  createLocation(input:$input){
    changedLocation{
      id
    }
  }
}
`;

export default graphql(createLocation)(withStyles(styles)(ActionMenu));
