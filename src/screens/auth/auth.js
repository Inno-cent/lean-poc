import AsyncStorage from '@react-native-async-storage/async-storage';
import {connectSocket} from '../../services/socketService';
export const handleSignup = async (
  email,
  password,
  confirmPassword,
  username,
  displayMessage,
  isPasswordStrong,
  setIsSuccess,
  setLoading,
  navigation,
) => {
  if (!email || !password || !confirmPassword || !username) {
    displayMessage('Please fill out all fields');
    return;
  }

  if (password !== confirmPassword) {
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
  username,
  password,
  displayMessage,
  setIsSuccess,
  setLoading,
  navigation,
) => {
  if (!username || !password) {
    displayMessage('Please fill out both email and password');
    return;
  }

  setLoading(true);
  try {
    const response = await fetch('http://10.0.2.2:8000/v1/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);

      // Assuming the response contains a token and user data
      // const userId = data._id;
      const token = data.token; // Assuming token is returned in the response

      if (!token) {
        throw new Error('User ID or token not found in response');
      }
      // Store token in AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      displayMessage('Login successful!');
      setIsSuccess(true);
      navigation.navigate('Home');
      // connectSocket(userId);
      console.log('logged in');
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
export const getUser = async () => {
  try {
    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('userToken');

    if (!token) {
      throw new Error('No token found');
    }

    // Fetch user details from the backend
    const response = await fetch('http://10.0.2.2:8000/v1/session', {
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
// Google OAuth Signup Flow
export const handleGoogleSignup = async (
  redirectUrl,
  displayMessage,
  setIsSuccess,
  setLoading,
  navigation,
) => {
  setLoading(true);
  try {
    // Step 1: Get Google OAuth redirect URL
    const response = await fetch(
      'http://10.0.2.2:8000/v1/google/oauth/redirect',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          redirect_url: 'http://localhost:8081/oauth/callback', // Pass the frontend redirect URL
        }),
      },
    );

    const data = await response.json();
    if (response.ok) {
      // Redirect the user to Google OAuth consent page
      window.location.href = data.url;
    } else {
      displayMessage(data.message || 'Failed to start Google OAuth process.');
      setIsSuccess(false);
    }
  } catch (error) {
    displayMessage('Network error. Please try again.');
    setIsSuccess(false);
  } finally {
    setLoading(false);
  }
};

// Handle the Google OAuth callback (called after Google OAuth redirects back)
export const handleGoogleCallback = async (
  oauthCode,
  displayMessage,
  setIsSuccess,
  setLoading,
  navigation,
) => {
  setLoading(true);
  try {
    // Step 2: Exchange the OAuth code for a session
    const response = await fetch('http://10.0.2.2:8000/v1/google/oauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        code: oauthCode, // Pass the authorization code returned by Google
      }),
    });

    const data = await response.json();
    if (response.ok) {
      displayMessage('Google signup successful!');
      setIsSuccess(true);
      // Navigate to the home screen or any other protected route
      navigation.navigate('Home');
    } else {
      displayMessage(data.message || 'Google signup failed.');
      setIsSuccess(false);
    }
  } catch (error) {
    displayMessage('Network error. Please try again.');
    setIsSuccess(false);
  } finally {
    setLoading(false);
  }
};

/////// timeout auth

//   const TIMEOUT = 45000; // 45 seconds timeout

// // Helper function for timeout
// const timeoutPromise = (timeoutDuration) => {
//   return new Promise((_, reject) => {
//     setTimeout(() => {
//       reject(new Error('Network timeout. Please try again.'));
//     }, timeoutDuration);
//   });
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
//   navigation
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
//     const response = await Promise.race([
//       fetch('http://10.0.2.2:8000/v1/session/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           accept: 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//           confirmPassword,
//         }),
//       }),
//       timeoutPromise(TIMEOUT),
//     ]);

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
//     displayMessage(error.message || 'Network error. Please try again.');
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
//   navigation
// ) => {
//   if (!username || !password) {
//     displayMessage('Please fill out both email and password');
//     return;
//   }

//   setLoading(true);
//   try {
//     const response = await Promise.race([
//       fetch('http://10.0.2.2:8000/v1/session', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           accept: 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           password,
//         }),
//       }),
//       timeoutPromise(TIMEOUT),
//     ]);

//     const data = await response.json();
//     if (response.ok) {
//       displayMessage('Login successful!');
//       setIsSuccess(true);
//       navigation.navigate('Home');
//       connectSocket();
//     } else {
//       displayMessage(data.message || 'Login failed.');
//       setIsSuccess(false);
//     }
//   } catch (error) {
//     displayMessage(error.message || 'Network error. Please try again.');
//     setIsSuccess(false);
//   } finally {
//     setLoading(false);
//   }
// };
