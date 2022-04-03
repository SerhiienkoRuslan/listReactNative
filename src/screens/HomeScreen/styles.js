import { StyleSheet } from 'react-native';
import colors from 'styles/colors';

export default StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    minHeight: 50,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  header: {
    fontWeight: 'bold',
    color: colors.text
  },
  subheader: {
    paddingTop: 10
  }
});
