import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigationState, useNavigation} from '@react-navigation/native';

const EmailVerificationBanner = ({children}) => {
  const navigation = useNavigation();
  const state = useNavigationState(state => state);
  const authRoutes = ['Login', 'Signup', 'ForgotPassword', 'Splash']; // Define your auth routes here
  const currentRouteName = state?.routes?.[state.index]?.name;
  const [showBanner, setShowBanner] = useState(true);

  // Only show the banner if the current route is not an auth route
  const shouldShowBanner = !authRoutes.includes(currentRouteName) && showBanner;

  // Handle the click event on the email link
  const handleLinkClick = async () => {
    setShowBanner(false);

    // Redirect user to the email verification page or wherever needed
    navigation.navigate('VerifyEmail');
  };

  if (!shouldShowBanner) return null;
  return (
    <View style={{flex: 1}}>
      {showBanner && (
        <View style={styles.banner}>
          <Text style={styles.text}>
            Verify your email address so that you don't lose your account.{' '}
            <TouchableOpacity onPress={handleLinkClick}>
              <Text style={styles.link}>Click here to verify</Text>
            </TouchableOpacity>
          </Text>
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ffa500',
    zIndex: 1000,
  },
  text: {
    color: '#1B263B',
    fontSize: 14,
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default EmailVerificationBanner;
