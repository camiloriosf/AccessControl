import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Header from './index/header';
import CallToAction from './index/callToAction';
import Contact from './index/contact';
import Footer from './index/footer';

const styles = {
  root: {

  },
};

class Index extends Component {
  state = {

  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Header />
        <CallToAction />
        <Contact />
        <Footer />
      </div>
    );
  }
}

export default (withStyles(styles)(Index));

