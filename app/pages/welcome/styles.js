import { StyleSheet } from 'react-native';
import theme from '@digihr_app_config/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background.colors.gray,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginLeft: -170,
    marginTop: 250,
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'center',
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginLeft: -90,
  },
  text: {
    fontFamily: theme.font.family.muli,
    fontSize: 30,
    paddingBottom: 70,
    color: theme.colors.white,
  },
  continueContainer: {
    paddingBottom: 15,
  },
  buttonContainer: {
    backgroundColor: theme.background.colors.gold,
    paddingVertical: 10,
    width: 300,
  },
  buttonText: {
    fontFamily: theme.font.family.muli,
    textAlign: 'center',
    color: theme.colors.white,
  },
});

export default styles;
