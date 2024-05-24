
import React from 'react'
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GuestsScreen } from './src/screens/GuestsScreen';

export const App = () => {
  return (
    <GestureHandlerRootView>
        <GuestsScreen/>
    </GestureHandlerRootView>
  )
}

export default App;
