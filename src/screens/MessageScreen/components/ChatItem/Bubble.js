import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';
import {
  MessageText,
  MessageImage,
  Time,
  utils
} from 'react-native-gifted-chat';

import styles from './styles';

const { isSameUser, isSameDay } = utils;

const Bubble = (props, context) => {
  const {
    currentMessage,
    previousMessage,
    containerStyle,
    touchableProps,
    wrapperStyle,
    onLongPress,
    renderMessageText,
    renderMessageImage,
    renderTicks,
    tickStyle,
    renderUsername,
    usernameStyle,
    renderTime,
    renderCustomView,
    user
  } = props;
  const isSameThread =
    isSameUser(currentMessage, previousMessage) &&
    isSameDay(currentMessage, previousMessage);

  const handleLongPress = () => {
    if (onLongPress) {
      onLongPress(context, currentMessage);
    } else {
      // if (currentMessage.text) {
      //   const options = ['Copy Text', 'Cancel'];
      //   const cancelButtonIndex = options.length - 1;
      //
      //   context.actionSheet().showActionSheetWithOptions(
      //     {
      //       options,
      //       cancelButtonIndex
      //     },
      //     (buttonIndex) => {
      //       switch (buttonIndex) {
      //         case 0:
      //           Clipboard.setString(currentMessage.text);
      //           break;
      //       }
      //     }
      //   );
      // }
    }
  };

  const renderMessageTextComponent = () => {
    if (currentMessage.text) {
      const {
        containerStyle,
        wrapperStyle,
        messageTextStyle,
        ...messageTextProps
      } = props;

      if (renderMessageText) {
        return renderMessageText(messageTextProps);
      }

      return (
        <MessageText
          {...messageTextProps}
          textStyle={{
            left: [
              styles.standardFont,
              styles.slackMessageText,
              messageTextProps.textStyle,
              messageTextStyle
            ]
          }}
        />
      );
    }

    return null;
  };

  const renderMessageImageComponent = () => {
    if (currentMessage.image) {
      const { containerStyle, wrapperStyle, ...messageImageProps } = props;

      if (renderMessageImage) {
        return renderMessageImage(messageImageProps);
      }

      return (
        <MessageImage
          {...messageImageProps}
          imageStyle={[styles.slackImage, messageImageProps.imageStyle]}
        />
      );
    }

    return null;
  };

  const renderTicksComponent = () => {
    if (renderTicks) {
      return renderTicks(currentMessage);
    }

    if (currentMessage?.user?._id !== user?._id) {
      return null;
    }

    if (currentMessage.sent || currentMessage.received) {
      return (
        <View style={[styles.headerItem, styles.tickView]}>
          <Text style={[styles.standardFont, styles.tick, tickStyle]}>✓</Text>
        </View>
      );
    }

    return null;
  };

  const renderUsernameComponent = () => {
    const username = currentMessage?.user?.name;

    if (username) {
      const { containerStyle, wrapperStyle, ...usernameProps } = props;

      if (renderUsername) {
        return renderUsername(usernameProps);
      }

      return (
        <Text
          style={[
            styles.standardFont,
            styles.headerItem,
            styles.username,
            usernameStyle
          ]}
        >
          {username}
        </Text>
      );
    }

    return null;
  };

  const renderTimeComponent = () => {
    if (currentMessage.createdAt) {
      const { containerStyle, wrapperStyle, ...timeProps } = props;

      if (renderTime) {
        return renderTime(timeProps);
      }

      return (
        <Time
          {...timeProps}
          containerStyle={{ left: [styles.timeContainer] }}
          textStyle={{
            left: [
              styles.standardFont,
              styles.headerItem,
              styles.time,
              timeProps.textStyle
            ]
          }}
        />
      );
    }

    return null;
  };

  const renderCustomViewComponent = () => {
    if (renderCustomView) {
      return renderCustomView(props);
    }
    return null;
  };

  const messageHeader = isSameThread ? null : (
    <View style={styles.headerView}>
      {renderUsernameComponent()}
      {renderTimeComponent()}
      {renderTicksComponent()}
    </View>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onLongPress={handleLongPress}
        accessibilityTraits="text"
        {...touchableProps}
      >
        <View style={[styles.wrapper, wrapperStyle]}>
          <View>
            {renderCustomViewComponent()}
            {messageHeader}
            {renderMessageImageComponent()}
            {renderMessageTextComponent()}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Bubble;

Bubble.defaultProps = {
  touchableProps: {},
  onLongPress: null,
  renderMessageImage: null,
  renderMessageText: null,
  renderCustomView: null,
  renderTime: null,
  currentMessage: {
    text: null,
    createdAt: null,
    image: null
  },
  nextMessage: {},
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  tickStyle: {},
  containerToNextStyle: {},
  containerToPreviousStyle: {}
};
