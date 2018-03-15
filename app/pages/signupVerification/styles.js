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
    fontSize: 40,
    paddingBottom: 70,
  },
  imageContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default styles;
