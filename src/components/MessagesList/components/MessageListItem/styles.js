import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import uiElementSize from 'constants/uiElementSize';

export default StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: 'row',
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    overflow: 'hidden'
  },
  content: {},
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5
  },
  avatar: {
    width: uiElementSize.AVATAR_SIZE,
    height: uiElementSize.AVATAR_SIZE,
    borderRadius: uiElementSize.AVATAR_RADIUS,
    marginTop: 2,
    backgroundColor: colors.primary,
    overflow: 'hidden',
    marginRight: 10
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: colors.text,
    marginRight: 10
  },
  messageText: {
    color: colors.textSecond,
    backgroundColor: 'transparent',
    whiteSpace: 'nowrap',
    width: '50%',
    overflow: 'hidden'
  },
  dateText: {
    color: 'rgb(170, 170, 170)',
    fontSize: 10
  }
});
