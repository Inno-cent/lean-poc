// import * as Keychain from 'react-native-keychain';
// import {connectSocket} from '../../services/socketService';

// // Store the token securely using Keychain
// const storeToken = async (token) => {
//   try {
//     await Keychain.setGenericPassword('userToken', token);
//     console.log('Token stored securely');
//   } catch (error) {
//     console.error('Error storing the token:', error);
//   }
// };

// // Retrieve the token securely from Keychain
// const getToken = async () => {
//   try {
//     const credentials = await Keychain.getGenericPassword();
//     if (credentials) {
//       return credentials.password; // token is stored as password
//     } else {
//       throw new Error('No token found');
//     }
//   } catch (error) {
//     console.error('Error retrieving the token:', error);
//     return null;
//   }
// };

// export const handleSignup = async (
//   email,
//   password,
//   confirmPassword,
//   username,
//   displayMessage,
//   isPasswordStrong,
//   setIsSuccess,
//   setLoading,
//   navigation,
// ) => {
//   if (!email || !password || !confirmPassword || !username) {
//     displayMessage('Please fill out all fields');
//     return;
//   }

//   if (password !== confirmPassword) {
//     setIsSuccess(false);
//     displayMessage('Passwords do not match');
//     return;
//   }

//   if (!isPasswordStrong(password)) {
//     setIsSuccess(false);
//     displayMessage(
//       'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character',
//     );
//     return;
//   }

//   setLoading(true);
//   try {
//     const response = await fetch('http://3.86.186.237/v1/session/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         accept: 'application/json',
//       },
//       body: JSON.stringify({
//         username,
//         email,
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

// export const handleLogin = async (
//   username,
//   password,
//   displayMessage,
//   setIsSuccess,
//   setLoading,
//   navigation,
// ) => {
//   if (!username || !password) {
//     displayMessage('Please fill out both email and password');
//     return;
//   }

//   setLoading(true);
//   try {
//     const response = await fetch('http://3.86.186.237/v1/session', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         accept: 'application/json',
//       },
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       console.log(data);

//       const token = data.token; // Assuming token is returned in the response

//       if (!token) {
//         throw new Error('Token not found in response');
//       }

//       // Store token securely using Keychain
//       await storeToken(token);

//       displayMessage('Login successful!');
//       setIsSuccess(true);
//       navigation.navigate('Home');
//       console.log('logged in');
//     } else {
//       console.error(data);
//       displayMessage(data.message || 'Login failed.');
//       setIsSuccess(false);
//     }
//   } catch (error) {
//     console.error('Network Error:', error);
//     displayMessage('Network error. Please try again.');
//     setIsSuccess(false);
//   } finally {
//     setLoading(false);
//   }
// };

// // Function to get the logged-in user details
// export const getUser = async () => {
//   try {
//     // Retrieve the token securely from Keychain
//     const token = await getToken();

//     if (!token) {
//       throw new Error('No token found');
//     }

//     // Fetch user details from the backend
//     const response = await fetch('http://3.86.186.237/v1/session', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`, // Pass token in Authorization header
//       },
//     });

//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || 'Failed to fetch user details');
//     }

//     return data; // Return the user data
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return null; // Handle error and return null
//   }
// };

// // Google OAuth Signup Flow
// export const handleGoogleSignup = async (
//   redirectUrl,
//   displayMessage,
//   setIsSuccess,
//   setLoading,
//   navigation,
// ) => {
//   setLoading(true);
//   try {
//     const response = await fetch(
//       'http://3.86.186.237/v1/google/oauth/redirect',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           accept: 'application/json',
//         },
//         body: JSON.stringify({
//           redirect_url: 'http://localhost:8081/oauth/callback',
//         }),
//       },
//     );

//     const data = await response.json();
//     if (response.ok) {
//       window.location.href = data.url;
//     } else {
//       displayMessage(data.message || 'Failed to start Google OAuth process.');
//       setIsSuccess(false);
//     }
//   } catch (error) {
//     displayMessage('Network error. Please try again.');
//     setIsSuccess(false);
//   } finally {
//     setLoading(false);
//   }
// };

