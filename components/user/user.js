import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { gql, graphql } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import Header from './header';
import List from './list';
import AddRegister from './addRegister';
import Filter from './filter';

const styles = {
  root: {

  },
};

let data = [];

class User extends Component {
  state = {
    filter: {
      search: '',
      in: true,
      out: false,
      person: false,
      car: false,
    },
    data: [

    ],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      if (!nextProps.data.loading) {
        data = nextProps.data.getUser.location.logs.edges;
        this.filterRecords(this.state.filter);
      }
    }
  }

  handleFilter = (filter) => {
    if (
      filter.search !== this.state.filter.search ||
      filter.in !== this.state.filter.in ||
      filter.out !== this.state.filter.out ||
      filter.person !== this.state.filter.person ||
      filter.car !== this.state.filter.car
    ) this.filterRecords(filter);
  }

  filterRecords = (filter) => {
    this.setState({ filter });
    let result = _.filter(data, item =>
      _.includes(_.lowerCase(item.node.type), _.lowerCase(filter.search)) ||
      _.includes(_.lowerCase(item.node.name), _.lowerCase(filter.search)) ||
      _.includes(_.lowerCase(item.node.rut), _.lowerCase(filter.search)) ||
      _.includes(_.lowerCase(item.node.to), _.lowerCase(filter.search)) ||
      _.includes(_.lowerCase(item.node.plate), _.lowerCase(filter.search)) ||
      _.includes(_.lowerCase(item.node.in), _.lowerCase(filter.search)) ||
      _.includes(_.lowerCase(item.node.out), _.lowerCase(filter.search)));

    if (filter.in && !filter.out) {
      result = _.filter(result, item =>
        _.isEqual(item.node.out, null));
    }

    if (filter.out && !filter.in) {
      result = _.filter(result, item =>
        !_.isEqual(item.node.out, null));
    }

    if (filter.car && !filter.person) {
      result = _.filter(result, item =>
        _.isEqual(item.node.type, 'car'));
    }

    if (!filter.car && filter.person) {
      result = _.filter(result, item =>
        _.isEqual(item.node.type, 'person'));
    }

    result = _.sortBy(result, item => moment(item.node.in, 'HH:mm:ss, DD-MM-YYYY').toDate());
    _.reverse(result);

    this.setState({ data: result });
  }

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
                <Filter handleFilter={this.handleFilter} />
                <List
                  data={this.state.data}
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

