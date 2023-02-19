import React from "react";
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Welcome } from "./src/components/Welcome";
import { SignIn } from "./src/components/SignIn";
import { SignUp } from "./src/components/SignUp";
import { List } from "./src/components/List/index";


const Stack = createNativeStackNavigator();

function App() {



  return (
    <NavigationContainer >


      <StatusBar backgroundColor="black" barStyle="light-content" />

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Welcome"
      >

        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="List" component={List} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
