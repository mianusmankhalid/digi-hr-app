import React, { Component } from 'react';
import ScrollPages from '@digihr_app_components/scrollPages';
import Message from './message';

export default class MessageDetailPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollPages
        dataMap={this.props.messagesData.map((data, index) => {
          return <Message key={index} data={data} index={index} />;
        })}
        totalDots={this.props.messagesData.length}
        visibleDots={5}
        selectedDotIndex={this.props.selectedMessageIndex}
      />
    );
  }
}
