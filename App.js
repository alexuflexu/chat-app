// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDK2_bfvEO8gISb-xqxFfSOKBglLFVZHBM",
    authDomain: "chat-app-demo-40b2c.firebaseapp.com",
    projectId: "chat-app-demo-40b2c",
    storageBucket: "chat-app-demo-40b2c.appspot.com",
    messagingSenderId: "794119892725",
    appId: "1:794119892725:web:18016beeb75524ebe35fbc"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={(props) => <Chat {...props} db={db} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
