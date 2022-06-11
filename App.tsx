import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/RootStack';
import {DogContextProvider} from './src/context/apiContext';

export default function App() {
  return (
    <NavigationContainer>
      <DogContextProvider>
        <RootStack />
      </DogContextProvider>
    </NavigationContainer>
  );
}
