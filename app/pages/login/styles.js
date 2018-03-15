import { StyleSheet } from 'react-native';
import theme from '@digihr_app_config/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background.colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.font.family.muli,
    fontSize: 30,
    textAlign: 'center',
    opacity: 0.9,
    marginTop: -30,
  },
  imageContainer: {
    justifyContent: 'center',
    flexGrow: 1,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  loginFormContainer: {
    paddingBottom: 80,
  },
  input: {
    fontFamily: theme.font.family.muli,
    height: 40,
    width: 300,
    backgroundColor: 'white',
    marginBottom: 10,
    borderColor: theme.colors.gold,
    borderWidth: 2,
    paddingLeft: 20,
  },
  buttonContainer: {
    backgroundColor: theme.background.colors.gold,
    paddingVertical: 15,
  },
  buttonText: {
    fontFamily: theme.font.family.muli,
    textAlign: 'center',
    color: theme.colors.white,
  },
  text: {
    fontFamily: theme.font.family.muli,
    textAlign: 'center',
    marginTop: 10,
  },
  hyperLink: {
    fontWeight: '700',
  },
  signInMessage: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default styles;
