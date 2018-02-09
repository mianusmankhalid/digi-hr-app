import React, { Component } from 'react';
import NavHelper from './helper';

const withNavHelper = (name, Comp, trackingName) =>
  class extends Component {
    render() {
      return (
        <Comp
          nav_route_name={name}
          nav_tracking_name={trackingName}
          nav_helper={NavHelper}
          {...this.props}
        />
      );
    }
  };

export default withNavHelper;
