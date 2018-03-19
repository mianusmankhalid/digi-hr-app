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
    fontSize: 20,
  },
  formContainer: {
    flexGrow: 1,
    marginTop: 30,
  },
  continueContainer: {
    paddingBottom: 15,
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
  agreementText: {
    fontFamily: theme.font.family.muli,
    marginTop: 5,
    textAlign: 'center',
  },
  agreement: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 60,
  },
  agreementView: {
    flexDirection: 'column',
  },
  buttonView: {
    paddingLeft: 40,
  },
  hyperLink: {
    fontWeight: '900',
  },
});

export default styles;
