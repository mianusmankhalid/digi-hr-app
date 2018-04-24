import { StyleSheet, Dimensions } from 'react-native';
import theme from '@digihr_app_config/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background.colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    height: 200,
    width,
  },
  imageContainer: {
    height: 150,
    width,
  },
  message: {
    backgroundColor: theme.background.colors.white,
    width,
  },
  messageHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageTitleContainer: {
    fontFamily: theme.font.family.muli,
    marginTop: 5,
    paddingLeft: 10,
    paddingTop: 5,
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  messageDescription: {
    fontFamily: theme.font.family.muli,
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 30,
  },
  date: {
    fontFamily: theme.font.family.muli,
    paddingLeft: 10,
    paddingTop: 5,
    color: 'silver',
    fontSize: 16,
  },
});

export default styles;
