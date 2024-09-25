import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native'; 

export default function SplashScreen() {
    const navigation = useNavigation();

    useEffect(() => {
      // Navigate to onboarding after a 2-second delay
      const timeout = setTimeout(() => {
        navigation.navigate('OnboardingPage');
      }, 5000);

      // Cleanup the timeout if the component unmounts
      return () => clearTimeout(timeout);
    }, []);

  return (
    <View style={styles.container}>
      {/* Replace with your logo */}
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

});
