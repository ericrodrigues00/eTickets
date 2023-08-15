import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNavigateStackNavigator } from '@react-navigation/stack'

import RegisterScreen from './pages/Register';
import WelcomeScreen from './pages/Welcome';
import LoginScreen from './pages/SignIn';
import TicketRegisterScreen from './pages/TicketRegister';

export default function App() {
  return (
    <>
       <NavigationContainer></NavigationContainer>
    </>
     
   
  );
}


