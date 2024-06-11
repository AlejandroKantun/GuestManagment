
import React, { useEffect } from 'react'
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GuestsScreen } from './src/screens/GuestsScreen';
import { requestUserPermission,getToken } from './src/firebase/pushNotifications';

import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const App = () => {
  useEffect(() => {
    requestUserPermission();
    getToken();
  }, [])
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <GestureHandlerRootView>
        <GuestsScreen/>
    </GestureHandlerRootView>
  )
}

export default App;
