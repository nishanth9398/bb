import React, { useState, useEffect, useContext } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  Image,
  FlatList,
  Text,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Context } from '../../context/ContextProvider';
import { useActionSheet } from '@expo/react-native-action-sheet';

import {
  listGroupMessages,
  loadMoreMessages,
} from '../../store/actions/conversation';
import { checkServerError } from '../../utils/errors';
import ActivityModal from '../../components/UI/ActivityModal';
import Colors from '../../constants/Colors';
import ChatTextInput from '../../components/Chat/ChatTextInput';
import GroupMessage from '../../components/GroupChat/GroupMessage';
import GroupChatHeader from '../../components/GroupChat/GroupChatHeader';

import { ENV } from '../../environment';

const BASE_URL = ENV.API_URL;

API_URL = BASE_URL.replace('http://', '');

const GroupChatScreen = (props) => {
  const { groupId } = props.route.params;

  const [chatMessage, setChatMessage] = useState('');
  const [chatSocket, setChatSocket] = useState(null);
  const dispatch = useDispatch();

  const messagesReducer = useSelector(
    (state) => state.listConversationMessages
  );
  const {
    error: errorMessages,
    loading: loadingMessages,
    data: messagesData,
  } = messagesReducer;

  console.log(messagesData);

  useEffect(() => {
    dispatch(listGroupMessages(groupId));
  }, [groupId]);

  const handleLoadMoreMessages = () => {
    if (messagesData?.next) {
      dispatch(loadMoreMessages(messagesData.next));
    }
  };

  const renderMessages = ({ item }) => {
    console.log(item);
    return <GroupMessage isMyMessage={item.sent_by_current} message={item} />;
  };

  if (loadingMessages) {
    <ActivityModal
      loading
      title="Laoding"
      size="small"
      activityColor="white"
      titleColor="white"
      activityWrapperStyle={{
        backgroundColor: Colors.bg,
      }}
    />;
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="height">
      <GroupChatHeader navigation={props.navigation} />
      <View style={styles.messages_Container}>
        {messagesData ? (
          <FlatList
            inverted={true}
            data={messagesData?.results}
            renderItem={renderMessages}
            contentContainerStyle={{ flexDirection: 'column' }}
            onEndReachedThreshold={0.2}
          />
        ) : null}
      </View>
      <ChatTextInput
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
        handleSendMessage={() => {}}
      />
    </KeyboardAvoidingView>
  );
};

export default GroupChatScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    height: '100%',
    width: '100%',
    paddingBottom: 20,
  },

  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },

  noMsgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    width: '100%',
  },

  noMsgImage: {
    width: '30%',
    height: '12%',
    resizeMode: 'contain',
  },

  noMsgText: {
    color: 'white',
    fontSize: 24,
  },

  messages_Container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: Colors.bg,
    height: '90%',
    width: '100%',
    marginBottom: 20,
  },

  sendMessage: {
    backgroundColor: Colors.blue,
    height: '10%',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },

  inputMessage: {
    // flex: 2,
    lineHeight: 23,
    backgroundColor: Colors.white,
    borderRadius: 50,
    marginTop: 2.5,
    paddingLeft: 10,
    width: '85%',
    height: 40,
    textAlignVertical: 'top',
  },

  imgContainer: {
    backgroundColor: Colors.orange,
    borderRadius: 50,
    width: 40,
    height: 40,
    marginLeft: 15,
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },
});
