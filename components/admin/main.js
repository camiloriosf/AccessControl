import React, { Component } from 'react';
import Router from 'next/router';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const drawerWidth = 240;

const styles = theme => ({
  root: {

  },
  flex: {
    flex: 1,
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  button: {
    marginRight: 20,
  },
});

class Main extends Component {
  handleSignout = () => {
    localStorage.removeItem('token'); // eslint-disable-line no-undef
    localStorage.removeItem('user'); // eslint-disable-line no-undef
    Router.push('/');
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.appFrame}>
          <AppBar className={classNames(this.props.classes.appBar)}>
            <Toolbar>
              <Typography type="title" color="inherit" noWrap className={this.props.classes.flex}>
                Control de acceso
              </Typography>
              <Button className={this.props.classes.button} onClick={this.handleSignout}>
                Salir
              </Button>
            </Toolbar>
          </AppBar>
          <main className={this.props.classes.content}>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Main);
