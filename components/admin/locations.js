import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import ActionMenu from './locations/actionMenu';
import LocationListItem from './locations/locationListItem';

const styles = {
  root: {

  },
};

class Locations extends Component {
  state = {

  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <ActionMenu id={this.props.userId} />
            {
              !this.props.locations.loading
                ? this.props.locations.getUser.locations.edges.map(item =>
                  (<LocationListItem
                    key={item.node.id}
                    id={item.node.id}
                    name={item.node.name}
                    identifier={item.node.identifier}
                    userId={this.props.userId}
                    users={item.node.users.aggregations.count}
                    logs={2000}
                    active={item.node.active}
                  />))
                : null
            }
          </Grid>
        </Grid>
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
