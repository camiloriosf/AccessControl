import React, { Component } from 'react';
import moment from 'moment';
import { gql, graphql } from 'react-apollo';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import WcIcon from 'material-ui-icons/Wc';
import DirectionsCarIcon from 'material-ui-icons/DirectionsCar';
import blue from 'material-ui/colors/blue';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    margin: 20,
  },
  paper: {
    padding: 20,
  },
  paperButton: {
    width: 80,
    textAlign: 'center',
    cursor: 'pointer',
  },
  icon: {
    height: 60,
    width: 60,
    fill: blue[500],
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonCar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButtonPerson: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
};

class RegisterCard extends Component {
  state = {
    type: 'car',
    carElevation: 10,
    personElevation: 0,
    name: '',
    rut: '',
    to: '',
    plate: '',
  };

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleNewRegister = () => {
    this.props.mutate({
      variables: {
        input: {
          type: this.state.type,
          name: this.state.name,
          plate: this.state.type === 'person' ? 'NA' : this.state.plate,
          to: this.state.to,
          rut: this.state.rut,
          in: moment().toISOString(),
          locationId: this.props.locationId,
          userId: this.props.userId,
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
      .then(() => {
        this.setState({
          name: '', rut: '', to: '', plate: '',
        });
      })
      .catch(() => console.log('error')); // eslint-disable-line no-console
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Paper elevation={10} className={this.props.classes.paper}>
          <Grid container justify="center">
            <Grid item xs={6} className={this.props.classes.iconButtonCar}>
              <Paper
                elevation={this.state.carElevation}
                className={this.props.classes.paperButton}
                onMouseEnter={() => { if (this.state.type === 'person') this.setState({ carElevation: 2 }); }}
                onMouseLeave={() => { if (this.state.type === 'person') this.setState({ carElevation: 0 }); }}
                onClick={() => this.setState({ type: 'car', carElevation: 10, personElevation: 0 })}
              >
                <DirectionsCarIcon className={this.props.classes.icon} />
              </Paper>
            </Grid>
            <Grid item xs={6} className={this.props.classes.iconButtonPerson}>
              <Paper
                elevation={this.state.personElevation}
                className={this.props.classes.paperButton}
                onMouseEnter={() => { if (this.state.type === 'car') this.setState({ personElevation: 2 }); }}
                onMouseLeave={() => { if (this.state.type === 'car') this.setState({ personElevation: 0 }); }}
                onClick={() => this.setState({ type: 'person', carElevation: 0, personElevation: 10 })}
              >
                <WcIcon className={this.props.classes.icon} />
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <TextField
                id="name"
                label="Nombre"
                margin="normal"
                value={this.state.name}
                onChange={this.handleChange('name')}
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <TextField
                id="rut"
                label="RUT"
                margin="normal"
                value={this.state.rut}
                onChange={this.handleChange('rut')}
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <TextField
                id="to"
                label="Se dirige a"
                margin="normal"
                value={this.state.to}
                onChange={this.handleChange('to')}
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <TextField
                id="plate"
                label="Patente"
                margin="normal"
                value={this.state.plate}
                onChange={this.handleChange('plate')}
                disabled={this.state.type === 'person'}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} className={this.props.classes.iconButton}>
              <Button raised aria-label="checkIn" color="primary" onClick={this.handleNewRegister}>
                ingresar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const createLog = gql`
mutation createLog($input:CreateLogInput!){
  createLog(input:$input){
    changedLog{
      id
    }
  }
}
`;

export default graphql(createLog)(withStyles(styles)(RegisterCard));

