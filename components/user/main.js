import React, { Component } from 'react';
import Router from 'next/router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {

  },
  appFrame: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    height: 'calc(100% - 56px)',
    marginTop: 10,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 10,
    },
  },
  flex: {
    flex: 1,
  },
  button: {
    marginRight: 20,
  },
  paper: {
    marginTop: 100,
    padding: 20,
  },
});

class Main extends Component {
  state = {

  };

  handleSignout = () => {
    localStorage.removeItem('token'); // eslint-disable-line no-undef
    localStorage.removeItem('user'); // eslint-disable-line no-undef
    Router.push('/signin');
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.appFrame}>
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit" className={this.props.classes.flex}>
                Control de acceso
              </Typography>
              <Button raised color="accent" className={this.props.classes.button} onClick={this.handleSignout}>
                Salir
              </Button>
            </Toolbar>
          </AppBar>
          <main className={this.props.classes.content}>
            {
              this.state.blocked
                ? this.renderBlockedForm()
                : this.props.children
            }
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
