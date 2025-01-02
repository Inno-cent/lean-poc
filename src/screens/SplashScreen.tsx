import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getUser} from './auth/auth';
import {useSocket} from '../context/socketContext';
import {useUser} from '../context/userContext';

export default function SplashScreen() {
  const {setUser} = useUser();
  const navigation = useNavigation();
  const {connectSocket} = useSocket();

  const initializeApp = async () => {
    console.log('Splash Screen Initialization');
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout exceeded')), 15000)
    );

    try {
      const user = await Promise.race([getUser(), timeout]);
      if (user && user._id) {
        console.log('User found:', user);
        const userId = `${user.international_dialing_code}${user.phone_number}`;
        // Update user context
        setUser({
          id: user._id,
          name: user.username,
          email: user.email,
          phoneNumber: user.phone_number,
          countryCode: user.international_dialing_code,
        });

        connectSocket(userId);
        navigation.navigate('Home');
      } else {
        console.warn('No valid user found. Redirecting to Login.');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error or timeout during initialization:', error.message);
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    initializeApp(); // Initialize app on component mount
  }, []);

  return (
    <View style={styles.container}>
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
