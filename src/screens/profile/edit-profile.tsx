/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import { updateProfile } from './api';

interface User {
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  gender: string;
}


const EditProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const displayMessage = (msg: string) => {
    setMessage(msg);
    // Automatically clear the message after 5 seconds
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

    useEffect(() => {
      // Call getUser on component mount to fetch user details
      const fetchUser = async () => {
        try {
          const userData = await AsyncStorage.getItem('userProfile');
          console.log('userData From Storage', userData);
          if (userData) {
          const user = JSON.parse(userData);
          setUser(user);
          setFullName(user.full_name);
          setUsername(user.username);
          setEmail(user.email);
          setPhoneNumber(user.phone_number);
          setGender(user.gender);
          // setBirthday(new Date(user.birthday));
        }
        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }, []);

  const handleSubmit = async () => {
    updateProfile(
      fullName,
      email,
      birthday.toISOString(),
      gender,
      displayMessage,
      setIsSuccess,
      setLoading,
      navigation,
    );
  };

  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorMessage) {
      console.log('ImagePicker Error: ', result.errorMessage);
    } else {
      // const { uri } = result.assets[0];
      // Upload the image to your storage service and get the bucket_key, bucket_name, and url
      // const uploadResult = await uploadImageToStorage(uri);
      // if (uploadResult) {
      //   const { bucket_key, bucket_name, url } = uploadResult;
      // Update the profile picture in your API
      // await updateProfilePicture({ bucket_key, bucket_name, url });
      Alert.alert('Profile picture updated successfully');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>

    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.arrowButton}
          >
            <AntDesign name="arrowleft" size={24} color="#1B263B" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Edit Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profilePictureContainer}>
            <Image
              source={require('../../assets/images/profilepic.png')}
              style={styles.profilePicture}
            />
            <TouchableOpacity style={styles.cameraIcon} onPress={handleImagePicker}>
              <FontAwesome name="camera" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
                {user && user.username ? (
                  <View>
                <Text style={styles.nameText}>{ user?.full_name || '...'}</Text>
                    <Text style={styles.usernameText}>@{user.username}</Text>
                  </View>
                  ) : (
                    <Text style={styles.usernameText}>...</Text>
                  )}
        </View>

        <View style={styles.separator} />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder={user?.full_name || 'Enter your full name'}
            placeholderTextColor="grey"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder={user?.username || 'Enter your username'}
            placeholderTextColor="grey"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder={user?.email || 'Enter your email address'}
            placeholderTextColor="grey"
            value={user?.email || email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder={user?.phone_number || 'Enter your phone number'}
            placeholderTextColor="grey"
            value={user?.phone_number}
            onChangeText={setPhoneNumber}
            editable={false}
          />

          {/* <View style={styles.flexContainer}>
            <View style={styles.flexItem}>
              <Text style={styles.label}>Birthday</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/DD/YYYY"
                value={birthday.toLocaleDateString()}
                onChangeText={(text) => setBirthday(new Date(text))}
              />
            </View>
            <View style={styles.flexItem}>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={styles.input}
                placeholder="Select Gender"
                value={gender}
                onChangeText={setGender}
              />
            </View>
          </View> */}

          <View style={styles.flexContainer}>
            <View style={styles.flexItem}>
              <Text style={styles.label}>Birthday</Text>
              <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  value={birthday.toDateString()}
                  editable={false}
                  placeholder="MM/DD/YYYY"
                />
              </TouchableOpacity>
              <DatePicker
                modal
                mode="date"
                open={openDatePicker}
                date={birthday}
                onConfirm={(date) => {
                  setOpenDatePicker(false);
                  setBirthday(date);
                }}
                onCancel={() => {
                  setOpenDatePicker(false);
                }}
              />
            </View>
            <View style={styles.flexItem}>
              <Text style={styles.label}>Gender</Text>
              <RNPickerSelect
                onValueChange={(value) => setGender(value)}
                items={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  { label: 'Other', value: 'other' },
                ]}
                style={pickerSelectStyles}
                placeholder={{
                  label: 'Select Gender',
                  value: null,
                }}
                value={user?.gender || gender}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.formSubmitButton}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  arrowButton: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#415A77',
    lineHeight: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePictureContainer: {
    position: 'relative',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    padding: 5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#1B263B',
  },
  usernameText: {
    fontSize: 16,
    color: '#778DA9',
    textAlign: 'center',
  },
  separator: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 5,
    lineHeight: 27,
    color: '#1B263B',
  },
  input: {
    height: 44,
    padding: 12,
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    color: '#1B263B',
    borderRadius: 4,
    marginBottom: 20,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexItem: {
    flex: 1,
    marginRight: 10,
  },
  formSubmitButton: {
    backgroundColor: '#415a77',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 8,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default EditProfile;