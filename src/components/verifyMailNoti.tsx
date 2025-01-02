import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const EmailVerificationBanner = () => {
  const navigation = useNavigation();
  const state = useNavigationState((state) => state);
  const homeRoute = 'Home'; // Define the homepage route name
  const currentRouteName = state?.routes?.[state.index]?.name;
  const [showBanner, setShowBanner] = useState(true);

  // Only show the banner if the current route is the homepage
  const shouldShowBanner = currentRouteName === homeRoute && showBanner;

  // Handle the click event on the email link
  const handleLinkClick = () => {
    setShowBanner(false);

    // Redirect user to the email verification page
    navigation.navigate('VerifyEmail');
  };

  if (!shouldShowBanner) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>
        Verify your email address so that you don't lose your account.{' '}
        <TouchableOpacity onPress={handleLinkClick}>
          <Text style={styles.link}>Click here to verify</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FFF',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 14,
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default EmailVerificationBanner;
