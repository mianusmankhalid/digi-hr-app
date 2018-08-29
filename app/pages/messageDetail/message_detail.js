import React, { Component } from "react";
import ScrollPages from "@digihr_app_components/scrollPages";
import Message from "./message";

export default class MessageDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dotsPadding: 25,
    };
  }

  onFullScreenHideDots(status) {
    this.setState({
      dotsPadding: status ? 0 : 25,
    });
    console.log(this.state.dotsPadding);
  }

  render() {
    return (
      <ScrollPages
        style={{ flex: 1 }}
        dotsPadding={this.state.dotsPadding}
        dataMap={this.props.messagesData.map((data, index) => {
          return (
            <Message
              key={index}
              data={data}
              index={index}
              onFullScreen={this.props.onFullScreen}
              onFullScreenHideDots={this.onFullScreenHideDots.bind(this)}
            />
          );
        })}
        totalDots={this.props.messagesData.length}
        visibleDots={5}
        selectedDotIndex={this.props.selectedMessageIndex}
      />
    );
  }
}
