import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNavigateStackNavigator } from '@react-navigation/stack'

import RegisterScreen from './pages/RegisterScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import LoginScreen from './pages/LoginScreen';
import TicketRegisterScreen from './pages/TicketRegisterScreen';

export default function App() {
  return (
    <>
       <RegisterScreen></RegisterScreen>
    </>
     
   
  );
}


