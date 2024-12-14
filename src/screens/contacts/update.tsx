import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { updateContact } from './api';

interface Contact {
    _id: string;
    first_name: string;
    last_name: string;
    international_dialing_code: string;
    phone_number: string;
    profileImage: any;
}

interface RouteParams {
  contact: Contact;
}

const UpdateContact = () => {
  const route = useRoute<RouteProp<RouteParams>>();
  const { contact } = route.params;
  const [firstName, setFirstName] = useState(contact.first_name || '');
  const [lastName, setLastName] = useState(contact.last_name || '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(contact.phone_number || '');
  const [idc, setIdc] = useState(contact.international_dialing_code || '');
  const navigation = useNavigation();

  const contactId = contact._id;
  console.log(contactId);

  const displayMessage = (msg: string) => {
    setMessage(msg);
    // Automatically clear the message after 5 seconds
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.replace('Contact')}
            style={styles.arrowButton}
          >
            <AntDesign name="arrowleft" size={24} color="#1B263B" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Update Contact Details</Text>
          </View>
          {message ? (
            <View
              style={[
                styles.messageBox,
                isSuccess ? styles.success : styles.error,
              ]}>
              <Text style={styles.messageText}>{message}</Text>
            </View>
          ) : null}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <AntDesign
              name="user"
              size={20}
              color="#1B263B"
              style={styles.icon}
            />
            <TextInput
              placeholder="First name"
              placeholderTextColor="#1B263BE5"
              style={styles.inputWithIcon}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputWrapper}>
            <View style={styles.emptyIcon} />
            <TextInput
              placeholder="Last name"
              placeholderTextColor="#1B263BE5"
              style={styles.inputWithIcon}
              value={lastName}
              onChangeText={setLastName}
            />
            </View>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputWrapperFlex}>
            <View style={[styles.inputWrapper, styles.specialInput]}>
              <AntDesign
                name="phone"
                size={20}
                color="#1B263B"
                style={styles.icon}
              />
              <View style={styles.inputInnerWrapper}>
                <TextInput
                  placeholder="+234"
                  placeholderTextColor="#1B263BE5"
                  style={styles.inputWithIcon}
                  value={idc}
                  onChangeText={setIdc}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Phone"
                placeholderTextColor="#1B263BE5"
                style={styles.inputWithIcon}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.formSubmitButton, loading && styles.disabledButton]}
        onPress={() =>
        updateContact(
            contactId,
            idc,
            phoneNumber,
            lastName,
            firstName,
            displayMessage,
            setIsSuccess,
            setLoading,
            navigation,
            )
            }
            disabled={loading}
        >
        {loading ? (
        <ActivityIndicator color="#fff" />
          ) : (
        <Text style={styles.buttonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea:{
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
    messageBox: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: '#c13515',
  },
  messageText: {
    color: '#fff',
  },
  arrowButton: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 80,
    marginTop: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#415A77',
    lineHeight: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
  },
  inputWrapperflex: {
    marginRight: 20,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    width: '100%',
    marginLeft: '10%',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 27,
    color: '#1B263B',
    marginTop: 20,
  },
  emptyIcon: {
    width: 30, // This should match the icon size for alignment
  },
  inputWithIcon: {
    flex: 1,
    height: 44,
    padding: 12,
    fontSize: 16,
    color: '#1B263B',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#1B263B',
    paddingBottom: 5,
    width: '100%',
  },
  specialInput: {
    marginRight: 20,
  },
  //   inputWrapperInner: {
  // marginRight: 20
  //   },
  inputWrapperFlex: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  inputInnerWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  formSubmitButton: {
    backgroundColor: '#415a77',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 25,
  },
  disabledButton: {
    opacity: 0.6, // Add blur effect by lowering opacity
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
});

export default UpdateContact;
