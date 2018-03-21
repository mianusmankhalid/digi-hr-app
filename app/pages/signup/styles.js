import { StyleSheet } from 'react-native';
import theme from '@digihr_app_config/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background.colors.white,
    flex: 1,
  },
  formContainer: {
    flexGrow: 1,
    marginTop: 30,
  },
  title: {
    fontFamily: theme.font.family.muli,
    fontSize: 20,
    marginLeft: 20,
  },
  input: {
    fontFamily: theme.font.family.muli,
    height: 40,
    width: 300,
    backgroundColor: 'white',
    marginTop: 20,
    borderColor: theme.colors.gold,
    borderWidth: 2,
    paddingLeft: 20,
    marginLeft: 20,
  },
  agreementView: {
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 55,
    marginTop: 250,
  },
  agreement: {
    flexDirection: 'row',
    marginLeft: -10,
  },
  agreementText: {
    fontFamily: theme.font.family.muli,
    marginTop: 5,
    textAlign: 'center',
  },
  hyperLink: {
    fontWeight: '900',
  },
  buttonView: {
    paddingLeft: 20,
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
