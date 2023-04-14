import React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-url-polyfill/auto"

// screen
import Main from "./screens/Main";
import Uploading from "./screens/Uploading"
import MarkDownViewer from "./screens/MarkDownViewer";
import TextTyping from './screens/TextTyping';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="TextTyping" component={TextTyping}/>
        <Stack.Screen name="Uploading" component={Uploading}/>
        <Stack.Screen name="MarkDownViewer" component={MarkDownViewer}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
