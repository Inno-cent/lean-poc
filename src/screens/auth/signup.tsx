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

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigation = useNavigation();

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

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !username) {
      setMessage('Please fill out all fields');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (!isPasswordStrong(password)) {
      setIsSuccess(false);
      setMessage(
        'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character',
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:8000/v1/session/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Signup successful!');
        setIsSuccess(true);
        // Navigate to another screen, etc.
      } else {
        console.error('Network Error:', data.error);
        setMessage(data.error || 'Signup failed.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Network Error:', error);
      setMessage('Network error. Please try again.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="peachalda@gmail.com"
              value={email}
              placeholderTextColor="#1B263BE5"
              onChangeText={setEmail}
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="........"
              secureTextEntry
              value={confirmPassword}
              placeholderTextColor="#1B263BE5"
              onChangeText={setConfirmPassword}
            />
          </View>

          <View style={styles.bottomTextContainer}>
            <TouchableOpacity>
              <Text style={styles.rememberText}>Already have an Account?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgetPassword}>Forget password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.formSubmitButton, loading && styles.disabledButton]} // Add disabled style
            onPress={handleSignup}
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <ActivityIndicator color="#fff" /> // Show loader when loading
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
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
    alignItems: 'center',
  },
  acctText: {
    fontSize: 15,
    color: '#1B263B',
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
