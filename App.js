import React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native"; // navigation 관련 모듈
import { createStackNavigator } from "@react-navigation/stack"; // navigation 관련 모듈
import "react-native-url-polyfill/auto";

// screens
import Main from "./screens/Main";
import MarkDownViewer from "./screens/MarkDownViewer";
import TextTyping from './screens/TextTyping';
import AppIntro from './screens/AppIntro';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="AppIntro" component={AppIntro} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="Main" component={Main} options={{ gestureEnabled: true }}/>
        <Stack.Screen name="TextTyping" component={TextTyping} options={{ gestureEnabled: true }}/>
        <Stack.Screen name="MarkDownViewer" component={MarkDownViewer} options={{ gestureEnabled: true }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