// // Handle the Google OAuth callback (called after Google OAuth redirects back)
// export const handleGoogleCallback = async (
//   oauthCode,
//   displayMessage,
//   setIsSuccess,
//   setLoading,
//   navigation,
// ) => {
//   setLoading(true);
//   try {
//     const response = await fetch('http://3.86.186.237/v1/google/oauth', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         accept: 'application/json',
//       },
//       body: JSON.stringify({
//         code: oauthCode,
//       }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       displayMessage('Google signup successful!');
//       setIsSuccess(true);
//       navigation.navigate('Home');
//     } else {
//       displayMessage(data.message || 'Google signup failed.');
//       setIsSuccess(false);
//     }
//   } catch (error) {
//     displayMessage('Network error. Please try again.');
//     setIsSuccess(false);
//   } finally {
//     setLoading(false);
//   }
// };

import * as Keychain from 'react-native-keychain';
import {useSocket} from '../context/socketContext';

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
const getToken = async (): Promise<string | null> => {
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
): Promise<void> => {
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
  console.log(countryCode, phoneNumber, username, password, confirmPassword);

  // if (password.trim() !== confirmPassword.trim()) {
  //   setIsSuccess(false);
  //   displayMessage('Passwords do not match');
  //   return;
  // }
  if (!isPasswordStrong(password)) {
    setIsSuccess(false);
    displayMessage(
      'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character',
    );
    return;
  }

  setLoading(true);
  try {
    const response = await fetch('http://3.86.186.237/v1/session/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        idc: countryCode,
        phone_number: phoneNumber,
        username,
        password,
        confirmPassword,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      displayMessage('Signup successful!');
      setIsSuccess(true);
      navigation.navigate('Login');
    } else {
      displayMessage(data.message || 'Signup failed.');
      setIsSuccess(false);
    }
  } catch (error) {
    displayMessage('Network error. Please try again.');
    setIsSuccess(false);
  } finally {
    setLoading(false);
  }
};

export const handleLogin = async (
  countryCode: string,
  phoneNumber: string,
  password: string,
  displayMessage: DisplayMessageFunction,
  setIsSuccess: SetSuccessFunction,
  setLoading: SetLoadingFunction,
  navigation: NavigationFunction,
  connectSocket: (userId: string) => void,
): Promise<void> => {
  if (!phoneNumber || !password) {
    displayMessage('Please fill out both email and password');
    return;
  }

  setLoading(true);
  try {
    const response = await fetch('http://3.86.186.237/v1/session', {
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
        console.log('loginconnect', userData);
        connectSocket(userData._id);
        displayMessage('Login successful!');
        setIsSuccess(true);
        navigation.navigate('Home');
        console.log('logged in');
      } else {
        displayMessage('Failed to fetch user details');
        setIsSuccess(false);
      }
    } else {
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
    console.log('getttuserr');

    // Retrieve the token securely from Keychain
    const token = await getToken();

    if (!token) {
      throw new Error('No token found');
    }

    // Fetch user details from the backend
    const response = await fetch('http://3.86.186.237/v1/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Pass token in Authorization header
      },
    });

    const data = await response.json();
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
export const handleGoogleOAuthRedirect = async (
  redirectUrl: string,
  displayMessage: (message: string) => void,
): Promise<void> => {
  try {
    const response = await fetch(
      `http://3.86.186.237/v1/google/oauth/redirect`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({redirect_url: redirectUrl}),
      },
    );

    const data = await response.json();
    if (response.ok) {
      const {url} = data;
      console.log('Redirect URL:', url);

      // Redirect to the returned URL
      window.open(url, '_blank');
    } else {
      console.error(data);
      displayMessage(data.message || 'Failed to initiate Google OAuth.');
    }
  } catch (error) {
    console.error('Error during Google OAuth Redirect:', error);
    displayMessage('Network error. Please try again.');
  }
};

// Function to handle Google OAuth
export const handleGoogleOAuth = async (
  request: {token: string},
  displayMessage: (message: string) => void,
  setLoading: (loading: boolean) => void,
  navigation: {navigate: (screen: string) => void},
): Promise<void> => {
  setLoading(true);
  try {
    const response = await fetch(`http://3.86.186.237/v1/google/oauth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (response.ok) {
      const {token} = data;

      // Store the session token securely
      await storeToken(token);

      displayMessage('Google OAuth successful!');
      navigation.navigate('Home'); // Navigate to the home screen
    } else {
      console.error(data);
      displayMessage(data.message || 'Failed to complete Google OAuth.');
    }
  } catch (error) {
    console.error('Error during Google OAuth:', error);
    displayMessage('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};
