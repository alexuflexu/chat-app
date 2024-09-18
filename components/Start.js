import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#090C08');
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate('Chat', { 
          name: name || 'Anonymous', 
          backgroundColor, 
          id: result.user.uid 
        });
      })
      .catch((error) => {
        console.log("Error signing in: ", error);
      });
  };
  
  return (
    <ImageBackground
      source={require('../img/bgImage.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.inputContainer}>
          {/* User chooses username */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
            placeholderTextColor='#757083'
          />
          {/* User chooses backgroung color */}
          <Text style={styles.colorText}>Choose background color:</Text>
          <View style={styles.colorContainer}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.colorButton, { backgroundColor: color }]}
                onPress={() => setBackgroundColor(color)}
              />
            ))}
          </View>
          {/* User starts chat */}
          <TouchableOpacity
            style={styles.button}
            onPress={signInUser}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    width: '88%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  textInput: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#757083',
    marginBottom: 15,
    borderRadius: 5,
  },
  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    textAlign: 'center',
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    backgroundColor: '#757083',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Start;