import { StyleSheet } from 'react-native';
import theme from '@digihr_app_config/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background.colors.gray,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flexGrow: 0,
    height: 70,
    marginTop: 5,
  },
  inputContainer: {
    height: 70,
    width: 360,
    backgroundColor: theme.colors.white,
  },
  title: {
    fontFamily: theme.font.family.muli,
    marginTop: 5,
    marginLeft: 10,
  },
  input: {
    fontFamily: theme.font.family.muli,
    height: 40,
    width: 350,
    backgroundColor: 'white',
    paddingLeft: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    width: 360,
    backgroundColor: theme.colors.white,
  },
  switchTitle: {
    fontFamily: theme.font.family.muli,
    marginLeft: 10,
    marginRight: 60,
  },
  buttonView: {
    marginTop: 150,
    paddingLeft: 25,
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
