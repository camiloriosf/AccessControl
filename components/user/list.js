import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import ListItem from './listItem';

const styles = {
  root: {

  },
};

class List extends Component {
  state = {

  };

  render() {
    return (
      <div className={this.props.classes.root}>
        {
          this.props.data.map(item => (
            <ListItem
              key={item.node.id}
              item={item.node}
              userId={this.props.userId}
            />))
        }
      </div>
    );
  }
}

export default withStyles(styles)(List);
