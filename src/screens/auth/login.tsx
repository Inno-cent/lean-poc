import React, {useState} from 'react';
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
import {handleLogin} from './auth';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState('');

  const navigation = useNavigation();

  const displayMessage = msg => {
    setMessage(msg);
    // Automatically clear the message after 5 seconds
    setTimeout(() => {
      setMessage('');
    }, 5000);
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

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="PeachAlda@gmail.com"
            value={username}
            placeholderTextColor="#1B263BE5"
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="........"
            secureTextEntry
            value={password}
            placeholderTextColor="#1B263BE5"
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.bottomTextContainer}>
          <View style={styles.rememberTextInner}>
            <TouchableOpacity style={styles.checkboxWrapper}>
              {/* Checkbox would go here */}
            </TouchableOpacity>
            <Text style={styles.rememberText}>Remember me for 30 days</Text>
          </View>
          <TouchableOpacity  onPress={() => navigation.navigate("ForgetPassword")}>
            <Text style={styles.forgetPassword}>Forget password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.formSubmitButton}
          onPress={() =>
            handleLogin(
              username,
              password,
              displayMessage,
              setIsSuccess,
              setLoading,
              navigation,
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
          <View style={styles.dividerLine}></View>
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine}></View>
        </View>
        <TouchableOpacity style={styles.googleSignupWrapper}>
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
            Don’t have an Account?
            <TouchableOpacity>
              <Text
                style={styles.createAccountText}
                onPress={() => navigation.navigate('SignUp')}>
                {' '}
                Create an account
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
        <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Home')}>
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
    height: 44,
    padding: 12,
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
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
    alignItems: 'center',
  },
  acctText: {
    fontSize: 15,
    color: '#1B263B',
  },
  createAccountText: {
    color: '#778DA9',
    fontWeight: '700',
  },
});

export default LoginScreen;
