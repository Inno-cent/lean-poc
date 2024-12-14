/* eslint-disable no-unused-vars */
import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// Import your screens
import HomeScreen from '../screens/home';
import ContactScreen from '../screens/contacts/contact';
import CallScreen from '../screens/call';
import ProfileScreen from '../screens/profile';
import NotificationScreen from '../screens/notification';
// Import icons
import {FontAwesome} from '@expo/vector-icons';

// Create Stack and Tab Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// Main Tab Navigator (for Home, Contact, Call, Profile, etc.)
function MainTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="Call" component={CallScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
