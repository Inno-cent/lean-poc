import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from './src/screens/SplashScreen'
import Onboarding from './src/screens/onboarding';
import LoginScreen from './src/screens/auth/login'
import SignUpScreen from './src/screens/auth/signup'

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
      {/* <Stack.Screen name="Onboarding2" component={OnboardingPage2} />
      <Stack.Screen name="Onboarding3" component={OnboardingPage3} /> */}

      {/* Auth Stack */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      {/* <Stack.Screen name="CheckMail" component={CheckMailScreen} />
      <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
      <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
      <Stack.Screen name="CongratsMail" component={CongratsMailScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
      <Stack.Screen name="ResetSuccess" component={ResetSuccessScreen} /> */}

      {/* Main App Stack */}
      {/* <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="CreateContact" component={CreateContactScreen} />
      <Stack.Screen name="Call" component={CallScreen} />
      <Stack.Screen name="SOS" component={SosScreen} /> */}

      {/* Additional Screens */}
      {/* <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} /> */}
    </Stack.Navigator>
  );
}
