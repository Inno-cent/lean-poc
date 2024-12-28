import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {handleLogin, handleGoogleOAuth} from './auth';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSocket} from '../../context/socketContext';
import PhoneInput from '../../components/phoneInput';

const LoginScreen = () => {
  const [countryCode, setCountryCode] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {connectSocket} = useSocket();

  const navigation = useNavigation();

  const displayMessage = msg => {
    setMessage(msg);
    // Automatically clear the message after 5 seconds
    setTimeout(() => {
      setMessage('');
    }, 6000);
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.formSection}>
        <View style={styles.formHeadText}>
          <Text style={styles.header}>Welcome Back!</Text>
          <Text style={styles.subText}>Login to your account.</Text>
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
        <PhoneInput
          label="Phone number"
          placeholder="7017215999"
          value={phoneNumber}
          countryCode={countryCode}
          onChangeText={setPhoneNumber}
          onCountryCodeChange={setCountryCode}
        />

        {/* <View style={styles.phoneWrapper}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.specialInput}>
              <View style={styles.inputWrapper1}>
                <TextInput
                  placeholder="+234"
                  placeholderTextColor="#1B263BE5"
                  style={styles.input}
                  value={idc}
                  onChangeText={setIdc}
                />
              </View>

              <View style={styles.inputWrapper2}>
              <TextInput
                placeholder="Phone"
                placeholderTextColor="#1B263BE5"
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              </View>
            </View>
          </View> */}
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
        <View style={styles.bottomTextContainer}>
          <View style={styles.rememberTextInner}>
            <TouchableOpacity style={styles.checkboxWrapper}>
              {/* Checkbox would go here */}
            </TouchableOpacity>
            <Text style={styles.rememberText}>Remember me for 30 days</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.forgetPassword}>Forget password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.formSubmitButton}
          onPress={() =>
            handleLogin(
              countryCode,
              phoneNumber,
              password,
              displayMessage,
              setIsSuccess,
              setLoading,
              navigation,
              connectSocket,
            )
          }
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" /> // Show loader when loading
          ) : (
            <Text style={styles.buttonText}>Log in</Text>
          )}
        </TouchableOpacity>
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>
        <TouchableOpacity
          style={styles.googleSignupWrapper}
          onPress={() =>
            handleGoogleOAuth(displayMessage, setLoading, navigation)
          }>
          <View style={styles.innerContainer}>
            <Image
              source={require('../../assets/images/Google.png')}
              style={styles.logo}
            />
            <Text style={styles.googleText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.acctTextContainer}>
          <Text style={styles.acctText}> Don’t have an Account?</Text>
          <TouchableOpacity>
            <Text
              style={styles.logInText}
              onPress={() => navigation.navigate('SignUp')}>
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('CallScreen')}>
          <Text style={styles.nextButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
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
  subText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#1b263b',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 27,
  },
  phoneWrapper: {
    width: '100%',
  },
  inputInnerWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  inputWrapper1: {
    width: '25%',
    marginBottom: 20,
  },
  inputWrapper2: {
    width: '75%',
    marginBottom: 20,
  },
  specialInput: {
    width: '100%',
    flexDirection: 'row',
    gap: '5%',
  },
  inputGroup: {
    marginBottom: 15,
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
  rememberTextInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxWrapper: {
    marginRight: 10,
  },
  phoneInputWrapper: {
    height: 44,
    // padding: 12,
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
    color: '#1B263BE5',
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 1,
  },
  countryCodeDropdown: {
    flex: 0.4,

    // height: 40,
  },
  phoneInput: {
    flex: 0.6,
    fontSize: 14,
    color: '#1B263BE5',
    borderLeftWidth: 0.5,
    borderRightColor: '#ccc',
    // height: 40,
    // paddingHorizontal: 10,
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
  disabledButton: {
    opacity: 0.6, // Add blur effect by lowering opacity
  },
  googleText: {
    fontSize: 15,
    color: '#1b263b',
  },
  acctTextContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', 
  },
  acctText: {
    fontSize: 15,
    color: '#1B263B',
    textAlign: 'center',
  },
  logInText: {
    fontSize: 15,
    color: '#778DA9',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  createAccountText: {
    color: '#778DA9',
    fontWeight: '700',
  },
});

export default LoginScreen;
