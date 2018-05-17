import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import NavHelper from "./screen_helper";
import { isDebuggingEnabled } from "@digihr_lib/dev_helper";
import { connect } from "react-redux";
import { consumeGoBackScreenParams } from "./actions";

const mapStateToProps = (state, ownProps) => ({
  navParams: ownProps.navigation ? ownProps.navigation.state.params : {},
  navState: state.navigation,
  navigating: state.navigation.navigating || false,
});

const withNavHelper = (name, Comp, trackingName) => {
  class NavAwareScreen extends Component {
    static navigationOptions = {
      header: null,
    };

    componentWillReceiveProps = nextProps => {
      if (this.navHelper.backNavigationHappened()) {
        var navParams = this.navHelper.getBackParams();
        nextProps.dispatch(
          consumeGoBackScreenParams(nextProps.navigation.state.key)
        );
        if ('backNavigationDidHappen' in this.screenInstance) {
          this.screenInstance.backNavigationDidHappen(navParams);
        }
      }
    };

    constructor(props) {
      super(props);
      this.displayName = name;
      this.navHelper = new NavHelper(this, props.dispatch);
      this.screenInstance = null;

      if (isDebuggingEnabled()) {
        console.groupCollapsed(
          `%cConstructed screen: (${name})`,
          'color:green'
        );

        const { params } = this.props.navigation.state;

        console.group('%cParams List', 'color:blue');
        console.dirxml(params);
        console.groupEnd();

        console.groupEnd();
      }
    }

    get TrackingName() {
      return trackingName;
    }

    get ScreenName() {
      return name;
    }

    render() {
      return (
        <Comp
          nav_route_name={name}
          nav_tracking_name={trackingName}
          nav_helper={this.navHelper}
          {...this.props}
          ref={inst => (this.screenInstance = inst)}
        />
      );
    }
  }

  hoistNonReactStatic(NavAwareScreen, Comp);
  return connect(mapStateToProps)(NavAwareScreen);
};

export default withNavHelper;
