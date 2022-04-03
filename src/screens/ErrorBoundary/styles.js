import { StyleSheet } from 'react-native';

import colors from 'styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: colors.primary,
    marginBottom: 40
  },
  forgot: {
    color: 'white',
    fontSize: 11
  },
  loginBtn: {
    width: '80%',
    backgroundColor: colors.primary,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: 'white'
  }
});
