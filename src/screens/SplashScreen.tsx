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
    console.log('splash');
    try {
      const user = await getUser();
      if (user && user._id) {
        console.log('splashscreenconnect', user);
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
        // navigation.navigate('Login');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error during initialization:', error);
      // navigation.navigate('Login');
    }
  };

  useEffect(() => {
    initializeApp(); // Initialize app on component mount
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
