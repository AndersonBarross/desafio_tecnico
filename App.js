
import React, { useState, useContext } from "react";
//import { useFonts } from "expo-font";
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Welcome } from "./src/components/Welcome";
import { SignIn } from "./src/components/SignIn";
import { SignUp } from "./src/components/SignUp";
import { List } from "./src/components/List/index";
//import { Registration } from "./src/components/Registration";
//import { AuthProvider } from "./src/Registration/Contexts/Auth";
//import { SignUp1 } from "./src/Registration/SignUp";


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

// -------------------------------------------------




//============================================================
/*
// original
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Welcome } from './src/components/Welcome';

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
