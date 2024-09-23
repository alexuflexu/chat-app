// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import functions for initializing firestore
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();  
  
  const firebaseConfig = {
    apiKey: "AIzaSyCH6AA4rVId456N0B8aRYohCa4jcvllm-w",
    authDomain: "chatappfirestore-e9bad.firebaseapp.com",
    projectId: "chatappfirestore-e9bad",
    storageBucket: "chatappfirestore-e9bad.appspot.com",
    messagingSenderId: "958087658043",
    appId: "1:958087658043:web:79c30ef1e2ff40a463ba1e"
  };

  // Initialize Firebase
  let app;
  let auth;
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } else {
    app = getApp();
    auth = getAuth(app);
  }

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  
  // Initialize Cloud Storage and get a reference to the service
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} auth={auth} storage={storage} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App