import { StyleSheet } from 'react-native';
import theme from '@digihr_app_config/theme';

const NAVBAR_HEIGHT = 100;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0,
  },
  container: {
    backgroundColor: theme.background.colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatbotContainer: {
    flexGrow: 0,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: 340,
    backgroundColor: theme.colors.white,
  },
  chatbotSearch: {
    fontFamily: theme.font.family.muli,
    marginLeft: 10,
    marginRight: 60,
    width: 210,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: theme.colors.gold,
    borderWidth: 1,
  },
  titleContainer: {
    height: 30,
    width: 360,
    backgroundColor: theme.background.colors.gray,
  },
  title: {
    fontFamily: theme.font.family.muli,
    marginTop: 8,
    marginLeft: 10,
  },
  actionContainer: {
    flexGrow: 0,
    marginTop: 5,
    height: 70,
    width: 360,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
  },
  imageContainer: {
    marginLeft: 10,
    marginTop: 15,
    borderRadius: 64,
  },
  name: {
    fontFamily: theme.font.family.muli,
    marginLeft: 10,
    marginTop: 4,
  },
  detail: {
    fontFamily: theme.font.family.muli,
    marginLeft: 10,
  },
  statusReview: {
    fontFamily: theme.font.family.muli,
    color: theme.colors.gold,
    position: 'absolute',
    right: 10,
  },
  statusApproved: {
    fontFamily: theme.font.family.muli,
    position: 'absolute',
    right: 10,
  },
  statusRejected: {
    fontFamily: theme.font.family.muli,
    color: theme.colors.red,
    position: 'absolute',
    right: 10,
  },
  infoContainer: {
    flexGrow: 0,
    marginTop: 5,
    height: 140,
    width: 360,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
  },
  infoTitle: {
    fontFamily: theme.font.family.muli,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 4,
  },
  info: {
    fontFamily: theme.font.family.muli,
    marginLeft: 10,
    marginRight: 50,
  },
  footerContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.background.colors.gray,
    height: NAVBAR_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarMargin: { paddingTop: NAVBAR_HEIGHT },
  messageCenter: {
    position: 'absolute',
    bottom: 0,
    top: 420,
    left: 0,
    right: 0,
    height: 100,
  },
  messageList: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: theme.background.colors.gray,
    height: 600,
  },
  messageContainer: {
    flexGrow: 0,
    marginTop: 5,
    marginBottom: 5,
    height: 150,
    width: 340,
    backgroundColor: theme.colors.white,
    alignSelf: 'center',
  },
  messageTitleContainer: {
    fontFamily: theme.font.family.muli,
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
  viewMore: {
    fontFamily: theme.font.family.muli,
    color: theme.colors.gold,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default styles;
