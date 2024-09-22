import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, auth, isConnected }) => {
  const [messages, setMessages] = useState([]);
  const { name, backgroundColor, id } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || "[]";
    setMessages(JSON.parse(cachedMessages));
  }

  useEffect(() => {
    let unsubMessages;
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(
        collection(db, "messages"),
        where("uid", "==", id),
        orderBy("createdAt", "desc")
      );

      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          const data = doc.data();
          const createdAt = data.createdAt ? new Date(data.createdAt.toMillis()) : new Date();
          newMessages.push({
            _id: doc.id,
            ...data,
            createdAt
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSend = (newMessages) => {
    if (isConnected) {
      addDoc(collection(db, "messages"), {
        ...newMessages[0],
        createdAt: new Date(),
        uid: id
      });
    }
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
          <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            onSend={messages => onSend(messages)}
            user={{
              _id: id,
              name: name
            }}
          />
        </KeyboardAvoidingView>
      ) : (
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          onSend={messages => onSend(messages)}
          user={{
            _id: id,
            name: name
          }}
        />
      )}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;