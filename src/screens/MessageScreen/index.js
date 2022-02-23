import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { GiftedChat } from 'react-native-gifted-chat';

import Loading from 'components/Loading';
import ChatItem from './components/ChatItem';

import { useUserState } from 'context/user';

import { MESSAGER_QUERY, NEW_MESSAGE, SEND_MESSAGE } from './graphql';
import styles from './styles';

const MessageScreen = ({ route }) => {
  const id = route?.params?.messager?._id;
  const { user } = useUserState();

  const [messangerData, setMessangerData] = useState({
    messages: [],
    isLoading: true
  });

  const [getMessages, { loading }] = useLazyQuery(MESSAGER_QUERY, {
    onCompleted: (currentData) => {
      setMessangerData((prev) => ({
        ...prev,
        messages: currentData.getMessages,
        isLoading: false
      }));
    },
    onError: () => {
      setMessangerData((prev) => ({
        ...prev,
        messages: [],
        isLoading: false
      }));
    }
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.log(err)
  });

  useSubscription(NEW_MESSAGE, {
    onSubscriptionData: ({ subscriptionData: { data: messageData } }) => {
      setMessangerData((prev) => ({
        ...prev,
        messages: [messageData.newMessage, ...prev.messages]
      }));
    }
  });

  useEffect(() => {
    if (id) getMessages({ variables: { id } });
  }, []);

  const handleSendMessage = useCallback((newMessage) => {
    const currentText = newMessage?.length && newMessage[0]?.text;

    if (currentText && id) {
      sendMessage({
        variables: { to: id, text: currentText }
      });
    }
  }, []);

  if (loading) return <Loading />;

  return (
    <View style={styles.wrap}>
      <GiftedChat
        messages={messangerData.messages}
        onSend={handleSendMessage}
        user={{ _id: user?._id }}
        renderMessage={(props) => <ChatItem {...props} />}
        scrollToBottom

        // loadEarlier
        // infiniteScroll
        // renderSend={this.renderSend}
        // isTyping={this.state.isTyping}
      />
    </View>
  );
};

export default MessageScreen;
