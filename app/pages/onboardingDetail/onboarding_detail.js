import React, { Component } from 'react';
import ScrollPages from '@digihr_app_components/scrollPages';
import Onboarding from './onboarding';

export default class OnboardingDetailPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollPages
        dataMap={this.props.messagesData.map((data, index) => {
          return <Onboarding key={index} data={data} index={index} />;
        })}
        totalDots={this.props.messagesData.length}
        visibleDots={5}
        // selectedDotIndex={this.props.selectedMessageIndex}
        selectedDotIndex={5}
      />
    );
  }
}
