/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {
  Container,
  ConversationDetail,
  TextInput,
  useChatContext,
} from 'react-native-chat-uikit';

const appKey = 'easemob#easeim';
const userId = 'du004';
const userPassword = '1';
const usePassword = true; // or false;
const peerId = 'du005';

function SendMessage() {
  const [page, setPage] = React.useState(0);
  const [_appKey, setAppKey] = React.useState(appKey);
  const [id, setId] = React.useState(userId);
  const [ps, setPs] = React.useState(userPassword);
  const [peer, setPeer] = React.useState(peerId);
  const im = useChatContext();

  // return (
  //   <View style={{flex: 1, backgroundColor: 'red'}}></View>
  // );

  if (page === 0) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TextInput
          placeholder="Please App Key."
          value={_appKey}
          onChangeText={setAppKey}
        />
        <TextInput
          placeholder="Please Login ID."
          value={id}
          onChangeText={setId}
        />
        <TextInput
          placeholder="Please Login token or password."
          value={ps}
          onChangeText={setPs}
        />
        <TextInput
          placeholder="Please peer ID."
          value={peer}
          onChangeText={setPeer}
        />
        <Pressable
          onPress={() => {
            im.login({
              userId: id,
              userToken: ps,
              usePassword: usePassword,
              result: res => {
                console.log('login result', res);
                if (res.isOk === true) {
                  setPage(1);
                }
              },
            });
          }}>
          <Text>{'Login'}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            im.logout({
              result: () => {},
            });
          }}>
          <Text>{'Logout'}</Text>
        </Pressable>
      </SafeAreaView>
    );
  } else if (page === 1) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ConversationDetail
          convId={peer}
          convType={0}
          onBack={() => {
            setPage(0);
            im.logout({
              result: () => {},
            });
          }}
          type={'chat'}
        />
      </SafeAreaView>
    );
  } else {
    return <View />;
  }
}

export default function App(): React.JSX.Element {
  return (
    <Container options={{appKey: appKey, autoLogin: false}}>
      <SendMessage />
    </Container>
  );
}
