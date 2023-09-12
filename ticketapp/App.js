import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import UserRegisterScreen from "./pages/UserRegisterScreen";
import GetStartedScreen from "./pages/GetStartedScreen";
import LoginScreen from "./pages/LoginScreen";
import AnnouncementRegisterScreen from "./pages/AnnouncementRegisterScreen";
import AnnouncementsScreen from "./pages/AnnouncementsScreen";
import UserProfileScreen from "./pages/UserProfileScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, 
  }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
        <Stack.Screen name="UserRegisterScreen" component={UserRegisterScreen} />
        <Stack.Screen name="AnnouncementRegisterScreen" component={AnnouncementRegisterScreen} />
        <Stack.Screen
          name="AnnouncementsScreen"
          component={AnnouncementsScreen}
/>
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
