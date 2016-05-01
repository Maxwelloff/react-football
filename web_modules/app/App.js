import React, { Component, PropTypes } from 'react';

import HeaderNav from "HeaderNav"

export default class App extends Component {
  static propTypes = {
      children: PropTypes.node,
  };

  static defaultProps = {
      children: {},
  };

  render() {
    return (
        <div>
            <HeaderNav />
             {this.props.children}
        </div>
    )
  }
}
