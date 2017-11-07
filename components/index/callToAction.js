import React, { Component } from 'react';
import Link from 'next/link';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {
  root: {
    width: '100%',
    margin: '0 auto',
    textAlign: 'center',
    marginTop: 80,
  },
};

class CallToAction extends Component {
  state = {

  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Typography type="display1" paragraph align="center">
          {'¡Bienvenido al sistema de Control De Acceso más rápido de implementar de Chile!'}
        </Typography>
        <Typography type="title" paragraph align="center">
          {'Para comenzar solo haz click en el botón, es totalmente GRATIS.'}
        </Typography>
        <Link href="/signin">
          <Button raised color="primary">
            Iniciar Sesión
          </Button>
        </Link>
      </div>
    );
  }
}

export default (withStyles(styles)(CallToAction));
