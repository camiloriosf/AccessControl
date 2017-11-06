import React, { Component } from 'react';
import Router from 'next/router';
import { withApollo } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import withRoot from '../components/withRoot';
import withData from '../lib/withData';
import SignupComponent from '../components/auth/signup';
import checkLoggedIn from '../lib/check-logged-in';

const styles = {
  root: {
    paddingTop: 200,
    width: 400,
    margin: '0 auto',
  },
};

class Signup extends Component {
  state = {
    loading: true,
  };
  componentDidMount = () => {
    // console.log(this.props);
    if (localStorage.getItem('user')) { // eslint-disable-line no-undef
      const user = JSON.parse(localStorage.getItem('user')); // eslint-disable-line no-undef
      checkLoggedIn(this.props.client, user).then(({ loggedInUser }) => {
        if (loggedInUser !== null) {
          if (loggedInUser.type === 'admin') Router.push('/admin');
          else if (loggedInUser.type === 'user') Router.push('/user');
          else { localStorage.removeItem('user'); localStorage.removeItem('token'); } // eslint-disable-line no-undef
        } else this.renderComponent();
      }).catch(() => this.renderComponent());
    } else {
      this.renderComponent();
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
            ? 'Cargando ...'
            :
            <SignupComponent />
        }
      </div>
    );
  }
}

export default withRoot(withData(withApollo(withStyles(styles)(Signup))));
