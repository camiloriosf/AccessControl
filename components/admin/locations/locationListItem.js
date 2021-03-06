import React, { Component } from 'react';
import moment from 'moment';
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
import Collapse from 'material-ui/transitions/Collapse';
import List, {
  ListItem,
  ListItemSecondaryAction,
} from 'material-ui/List';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import DeleteIcon from 'material-ui-icons/Delete';
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
    openCollapse: false,
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
    this.props.handleNav3();
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
                      edges{
                        node{
                          id
                          name
                          username
                          lastLogin
                        }
                      }
                    }
                    logs{
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
        this.props.handleNav4();
      })
      .catch(() => console.log('error')); // eslint-disable-line no-console
  }

  handleDeleteUser = id => () => {
    this.props.deleteUser({
      variables: {
        input: {
          id,
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
                      edges{
                        node{
                          id
                          name
                          username
                          lastLogin
                        }
                      }
                    }
                    logs{
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
      .then(() => console.log('error')) // eslint-disable-line no-console
      .catch(() => console.log('error')); // eslint-disable-line no-console
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Paper elevation={10} className={this.props.classes.paper} data-tut="item">
          <Grid container justify="center">
            <Grid item xs={2}>
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
            <Grid item xs={2}>
              <FormHelperText>Usuarios</FormHelperText>
              <Button
                color="primary"
                dense
                data-tut="user"
                onClick={() => {
                  this.setState({ openCollapse: !this.state.openCollapse });
                  this.props.handleNav5();
                }}
              >
                {this.props.users.length}
              </Button>
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
                    <FormHelperText>
                      Nombre de la persona que podrá acceder a la plataforma
                    </FormHelperText>
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
                    <FormHelperText>
                      Nombre de usuario que utilizará la persona para ingresar a la plataforma
                    </FormHelperText>
                    <FormHelperText error>{this.state.usernameError}</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="password">contraseña</InputLabel>
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
                    <FormHelperText>
                      Contraseña que utilizará la persona para ingresar a la plataforma
                    </FormHelperText>
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
                  <Button
                    color="accent"
                    onClick={this.handleDialogRequestClose}
                  >
                    Cancelar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
          <Collapse in={this.state.openCollapse} transitionDuration="auto" unmountOnExit>
            <List>
              {
                this.props.users.map(({ node }) => (
                  <ListItem key={node.id}>
                    <Grid container>
                      <Grid item xs={4} >
                        <FormHelperText>Nombre</FormHelperText>
                        <Typography type="subheading" color="inherit" noWrap>
                          {node.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} >
                        <FormHelperText>Usuario</FormHelperText>
                        <Typography type="subheading" color="inherit" noWrap>
                          {node.username}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} >
                        <FormHelperText>Ultimo ingreso</FormHelperText>
                        <Typography type="subheading" color="inherit" noWrap>
                          {moment(node.lastLogin).format('HH:mm:ss, DD-MM-YYYY')}
                        </Typography>
                      </Grid>
                    </Grid>
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={this.handleDeleteUser(node.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
            </List>
          </Collapse>
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

const deleteUser = gql`
mutation deleteUser($input:DeleteUserInput!){
  deleteUser(input:$input){
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
  graphql(deleteUser, { name: 'deleteUser' }),
  graphql(changeActive, { name: 'changeActive' }),
)(withStyles(styles)(LocationList));
