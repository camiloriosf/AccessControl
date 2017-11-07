import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    margin: 20,
  },
  paper: {
    padding: 20,
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

class Recover extends Component {
  state = {
    search: '',
    in: true,
    out: false,
    person: false,
    car: false,
  }

  componentWillUpdate(nextProps, nextState) {
    this.props.handleFilter(nextState);
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSwitchChange = name => (event, checked) => {
    this.setState({ [name]: checked });
    if (name === 'in' && this.state.out) this.setState({ out: false });
    if (name === 'out' && this.state.in) this.setState({ in: false });
    if (name === 'car' && this.state.person) this.setState({ person: false });
    if (name === 'person' && this.state.car) this.setState({ car: false });
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Paper elevation={10} className={this.props.classes.paper}>
          <Grid container justify="center">
            <Grid item xs={4} className={this.props.classes.grid}>
              <TextField
                id="search"
                label="Buscar"
                value={this.state.search}
                onChange={this.handleChange('search')}
                fullWidth
              />
            </Grid>
            <Grid item xs={8} className={this.props.classes.grid}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.in}
                    onChange={this.handleSwitchChange('in')}
                  />
                }
                label="Entrada"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.out}
                    onChange={this.handleSwitchChange('out')}
                  />
                }
                label="Salida"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.person}
                    onChange={this.handleSwitchChange('person')}
                  />
                }
                label="Peatones"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.car}
                    onChange={this.handleSwitchChange('car')}
                  />
                }
                label="Vehiculos"
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Recover);
