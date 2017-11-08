import React, { Component } from 'react';
import moment from 'moment';
import { gql, graphql } from 'react-apollo';
import Paper from 'material-ui/Paper';
import { FormHelperText } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import WcIcon from 'material-ui-icons/Wc';
import DirectionsCarIcon from 'material-ui-icons/DirectionsCar';
import LaunchIcon from 'material-ui-icons/Launch';
import blue from 'material-ui/colors/blue';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    margin: 20,
  },
  paper: {
    padding: 20,
  },
  icon: {
    height: 40,
    width: 40,
    fill: blue[500],
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

class ListItem extends Component {
  state = {
    open: false,
    openError: false,
    out: '',
  };

  handleClickOpen = () => {
    if (!this.props.item.out) this.setState({ open: true, out: moment().toISOString() });
    else this.setState({ openError: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false, openError: false });
  };

  handleCheckOut = () => {
    this.setState({ open: false });
    this.props.mutate({
      variables: {
        input: {
          id: this.props.item.id,
          out: this.state.out,
        },
      },
      refetchQueries: [{
        query: gql`
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
        `,
        variables: { id: this.props.userId },
      }],
    })
      .then(() => console.log('ok')) // eslint-disable-line no-console
      .catch(() => console.log('error')); // eslint-disable-line no-console
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Paper elevation={10} className={this.props.classes.paper}>
          <Grid container justify="center">
            <Grid item xs={12} sm={1} md={1} className={this.props.classes.iconButton}>
              {
                this.props.item.type === 'car'
                  ? <DirectionsCarIcon
                    className={this.props.classes.icon}
                  />
                  : <WcIcon
                    className={this.props.classes.icon}
                  />
              }
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <FormHelperText>Nombre</FormHelperText>
              <Typography type="body1" color="inherit" noWrap>
                {this.props.item.name}
              </Typography>
              <FormHelperText>RUT</FormHelperText>
              <Typography type="subheading" color="inherit" noWrap>
                {this.props.item.rut}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <FormHelperText>Patente</FormHelperText>
              <Typography type="subheading" color="inherit" noWrap>
                {this.props.item.plate}
              </Typography>
              <FormHelperText>Se dirige a</FormHelperText>
              <Typography type="subheading" color="inherit" noWrap>
                {this.props.item.to}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <FormHelperText>Entrada</FormHelperText>
              <Typography type="subheading" color="inherit">
                {moment(this.props.item.in).format('HH:mm:ss, DD-MM-YYYY')}
              </Typography>
              <FormHelperText>Salida</FormHelperText>
              <Typography type="subheading" color="inherit" noWrap>
                {this.props.item.out ? moment(this.props.item.out).format('HH:mm:ss, DD-MM-YYYY') : '-'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={2} className={this.props.classes.iconButton}>
              <Button fab color="primary" aria-label="checkOut" onClick={this.handleClickOpen}>
                <LaunchIcon />
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>Registrar Salida</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Registrar salida de {this.props.item.name}, rut {this.props.item.rut} {this.props.item.type === 'car' ? `patente ${this.props.item.plate}` : ''} a las {moment(this.state.out).format('HH:mm:ss, DD-MM-YYYY')}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleCheckOut} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.openError} onRequestClose={this.handleRequestClose}>
          <DialogTitle>Salida Registrada</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ya existe una salida registrada a las {this.props.item.out} para {this.props.item.name}, rut {this.props.item.rut} {this.props.item.type === 'car' ? `patente ${this.props.item.plate}` : ''}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const createLog = gql`
mutation updateLog($input:UpdateLogInput!){
  updateLog(input:$input){
    changedLog{
      id
    }
  }
}
`;

export default graphql(createLog)(withStyles(styles)(ListItem));
