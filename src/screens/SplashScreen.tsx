import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getUser} from './auth/auth';
import {useSocket} from '../context/socketContext';

export default function SplashScreen() {
  const navigation = useNavigation();
  const {connectSocket} = useSocket();

  const initializeApp = async () => {
    console.log('111111111');
    try {
      const user = await getUser();
      if (user && user._id) {
        console.log('splashscreenconnect', user);
        connectSocket({
          dialingCode: user.international_dialing_code,
          phoneNumber: user.phone_number,
        });
        navigation.navigate('Home');
      } else {
<<<<<<< HEAD
        navigation.navigate('Login');
        // navigation.navigate('Home');
=======
        // navigation.navigate('Login');
        navigation.navigate('Login');
>>>>>>> c377fd017cf4276b5b10605ec99176926ee2eed1
      }
    } catch (error) {
      console.error('Error during initialization:', error);
      // navigation.navigate('Login');
    }
  };

  useEffect(() => {
    initializeApp(); // Initialize app on component mount
  }, []);

  // useEffect(() => {
  //   // Navigate to onboarding after a 2-second delay
  //   const timeout = setTimeout(() => {
  //     navigation.navigate('OnboardingPage');
  //   }, 1000);

  //   // Cleanup the timeout if the component unmounts
  //   return () => clearTimeout(timeout);
  // }, []);

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
