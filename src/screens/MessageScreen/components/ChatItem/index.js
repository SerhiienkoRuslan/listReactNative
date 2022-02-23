import React from 'react';
import { View } from 'react-native';
import emojiUtils from 'emoji-utils';
import { Avatar, Day, utils } from 'react-native-gifted-chat';

import Bubble from './Bubble';
import styles from './styles';

const { isSameUser, isSameDay } = utils;

const ChatItem = (props) => {
  const { currentMessage, nextMessage, previousMessage, renderBubble } = props;
  const { text: currText, createdAt } = currentMessage;
  const isEmoji = currText && emojiUtils.isPureEmojiString(currText);

  const getInnerComponentProps = () => {
    const { containerStyle, ...rest } = props;
    return {
      ...rest,
      position: 'left',
      isSameUser,
      isSameDay
    };
  };

  const renderDay = () => {
    if (createdAt) {
      const dayProps = getInnerComponentProps();
      return <Day {...dayProps} />;
    }
    return null;
  };

  const renderAvatar = () => {
    let extraStyle;
    if (
      isSameUser(currentMessage, previousMessage) &&
      isSameDay(currentMessage, previousMessage)
    ) {
      // Set the invisible avatar height to 0, but keep the width, padding, etc.
      extraStyle = { height: 0 };
    }

    const avatarProps = getInnerComponentProps();

    return (
      <Avatar
        {...avatarProps}
        imageStyle={{
          left: [styles.slackAvatar, avatarProps.imageStyle, extraStyle]
        }}
      />
    );
  };

  const renderBubbleComponent = () => {
    const bubbleProps = getInnerComponentProps();

    if (renderBubble) {
      return renderBubble(bubbleProps);
    }

    return <Bubble {...bubbleProps} />;
  };

  const marginBottom = isSameUser(currentMessage, nextMessage) ? 2 : 10;

  return (
    <View {...props}>
      {renderDay()}

      <View style={[styles.wrap, { marginBottom }, isEmoji && styles.emoji]}>
        {renderAvatar()}
        {renderBubbleComponent()}
      </View>
    </View>
  );
};

export default React.memo(ChatItem);

ChatItem.defaultProps = {
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {}
};
