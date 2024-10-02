import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from './src/screens/SplashScreen'
import Onboarding from './src/screens/onboarding';
import LoginScreen from './src/screens/auth/login'
import SignUpScreen from './src/screens/auth/signup'
import ConfirmationPage from './src/screens/auth/checkmail'
import EmailVerificationScreen from './src/screens/auth/email-verification'
import CreatePasswordScreen from './src/screens/auth/reset-password'
import ResetSuccessScreen from './src/screens/auth/reset-success'
import CongratsMailScreen from './src/screens/auth/congrats'
import ForgetPasswordScreen from './src/screens/auth/forget-password'
import SOS from './src/screens/sos';
import HomePage from './src/screens/home';
import ContactScreen from './src/screens/contact'
import CallScreen from './src/screens/call'

// import { AuthProvider, AuthContext } from '../context/AuthContext';
// import { ThemeProvider } from '../navigation/ThemeProvider';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {/* <ThemeProvider> */}
        {/* <AuthProvider> */}
        <AppNavigator />
        {/* </AuthProvider> */}
        {/* </ThemeProvider> */}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

function AppNavigator() {
  // Example user context, replace with your logic
  // const { user } = useContext(AuthContext);

  useEffect(() => {
    // Handle user redirection logic based on authentication status if needed
  }, []); // Add [user] if needed

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Splash Screen */}
      <Stack.Screen name="Splash" component={SplashScreen} />

      {/* Onboarding Stack */}
      <Stack.Screen name="OnboardingPage" component={Onboarding} />

      {/* Auth Stack */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
       <Stack.Screen name="CheckMail" component={ConfirmationPage} />
      <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
      <Stack.Screen name="CongratsMail" component={CongratsMailScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
      <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
      <Stack.Screen name="ResetSuccess" component={ResetSuccessScreen} /> 

      {/* Main App Stack */}
      <Stack.Screen name="Home" component={HomePage} />
       
      <Stack.Screen name="Contact" component={ContactScreen} />
      {/* <Stack.Screen name="CreateContact" component={CreateContactScreen} /> */}
      <Stack.Screen name="Call" component={CallScreen} />
      <Stack.Screen name="SOS" component={SOS} /> 

      {/* Additional Screens */}
       <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      {/* <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} /> */}
      {/* <Stack.Screen name="Notification" component={NotificationScreen} /> */}
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
      {/* <Stack.Screen name="HelpSupport" component={HelpSupportScreen} /> */}
    </Stack.Navigator>
  );
}
