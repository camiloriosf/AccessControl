import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import Paper from 'material-ui/Paper';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import { withStyles } from 'material-ui/styles';
import inputValidation from './inputValidation';

const styles = {
  root: {
    margin: 20,
  },
  paper: {
    padding: 20,
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dialog: {
    minWidth: 400,
  },
};

class LocationList extends Component {
  state = {
    anchorEl: null,
    open: false,
    openDialog: false,
    name: '',
    nameError: '',
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
    showPassword: false,
    loading: false,
  };

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
      [`${name}Error`]: inputValidation({ name, value: event.target.value }),
    });
  };

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleOpenClick = () => {
    this.setState({ openDialog: true, open: false });
  };

  handleDialogRequestClose = () => {
    this.setState({
      openDialog: false, name: '', nameError: '', username: '', usernameError: '', password: '', passwordError: '',
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleChangeActive = () => {
    this.setState({ open: false });

    this.props.changeActive({
      variables: {
        input: {
          id: this.props.id,
          active: !this.props.active,
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
        variables: { id: this.props.userId },
      }],
    })
      .then(() => console.log('ok')) // eslint-disable-line no-console
      .catch(() => console.log('error')); // eslint-disable-line no-console
  }

  handleAddUser = () => {
    this.setState({ loading: true });
    const nameError = inputValidation({ name: 'name', value: this.state.name });
    const usernameError = inputValidation({ name: 'username', value: this.state.username });
    const passwordError = inputValidation({ name: 'password', value: this.state.password });

    if (nameError !== '' || usernameError !== '' || passwordError !== '') {
      this.setState({ nameError, usernameError, passwordError });
      this.setState({ loading: false });
      return;
    }

    this.props.addUser({
      variables: {
        input: {
          name: this.state.name,
          username: `${this.state.username}@${this.props.identifier}`,
          password: this.state.password,
          type: 'user',
          locationId: this.props.id,
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
        variables: { id: this.props.userId },
      }],
    })
      .then(() => {
        this.setState({
          name: '', nameError: '', username: '', usernameError: '', password: '', passwordError: '', loading: false, openDialog: false,
        });
      })
      .catch(() => console.log('error')); // eslint-disable-line no-console
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Paper elevation={10} className={this.props.classes.paper}>
          <Grid container justify="center">
            <Grid item xs={2} >
              <FormHelperText>Nombre</FormHelperText>
              <Typography type="body1" color="inherit" noWrap>
                {this.props.name}
              </Typography>
            </Grid>
            <Grid item xs={2} >
              <FormHelperText>Identificador</FormHelperText>
              <Typography type="subheading" color="inherit" noWrap>
                {this.props.identifier}
              </Typography>
            </Grid>
            <Grid item xs={2} >
              <FormHelperText>Usuarios</FormHelperText>
              <Typography type="subheading" color="inherit" noWrap>
                {this.props.users}
              </Typography>
            </Grid>
            <Grid item xs={2} >
              <FormHelperText>Registros</FormHelperText>
              <Typography type="subheading" color="inherit" noWrap>
                {this.props.logs}
              </Typography>
            </Grid>
            <Grid item xs={2} >
              <FormHelperText>Activo</FormHelperText>
              <Typography type="subheading" color="inherit" noWrap>
                {this.props.active ? 'si' : 'no'}
              </Typography>
            </Grid>
            <Grid item xs={2} className={this.props.classes.menu}>
              <Button
                aria-owns={this.state.open ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                color="primary"
              >
                Opciones
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.open}
                onRequestClose={this.handleRequestClose}
              >
                <MenuItem onClick={this.handleChangeActive}>{this.props.active ? 'Desactivar' : 'Activar'}</MenuItem>
                <MenuItem onClick={this.handleOpenClick}>Agregar Usuario</MenuItem>
              </Menu>
              <Dialog
                open={this.state.openDialog}
                onRequestClose={this.handleDialogRequestClose}
              >
                <DialogTitle className={this.props.classes.dialog}>Agregar Usuario</DialogTitle>
                <DialogContent>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="">nombre</InputLabel>
                    <Input
                      id="name"
                      type="text"
                      fullWidth
                      value={this.state.name}
                      onChange={this.handleChange('name')}
                    />
                    <FormHelperText error>{this.state.nameError}</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="username">usuario</InputLabel>
                    <Input
                      id="username"
                      type="text"
                      fullWidth
                      value={this.state.username}
                      onChange={this.handleChange('username')}
                      endAdornment={<InputAdornment position="end">@{this.props.identifier}</InputAdornment>}
                    />
                    <FormHelperText error>{this.state.usernameError}</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="password">password</InputLabel>
                    <Input
                      id="password"
                      fullWidth
                      type={this.state.showPassword ? 'text' : 'password'}
                      value={this.state.password}
                      onChange={this.handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={this.handleClickShowPasssword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText error>{this.state.passwordError}</FormHelperText>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button
                    raised
                    color="primary"
                    disabled={this.state.loading}
                    type="submit"
                    onClick={this.handleAddUser}
                  >
                    Agregar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const addUser = gql`
mutation createUser($input:CreateUserInput!){
  createUser(input:$input){
    changedUser{
      id
    }
  }
}
`;

const changeActive = gql`
mutation updateLocation($input:UpdateLocationInput!){
  updateLocation(input:$input){
    changedLocation{
      id
      active
    }
  }
}
`;

export default compose(
  graphql(addUser, { name: 'addUser' }),
  graphql(changeActive, { name: 'changeActive' }),
)(withStyles(styles)(LocationList));
