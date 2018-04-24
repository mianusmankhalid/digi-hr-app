import styles from './styles';
import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';

const Row = props =>
  props.name !== 'Dira' ? (
    <View style={styles.actionContainer}>
      <TouchableHighlight style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.request.image }} />
      </TouchableHighlight>
      <View>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.detail}>{props.request.description}</Text>
        <Text style={styles.detail}>{props.request.detail}</Text>
      </View>
      <Text style={StatusStyle(props.request.status)}>
        {props.request.status}
      </Text>
    </View>
  ) : (
    <View style={styles.infoContainer}>
      <TouchableHighlight style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.chatbotImage }} />
      </TouchableHighlight>
      <View>
        <Text style={styles.infoTitle}>{props.request.description}</Text>
        <Text style={styles.info}>{props.request.detail}</Text>
      </View>
    </View>
  );

const StatusStyle = status => {
  switch (status) {
    case 'Review':
      return styles.statusReview;
    case 'Rejected':
      return styles.statusRejected;
    case 'Approved':
    default:
      return styles.statusApproved;
  }
};

export default Row;
