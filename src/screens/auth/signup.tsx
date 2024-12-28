import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import PhoneInput from '../../components/phoneInput';
import {handleSignup} from './auth';

const SignupScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [countryCode, setCountryCode] = useState('+234');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const navigation = useNavigation();

  const isPasswordStrong = passwords => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(passwords);
    const hasLowerCase = /[a-z]/.test(passwords);
    const hasNumbers = /\d/.test(passwords);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwords);

    return (
      passwords.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  const displayMessage = msg => {
    setMessage(msg);
    // Automatically clear the message after 5 seconds
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  return (
    <ScrollView>
      <View style={styles.signupContainer}>
        <View style={styles.formSection}>
          <View style={styles.formHeadText}>
            <Text style={styles.header}>Let’s Get Started</Text>
            <Text style={styles.subText}>Sign up to create an account.</Text>
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
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Peach Alda"
              value={username}
              placeholderTextColor="#1B263BE5"
              onChangeText={setUsername}
            />
          </View>

          {/* <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="peachalda@gmail.com"
              value={email}
              placeholderTextColor="#1B263BE5"
              onChangeText={setEmail}
            />
          </View> */}

          <PhoneInput
            label="Phone number"
            placeholder="7017215999"
            value={phoneNumber}
            countryCode={countryCode}
            onChangeText={setPhoneNumber}
            onCountryCodeChange={setCountryCode}
          />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="........"
                secureTextEntry={!showPassword}
                value={password}
                placeholderTextColor="#1B263BE5"
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}>
                <Icon
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#1B263B"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="........"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                placeholderTextColor="#1B263BE5"
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}>
                <Icon
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#1B263B"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomTextContainer}>

            
          <View style={styles.acctTextContainer}>
          <Text style={styles.acctText}>
            Already Signed Up?
            <TouchableOpacity>
              <Text
                style={styles.createAccountText}
                onPress={() => navigation.navigate('Login')}>
                {' '}
                Log in
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
            <TouchableOpacity>
              <Text style={styles.forgetPassword}>Forget password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.formSubmitButton, loading && styles.disabledButton]} // Add disabled style
            onPress={() =>
              handleSignup(
                countryCode,
                phoneNumber,
                username,
                password,
                confirmPassword,
                displayMessage,
                isPasswordStrong,
                setIsSuccess,
                setLoading,
                navigation,
              )
            }
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <ActivityIndicator color="#fff" /> // Show loader when loading
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.googleSignupWrapper}
            disabled={loading}>
            <View style={styles.innerContainer}>
              <Image
                source={require('../../assets/images/Google.png')}
                style={styles.logo}
              />
              <Text style={styles.googleText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.acctTextContainer}>
            <Text style={styles.acctText}>
              Already have an Account?
              <TouchableOpacity>
                <Text style={styles.createAccountText}> Log in</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  formSection: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
  },
  formHeadText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: '700',
    color: '#1b263b',
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#1b263b',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 27,
  },
  inputGroup: {
    marginBottom: 15,
  },

  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#1B263B',
  },

  eyeIcon: {
    position: 'absolute',
    right: 10,
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
    // textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
    color: '#1B263B',
  },
  input: {
    flex: 1,
    height: 44,
    padding: 12,
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
    color: '#1B263BE5',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  rememberText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#1b263b',
  },
  forgetPassword: {
    fontSize: 13,
    fontWeight: '400',
    color: '#778da9',
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#778da980',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  googleSignupWrapper: {
    borderColor: '#778da980',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 40,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleText: {
    fontSize: 15,
    color: '#1b263b',
  },
  acctTextContainer: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
  },
  acctText: {
    fontSize: 15,
    color: '#1B263B',
    alignItems: 'center',

  },
  disabledButton: {
    opacity: 0.6, // Add blur effect by lowering opacity
  },
  createAccountText: {
    color: '#778DA9',
    fontWeight: '700',
  },
});

export default SignupScreen;
