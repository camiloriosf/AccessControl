import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import Tour from 'reactour';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import ActionMenu from './locations/actionMenu';
import LocationListItem from './locations/locationListItem';

const styles = {
  root: {

  },
};

const steps1 = [
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
];
const steps2 = [
  {
    selector: '[data-tut="test"]',
    content: () => (
      <div>
        <Typography type="body1" color="inherit" paragraph>
          {'Aquí podrás ver los datos de los lugares que administras, así como también agregar nuevos usuarios.'}
        </Typography>
      </div>
    ),
  },
];

class Locations extends Component {
  state = {
    tour1: true,
    tour2: false,
    showNav: false,
  };

  handleNav1 = () => {
    this.setState({ tour1: false });
  }

  handleNav2 = () => {
    this.setState({ tour2: true });
  }

  handleClose = () => {
    this.setState({ tour1: false, tour2: false });
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Button
              color="accent"
              onClick={this.handleNav2}
            >
              test
            </Button>
            <ActionMenu
              id={this.props.userId}
              handleNav1={this.handleNav1}
              handleNav2={this.handleNav2}
            />
            {
              !this.props.locations.loading
                ? (
                  <List>
                    {this.props.locations.getUser.locations.edges.map(item =>
                      (<LocationListItem
                        key={item.node.id}
                        id={item.node.id}
                        name={item.node.name}
                        identifier={item.node.identifier}
                        userId={this.props.userId}
                        users={item.node.users.edges}
                        logs={item.node.logs.aggregations.count}
                        active={item.node.active}
                      />))}
                  </List>)
                : null
            }
          </Grid>
        </Grid>
        <Tour
          steps={steps1}
          isOpen={this.state.tour1}
          showNumber={false}
          onRequestClose={this.handleClose}
          closeWithMask={false}
          showButtons={this.state.showNav}
          showNavigation={this.state.showNav}
        />
        <Tour
          steps={steps2}
          isOpen={this.state.tour2}
          showNumber={false}
          onRequestClose={this.handleClose}
          closeWithMask={false}
          showButtons={this.state.showNav}
          showNavigation={this.state.showNav}
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
