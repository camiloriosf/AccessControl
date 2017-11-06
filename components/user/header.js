import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    margin: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
};

function Header(props) {
  return (
    <div className={props.classes.root}>
      <Typography type="body2" color="inherit" noWrap className={props.classes.flex}>
        Bienvenido {props.userName} a {props.locationName}
      </Typography>
    </div>
  );
}

export default withStyles(styles)(Header);
