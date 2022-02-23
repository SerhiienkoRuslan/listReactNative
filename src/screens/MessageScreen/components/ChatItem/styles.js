import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginLeft: 8,
    marginRight: 0
  },
  slackAvatar: {
    height: 40,
    width: 40,
    borderRadius: 3
  },
  emoji: {
    fontSize: 28,
    lineHeight: Platform.OS === 'android' ? 34 : 30
  },
  standardFont: {
    fontSize: 15
  },
  slackMessageText: {
    marginLeft: 0,
    marginRight: 0
  },
  container: {
    flex: 1,
    alignItems: 'flex-start'
  },
  wrapper: {
    marginRight: 60,
    minHeight: 20,
    justifyContent: 'flex-end'
  },
  username: {
    fontWeight: 'bold'
  },
  time: {
    textAlign: 'left',
    fontSize: 12
  },
  timeContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  headerItem: {
    marginRight: 10
  },
  headerView: {
    // Try to align it better with the avatar on Android.
    marginTop: Platform.OS === 'android' ? -2 : 0,
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  /* eslint-disable react-native/no-color-literals */
  tick: {
    backgroundColor: 'transparent',
    color: 'white'
  },
  /* eslint-enable react-native/no-color-literals */
  tickView: {
    flexDirection: 'row'
  },
  slackImage: {
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 0
  }
});
