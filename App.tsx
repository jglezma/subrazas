import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/RootStack';

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
