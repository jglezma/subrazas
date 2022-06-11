import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ListRazas from './listRazas';
import detailRaza from './detail';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="razas"
        component={ListRazas}
        options={{
          // Hide header
          headerShown: false,
          contentStyle: {backgroundColor: '#fafafa'},
        }}
      />
      <Stack.Screen
        name="Subraza"
        component={detailRaza}
        options={{
          contentStyle: {backgroundColor: '#fafafa'},
          headerBackTitle: 'Atras'
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
