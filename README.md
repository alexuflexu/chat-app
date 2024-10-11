# Chat App

A mobile chat application built with React Native and Firebase, offering real-time communication features.

## Features
- User authentication
- Real-time messaging
- Image sharing from camera or library
- Location sharing
- Offline message caching
- Customizable chat interface

## Technologies
- React Native: Framework for building native apps using React.
- Expo: A framework and platform for universal React applications.
- Firebase: Provides backend services such as Authentication, Firestore, and Storage.
- Gifted Chat: A customizable chat UI component.
- React Navigation: Navigation routing for React Native apps.

## Key Dependencies
- @react-navigation/native
- @react-navigation/native-stack
- firebase
- react-native-gifted-chat
- expo-image-picker
- expo-location
- react-native-maps
- @react-native-async-storage/async-storage
- @react-native-community/netinfo
- react-native-reanimated
- react-native-safe-area-context
- react-native-screens

### Installation

## How to Clone
To clone the repository, run: `git clone https://github.com/alexuflexu/chat-app.git`

## Install Node.js
To avoid any potential conflicts, it is recommended to use Node.js version 16.19.0. You can manage Node.js versions using nvm:

   ```sh
   nvm use 16.19.0
   ```

## Install Expo CLI
Install Expo globally by running:

   ```sh
   npm install -g expo-cli
   ```

## Install dependencies:

   ```sh
   npm install
   ```

## How to Launch the Project
To start the development server, use:

   ```sh
   npm start
   ```

## Setup Firebase
1. Create a Firebase project using your Google Account.
2. Set up Firestore Database:
- Create your database in production mode.
- Navigate to the "Rules" tab and change:

   ```sh
   allow read, write: if false
   ```
to:

   ```sh
   allow read, write: if true
   ```

- Click "Publish" to save the changes.

## Launch the Project
1. Download the Expo Go app on your mobile device.
2. Start the development server by running:

   ```sh
   npm start
   ```
or

   ```sh
   expo start
   ```

3. Scan the QR code with the Expo Go app to open the project on your mobile device.
  
## Offline Functionality
Messages are cached using AsyncStorage for offline access

## Customization
Users can select chat background color on the Start screen
