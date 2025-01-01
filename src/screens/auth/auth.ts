import * as Keychain from 'react-native-keychain';
import {API_BASE_URL} from '@env';
import {useSocket} from '../context/socketContext';
import { useUser } from '../../context/userContext';

// Store the token securely using Keychain
const storeToken = async (token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword('userToken', token);
    console.log('Token stored securely');
  } catch (error) {
    console.error('Error storing the token:', error);
  }
};

// Retrieve the token securely from Keychain
export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    } else {
      throw new Error('No token found');
    }
  } catch (error) {
    console.error('Error retrieving the token:', error);
    return null;
  }
};

// Remove the token securely from Keychain during logout
export const removeToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Token removed securely');
  } catch (error) {
    console.error('Error removing the token:', error);
  }
};

// Example logout function
export const logout = async (navigation: NavigationFunction): Promise<void> => {
  try {
    await removeToken();
    navigation.navigate('Login');
    // Perform any additional logout logic here, such as navigating to the login screen
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

// Define types for function parameters
type DisplayMessageFunction = (message: string) => void;
type SetSuccessFunction = (success: boolean) => void;
type SetLoadingFunction = (loading: boolean) => void;
type NavigationFunction = {
  navigate: (screen: string) => void;
};
export const handleSignup = async (
  countryCode: string,
  phoneNumber: string,
  username: string,
  password: string,
  confirmPassword: string,
  displayMessage: DisplayMessageFunction,
  isPasswordStrong: (password: string) => boolean,
  setIsSuccess: SetSuccessFunction,
  setLoading: SetLoadingFunction,
  navigation: NavigationFunction,
) => {
  if (
    !countryCode ||
    !phoneNumber ||
    !username ||
    !password ||
    !confirmPassword
  ) {
    displayMessage('Please fill out all fields');
    return;
  }

  console.log('Before validation:', {
    countryCode,
    phoneNumber,
    username,
    password,
    confirmPassword,
  });

  if (password.trim() !== confirmPassword.trim()) {
    setIsSuccess(false);
    displayMessage('Passwords do not match');
    return;
  }

  if (!isPasswordStrong(password)) {
    setIsSuccess(false);
    displayMessage(
      'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character',
    );
    return;
  }

  setLoading(true);

  try {
    const payload = {
      idc: countryCode,
      phone_number: phoneNumber,
      username: username, // Explicitly map the `username`
      password: password.trim(), // Always trim before sending
      confirmPassword: confirmPassword.trim(),
    };
    console.log('Payload before POST:', payload);

    const response = await fetch(`http://54.173.73.46/v1/session/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('Response:', data);

    if (response.ok) {
      displayMessage('Signup successful!');
      setIsSuccess(true);
      navigation.navigate('Login');
    } else {
      displayMessage(data.message || 'Signup failed.');
      setIsSuccess(false);
    }
  } catch (error) {
    console.error('Error:', error);
    displayMessage('Network error. Please try again.');
    setIsSuccess(false);
  } finally {
    setLoading(false);
  }
};


//   if (!isPasswordStrong(password)) {
//     setIsSuccess(false);
//     displayMessage(
//       'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character',
//     );
//     return;
//   }

//   setLoading(true);
//   try {
//     const response = await fetch(`${API_BASE_URL}/v1/session/signup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         accept: 'application/json',
//       },
//       body: JSON.stringify({
//         idc: countryCode,
//         phone_number: phoneNumber,
//         username,
//         password,
//         confirmPassword,
//       }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       displayMessage('Signup successful!');
//       setIsSuccess(true);
//       navigation.navigate('Login');
//     } else {
//       displayMessage(data.message || 'Signup failed.');
//       setIsSuccess(false);
//     }
//   } catch (error) {
//     displayMessage('Network error. Please try again.');
//     setIsSuccess(false);
//   } finally {
//     setLoading(false);
//   }
// };

export const handleLogin = async (
  countryCode: string,
  phoneNumber: string,
  password: string,
  displayMessage: DisplayMessageFunction,
  setIsSuccess: SetSuccessFunction,
  setLoading: SetLoadingFunction,
  navigation: NavigationFunction,
  connectSocket: (userId: string) => void,
  setUser: (user: any) => void,
): Promise<void> => {

  
  if (!countryCode || !phoneNumber || !password) {
    displayMessage('Please fill out both Phone number and password');
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(`http://54.173.73.46/v1/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        idc: countryCode, // Pass the country code
        phone_number: phoneNumber,
        password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      const token = data.token; // Assuming token is returned in the response

      if (!token) {
        throw new Error('Token not found in response');
      }

      // Store token securely using Keychain
      await storeToken(token);
      // Fetch user details after successful login
      const userData = await getUser();

      if (userData && userData._id) {
        const userId = `${userData.international_dialing_code}${userData.phone_number}`;
        connectSocket(userId);
        setUser({
          id: userData._id,
          name: userData.username,
          email: userData.email,
          phoneNumber: userData.phone_number,
          countryCode: userData.international_dialing_code,
        });


        console.log('loginconnect', userData);
        // connectSocket(userId);
        displayMessage('Login successful!');
        setIsSuccess(true);
        navigation.navigate('Home');
        console.log('logged in');
      } else {
        displayMessage('Failed to fetch user details');
        setIsSuccess(false);
      }
    } else {
      console.log('logged in failed');
      console.error(data);
      displayMessage(data.message || 'Login failed.');
      setIsSuccess(false);
    }
  } catch (error) {
    console.error('Network Error:', error);
    displayMessage('Network error. Please try again.');
    setIsSuccess(false);
  } finally {
    setLoading(false);
  }
};

// Function to get the logged-in user details
export const getUser = async (): Promise<any | null> => {
  try {
    // Retrieve the token securely from Keychain
    const token = await getToken();

    if (!token) {
      throw new Error('No token found');
    }

    // Fetch user details from the backend
    const response = await fetch(`http://54.173.73.46/v1/session`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Pass token in Authorization header
      },
    });

    const data = await response.json();
    console.log('User on Login:', data);
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user details');
    }

    return data; // Return the user data
  } catch (error) {
    console.error('Error fetching user:', error);
    return null; // Handle error and return null
  }
};

// Function to initiate Google OAuth redirect
// export const handleGoogleOAuthRedirect = async (
//   redirectUrl: string,
//   displayMessage: (message: string) => void,
// ): Promise<void> => {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/v1/google/oauth/redirect`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           accept: 'application/json',
//         },
//         body: JSON.stringify({redirect_url: redirectUrl}),
//       },
//     );

//     const data = await response.json();
//     if (response.ok) {
//       const {url} = data;
//       console.log('Redirect URL:', url);

//       // Redirect to the returned URL
//       window.open(url, '_blank');
//     } else {
//       console.error(data);
//       displayMessage(data.message || 'Failed to initiate Google OAuth.');
//     }
//   } catch (error) {
//     console.error('Error during Google OAuth Redirect:', error);
//     displayMessage('Network error. Please try again.');
//   }
// };

// // Function to handle Google OAuth
// export const handleGoogleOAuth = async (
//   request: {token: string},
//   displayMessage: (message: string) => void,
//   setLoading: (loading: boolean) => void,
//   navigation: {navigate: (screen: string) => void},
// ): Promise<void> => {
//   setLoading(true);
//   try {
//     const response = await fetch(`${API_BASE_URL}/v1/google/oauth`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         accept: 'application/json',
//       },
//       body: JSON.stringify(request),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       const {token} = data;

//       // Store the session token securely
//       await storeToken(token);

//       displayMessage('Google OAuth successful!');
//       navigation.navigate('Home'); // Navigate to the home screen
//     } else {
//       console.error(data);
//       displayMessage(data.message || 'Failed to complete Google OAuth.');
//     }
//   } catch (error) {
//     console.error('Error during Google OAuth:', error);
//     displayMessage('Network error. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };
