import React from 'react';

import {RootStackParamList} from './src/types';
import {HomeScreen, NoteScreen} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NoteContextProvider} from './src/note-context';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NoteContextProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen
            component={HomeScreen}
            options={{title: 'Home'}}
            name="Home"
          />
          <RootStack.Screen name="Note" component={NoteScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </NoteContextProvider>
  );
}

export default App;
