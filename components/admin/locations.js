import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import Tour from 'reactour';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import ActionMenu from './locations/actionMenu';
import LocationListItem from './locations/locationListItem';

const styles = {
  root: {

  },
};

const steps = [
  {
    selector: '[data-tut="start"]',
    content: () => (
      <div>
        <Typography type="title" color="inherit" paragraph>
          {'Bienvenido al portal de administración.'}
        </Typography>
        <Typography type="body1" color="inherit" paragraph>
          {'Aquí podrás agregar tus edificios y condominios para administrarlos, así como también los usuarios que podrán ejecutar la plataforma.'}
        </Typography>
        <Typography type="body1" color="inherit">
          {'Haz click en el botón para agregar tu primer edificio o condominio.'}
        </Typography>
      </div>
    ),
  },
  {
    selector: '[data-tut="item"]',
    content: () => (
      <div>
        <Typography type="body1" color="inherit" paragraph>
          {'Aquí podrás ver los datos de los lugares que administras, así como también agregar nuevos usuarios.'}
        </Typography>
        <Typography type="body1" color="inherit" paragraph>
          {'Haz click en opciones para agregar un nuevo usuario'}
        </Typography>
      </div>
    ),
  },
  {
    selector: '[data-tut="user"]',
    content: () => (
      <div>
        <Typography type="body1" color="inherit" paragraph>
          {'Aquí podrás ver los usuarios registrados para este edificio/condominio. Haz click en el 1'}
        </Typography>
      </div>
    ),
  },
  {
    selector: '[data-tut="users"]',
    content: () => (
      <div>
        <Typography type="body1" color="inherit" paragraph>
          {'Aquí podrás ver el Nombre, Usuario, Ultimo ingresoa la plataforma y eliminar a los usuarios con acceso al Edificio/Condominio.'}
        </Typography>
        <Typography type="body1" color="inherit" paragraph>
          {'Recuerda que para que las personas asignadas a cada Edificio/Condominio pueden ingresar a la platadorma debes entregarles el nombre de usuario y la contraseña que estableciste al crearlos'}
        </Typography>
      </div>
    ),
  },
];

class Locations extends Component {
  state = {
    tour: false,
    noTour: false,
    showNav: false,
    step: 0,
  };

  componentDidMount = () => {
    const tour = localStorage.getItem('tour'); // eslint-disable-line no-undef
    if (tour) {
      this.setState({ noTour: true });
    } else this.setState({ tour: true });
  }

  handleNav1 = () => {
    if (!this.state.noTour) this.setState({ tour: false, step: 1 });
  }

  handleNav2 = () => {
    if (!this.state.noTour) setTimeout(() => { this.setState({ tour: true }); }, 500);
  }

  handleNav3 = () => {
    if (!this.state.noTour) this.setState({ tour: false, step: 2 });
  }

  handleNav4 = () => {
    if (!this.state.noTour) this.setState({ tour: true });
  }

  handleNav5 = () => {
    if (!this.state.noTour) this.setState({ tour: false });
    this.setState({ noTour: true });
    localStorage.setItem('tour', true); // eslint-disable-line no-undef
  }

  handleClose = () => {
    this.setState({ tour: false });
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <ActionMenu
              id={this.props.userId}
              handleNav1={this.handleNav1}
              handleNav2={this.handleNav2}
            />
            {
              !this.props.locations.loading
                ? (
                  <List>
                    {
                      this.props.locations.getUser.locations.edges.map(item =>
                        (<LocationListItem
                          key={item.node.id}
                          id={item.node.id}
                          name={item.node.name}
                          identifier={item.node.identifier}
                          userId={this.props.userId}
                          users={item.node.users.edges}
                          logs={item.node.logs.aggregations.count}
                          active={item.node.active}
                          handleNav3={this.handleNav3}
                          handleNav4={this.handleNav4}
                          handleNav5={this.handleNav5}
                        />))
                    }
                  </List>)
                : null
            }
          </Grid>
        </Grid>
        <Tour
          steps={steps}
          isOpen={this.state.tour}
          showNumber={false}
          onRequestClose={this.handleClose}
          closeWithMask={false}
          showButtons={this.state.showNav}
          showNavigation={this.state.showNav}
          startAt={this.state.step}
        />
      </div>
    );
  }
}

const getLocations = gql`
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
`;

export default graphql(getLocations, {
  name: 'locations',
  options: ({ userId }) => ({
    variables: {
      id: userId,
    },
  }),
})(withStyles(styles)(Locations));
