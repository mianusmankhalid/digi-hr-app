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
  font: {
    fontFamily: theme.font.family.muli,
  },
  moreVideosTitle: {
    fontSize: 16,
    fontWeight: '900',
  },
  iconView: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.background.colors.gray,
  },
  collapseView: {
    backgroundColor: theme.background.colors.gray,
    paddingBottom: 80,
  },
  videoLink: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
    width,
    backgroundColor: theme.background.colors.white,
  },
});

export default styles;
