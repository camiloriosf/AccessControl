import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    margin: 20,
  },
  paper: {
    padding: 20,
  },
};

function Header(props) {
  return (
    <div className={props.classes.root}>
      <Typography type="title" color="inherit" noWrap className={props.classes.flex}>
        Bienvenido {props.userName} a {props.locationName}
      </Typography>
    </div>
  );
}

export default withStyles(styles)(Header);
