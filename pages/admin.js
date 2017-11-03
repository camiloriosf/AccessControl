import React, { Component } from 'react';
import Router from 'next/router';
import { withApollo } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import withRoot from '../components/withRoot';
import Main from '../components/admin/main';
import Locations from '../components/admin/locations';
import withData from '../lib/withData';
import checkLoggedIn from '../lib/check-logged-in';

const styles = {
  root: {

  },
};

class Admin extends Component {
  state = {
    loading: true,
    id: '',
  };

  componentDidMount = () => {
    if (localStorage.getItem('user')) { // eslint-disable-line no-undef
      const user = JSON.parse(localStorage.getItem('user')); // eslint-disable-line no-undef
      this.setState({ id: user.id });
      checkLoggedIn(this.props.client, user).then(({ loggedInUser }) => {
        if (loggedInUser !== null) {
          if (loggedInUser.type === 'admin') this.renderComponent();
          else if (loggedInUser.type === 'user') Router.push('/user');
          else { localStorage.removeItem('user'); localStorage.removeItem('token'); Router.push('/'); } // eslint-disable-line no-undef
        } else Router.push('/');
      }).catch(() => Router.push('/'));
    } else {
      Router.push('/');
    }
  }

  renderComponent = () => {
    this.setState({ loading: false });
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        {
          this.state.loading
            ? 'Loading ...'
            :
            <Main handleChange={this.handleChange}>
              <Locations userId={this.state.id} />
            </Main>
        }
      </div>
    );
  }
}

export default withRoot(withData(withApollo(withStyles(styles)(Admin))));
