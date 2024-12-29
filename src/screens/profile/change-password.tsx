import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native';
import { updatePassword } from './api';

const EditProfile = ({}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };
  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

    const displayMessage = (msg: string) => {
    setMessage(msg);
    // Automatically clear the message after 5 seconds
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

    const handleSubmit = async () => {
      updatePassword(
        oldPassword,
        newPassword,
        confirmPassword,
        displayMessage,
        setIsSuccess,
        setLoading,
        navigation,
      );
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.arrowButton}>
              <AntDesign name="arrowleft" size={24} color="#1B263B" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Change password</Text>
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

          <Text style={styles.label}>Enter Old Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Enter your password"
              secureTextEntry={!oldPasswordVisible}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={toggleOldPasswordVisibility}>
              <FontAwesome
                name={oldPasswordVisible ? 'eye' : 'eye-slash'}
                size={20}
                color="#778DA9"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Enter your password"
              secureTextEntry={!newPasswordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={toggleNewPasswordVisibility}>
              <FontAwesome
                name={newPasswordVisible ? 'eye' : 'eye-slash'}
                size={20}
                color="#778DA9"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Enter your password"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={toggleConfirmPasswordVisibility}>
              <FontAwesome
                name={confirmPasswordVisible ? 'eye' : 'eye-slash'}
                size={20}
                color="#778DA9"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.formSubmitButton}
            onPress={handleSubmit}
          >
              {loading ? (
                <ActivityIndicator color="#fff" />
                  ) : (
                  <Text style={styles.buttonText}>Change Password</Text>
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
  label: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
    color: '#1B263B',
  },
  inputWithIcon: {
    height: 44,
    padding: 12,
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 50,
    color: '#1B263B',
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
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 14, // Adjust to vertically center the icon inside the input
  },

  formSubmitButton: {
    backgroundColor: '#415a77',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
});

export default EditProfile;
