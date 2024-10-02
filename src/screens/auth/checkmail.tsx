import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ConfirmationPage() {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.arrowButton}>
            <Icon name="arrowleft" size={24} color="#1B263B" />
          </TouchableOpacity>

          <View style={styles.mainContent}>
            <Image
              source={require('../../assets/images/confirmmail.png')}
              style={styles.image}
              resizeMode="cover"
            />

            <Text style={styles.headText}>Check your mail</Text>
            <Text style={styles.descriptionText}>
              A verification link has been sent to your email. Please check your
              inbox.
            </Text>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('auth/email-verification')}>
              <Text style={styles.checkoutButtonText}>Check Out</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.skipText}>Skip, I'll confirm later</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.bottomText}>
            Did not receive email? Check your spam or try another email address.
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Aligns all content at the top
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  arrowButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
  },
  arrow: {
    fontSize: 24,
  },
  mainContent: {
    marginTop: 120, 
    alignItems: 'center', // Center content horizontally
  },
  image: {
    marginBottom: 20,
  },
  headText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#1B263BE5',
    marginBottom: 100,
    textAlign: 'center',
    fontWeight: '400',
  },
  checkoutButton: {
    padding: 12,
    backgroundColor: '#415a77',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutButtonText: {
    fontSize: 15,
    color: '#fff',
  },
  skipText: {
    marginTop: 10,
    color: '#778DA9',
    fontWeight: '400',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  bottomText: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    textAlign: 'center',
    color: '#778DA9',
  },
  bottomTextLink: {
    color: '#778DA9',
  },
});
