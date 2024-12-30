/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SocketProvider} from './src/context/socketContext';
import {UserProvider} from './src/context/userContext';
import SplashScreen from './src/screens/SplashScreen';
import Onboarding from './src/screens/onboarding';
import LoginScreen from './src/screens/auth/login';
import SignUpScreen from './src/screens/auth/signup';
import ConfirmationPage from './src/screens/auth/checkmail';
import EmailVerificationScreen from './src/screens/auth/email-verification';
import CreatePasswordScreen from './src/screens/auth/reset-password';
import ResetSuccessScreen from './src/screens/auth/reset-success';
import CongratsMailScreen from './src/screens/auth/congrats';
import ForgetPasswordScreen from './src/screens/auth/forget-password';
import SOS from './src/screens/sos';
import HomePage from './src/screens/home';
import ContactScreen from './src/screens/contacts/contact';
import CreateContactScreen from './src/screens/contacts/create';
import UpdateContactScreen from './src/screens/contacts/update';
import ProfileScreen from './src/screens/profile/profile';
import SettingsScreen from './src/screens/settings';
import Notifications from './src/screens/notification';
import OutgoingCallScreen from './src/screens/outgoingCall';
// import CallListener from './src/screens/callListener';
import IncomingCall from './src/screens/incomingCall';
import CallScreen from './src/screens/callScreen';
import CallLogs from './src/screens/call';
import EditProfileScreen from './src/screens/profile/edit-profile';
import ChangePasswordScreen from './src/screens/profile/change-password';
import EmailVerificationBanner from './src/components/verifyMailNoti';

// import { AuthProvider, AuthContext } from '../context/AuthContext';
// import { ThemeProvider } from '../navigation/ThemeProvider';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        {/* <ThemeProvider> */}
        {/* <AuthProvider> */}
        <UserProvider>
          <SocketProvider>
            <EmailVerificationBanner>
              {/* <CallListener /> */}
              <AppNavigator />
            </EmailVerificationBanner>
          </SocketProvider>
        </UserProvider>
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
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* Splash Screen */}
      <Stack.Screen name="Splash" component={SplashScreen} />

      {/* Onboarding Stack */}
      <Stack.Screen name="OnboardingPage" component={Onboarding} />

      {/* Auth Stack */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="CheckMail" component={ConfirmationPage} />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
      />
      <Stack.Screen name="CongratsMail" component={CongratsMailScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
      <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
      <Stack.Screen name="ResetSuccess" component={ResetSuccessScreen} />

      {/* Main App Stack */}
      <Stack.Screen name="Home" component={HomePage} />

      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="CreateContact" component={CreateContactScreen} />
      <Stack.Screen name="UpdateContact" component={UpdateContactScreen} />
      <Stack.Screen name="Call" component={CallScreen} />
      <Stack.Screen name="CallLogs" component={CallLogs} />

      <Stack.Screen name="SOS" component={SOS} />

      {/* Additional Screens */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="Notification" component={Notifications} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      {/* <Stack.Screen name="HelpSupport" component={HelpSupportScreen} /> */}

      <Stack.Screen name="IncomingCall" component={IncomingCall} />
      <Stack.Screen name="OutgoingCall" component={OutgoingCallScreen} />
      <Stack.Screen name="CallScreen" component={CallScreen} />
    </Stack.Navigator>
  );
}
