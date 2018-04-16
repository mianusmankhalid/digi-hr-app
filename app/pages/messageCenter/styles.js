import { StyleSheet } from 'react-native';
import theme from '@digihr_app_config/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background.colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageList: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: theme.background.colors.gray,
  },
  messageContainer: {
    flexGrow: 0,
    marginBottom: 5,
    height: 150,
    width: 340,
    backgroundColor: theme.colors.white,
    alignSelf: 'center',
  },
  messageHeader: {
    marginTop: 10,
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
    fontWeight: '900',
  },
  messageDescription: {
    fontFamily: theme.font.family.muli,
    paddingLeft: 10,
    paddingTop: 5,
  },
  date: {
    fontFamily: theme.font.family.muli,
    paddingLeft: 10,
    paddingTop: 5,
    color: 'silver',
  },
  viewMoreTouchable: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  viewMore: {
    fontFamily: theme.font.family.muli,
    color: theme.colors.gold,
  },
});

export default styles;
