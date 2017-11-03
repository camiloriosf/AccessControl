import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import Header from './header';
import List from './list';
import AddRegister from './addRegister';
// import Filter from './filter';

const styles = {
  root: {

  },
};

class User extends Component {
  state = {

  }

  /* handleFilter = (filter) => {
    if (
      filter.search !== this.state.filter.search ||
      filter.in !== this.state.filter.in ||
      filter.out !== this.state.filter.out ||
      filter.person !== this.state.filter.person ||
      filter.car !== this.state.filter.car
    ) this.filterRecors(filter);
  } */

  /* filterRecords = (filter) => {
    this.setState({ filter });
    let result = _.filter(data, item =>
      _.includes(_.lowerCase(item.type), _.lowerCase(filter.search)) ||
      _.includes(_.lowerCase(item.name), _.lowerCase(filter.search)) ||
      _.includes(_.lowerCase(item.rut), _.lowerCase(filter.search)) ||
      _.includes(_.lowerCase(item.to), _.lowerCase(filter.search)) ||
      _.includes(_.lowerCase(item.plate), _.lowerCase(filter.search)) ||
      _.includes(_.lowerCase(item.in), _.lowerCase(filter.search)) ||
      _.includes(_.lowerCase(item.out), _.lowerCase(filter.search)));

    if (filter.in && !filter.out) {
      result = _.filter(result, item =>
        _.isEqual(item.out, '-'));
    }

    if (filter.out && !filter.in) {
      result = _.filter(result, item =>
        !_.isEqual(item.out, '-'));
    }

    if (filter.car && !filter.person) {
      result = _.filter(result, item =>
        _.isEqual(item.type, 'car'));
    }

    if (!filter.car && filter.person) {
      result = _.filter(result, item =>
        _.isEqual(item.type, 'person'));
    }

    result = _.sortBy(result, item => moment(item.in, 'HH:mm:ss, DD-MM-YYYY').toDate());
    _.reverse(result);

    this.setState({ data: result });
  } */

  render() {
    return (
      <div className={this.props.classes.root}>
        {
          !this.props.data.loading
            ?
              <div>
                <Header
                  userName={this.props.data.getUser.name}
                  locationName={this.props.data.getUser.location.name}
                />
                <AddRegister
                  userId={this.props.data.getUser.id}
                  locationId={this.props.data.getUser.location.id}
                />
                <List
                  data={this.props.data.getUser.location.logs.edges}
                  userId={this.props.data.getUser.id}
                />
              </div>
            : null
        }
      </div>
    );
  }
}

const getLocation = gql`
query getUser($id:ID!){
  getUser(id:$id){
    id
    name
    location{
      id
      name
      logs{
        edges{
          node{
            id
            name
            rut
            plate
            to
            in
            out
            type
          }
        }
      }
    }
  }
}
`;

export default graphql(getLocation, {
  options: ({ userId }) => ({
    variables: {
      id: userId,
    },
  }),
})(withStyles(styles)(User));

