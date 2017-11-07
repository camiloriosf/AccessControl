import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Link from 'next/link';
import Typography from 'material-ui/Typography';

const styles = {
  root: {

  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    cursor: 'pointer',
  },
  logo: {
    maxWidth: 40,
    marginRight: 10,
  },
};

class Header extends Component {
  state = {

  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Link href="/">
          <div className={this.props.classes.content}>
            <img
              className={this.props.classes.logo}
              src="/static/Icono-Bittersweet.png"
              alt="BitterSweet.io"
            />
            <Typography type="display3" paragraph>
              {'EasyAccess'}
            </Typography>
          </div>
        </Link>
      </div>
    );
  }
}

export default (withStyles(styles)(Header));
