import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, Bar, BarChart } from 'recharts';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styles = {
  root: {

  },
  test: {
    backgroundColor: 'red',
  },
};

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

class Dashboard extends Component {
  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <Paper elevation={10}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data}
                  margin={{
                    top: 15, right: 15, left: 15, bottom: 15,
                    }}
                >
                  <XAxis dataKey="name" hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="pv" stroke="#9C27B0" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="uv" stroke="#F44336" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="amt" stroke="#2196F3" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={10}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="name" hide />
                  <Tooltip />
                  <Bar dataKey="pv" fill="#9C27B0" />
                  <Bar dataKey="uv" fill="#F44336" />
                  <Bar dataKey="amt" fill="#2196F3" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
