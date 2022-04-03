import React, { useRef } from 'react';
import { Animated, Text, View, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from 'styles/colors';

import styles from './styles';

const AppleStyleSwipeableRow = ({ children }) => {
  const swipeRef = useRef();

  const close = () => swipeRef?.current?.close();

  const renderLeftActions = (_progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: 'clamp'
    });

    return (
      <RectButton style={styles.leftAction} onPress={close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }]
            }
          ]}
        >
          Archive
        </Animated.Text>
      </RectButton>
    );
  };

  const renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0]
    });

    const pressHandler = () => {
      close();
      Alert.alert(text);
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress, _dragAnimatedValue) => (
    <View
      style={{
        width: 192,
        flexDirection: 'row'
      }}
    >
      {renderRightAction('More', colors.actionMore, 192, progress)}
      {renderRightAction('Flag', colors.actionFlag, 128, progress)}
      {renderRightAction('More', colors.actionDelete, 64, progress)}
    </View>
  );

  return (
    <Swipeable
      ref={swipeRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      {children || ''}
    </Swipeable>
  );
};

export default AppleStyleSwipeableRow;
