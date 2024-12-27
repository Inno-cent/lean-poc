/* eslint-disable no-catch-shadow */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../auth/auth';
import {API_BASE_URL} from '@env';


// Define types for function parameters
type DisplayMessageFunction = (message: string) => void;
type SetSuccessFunction = (success: boolean) => void;
type SetLoadingFunction = (loading: boolean) => void;
type NavigationFunction = {
  navigate: (screen: string) => void;
};

export const getProfile = async () => {
    try {
        const token = await getToken();

        if (!token) {
        throw new Error('No token found');
        }

        const response = await fetch(`${API_BASE_URL}/v1/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Pass token in Authorization header
            },
            });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        await AsyncStorage.setItem('userProfile', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Failed to get user:', error);
        throw error;
    }
};

export const updateProfile = async (
//   countryCode: string,
//   phoneNumber: string,
  fullName: string,
//   userName: string,
  email: string,
  birthday: string,
  gender: string,
  displayMessage: DisplayMessageFunction,
  setIsSuccess: SetSuccessFunction,
  setLoading: SetLoadingFunction,
  navigation: NavigationFunction,
): Promise<void> => {
  if (!fullName || !email || !birthday || !gender) {
    displayMessage('Please fill out all fields');
    return;
  }

  setLoading(true);
  try {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/v1/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      body: JSON.stringify({
        full_name: fullName,
        email: email,
        dob: birthday,
        gender: gender,
      }),
    });

    const data = await response.json();
    console.log('Updated profile', data);
    if (response.ok) {
      displayMessage('Profile updated successful!');
      setIsSuccess(true);
      navigation.navigate('Profile');
    } else {
      displayMessage(data.message || 'Failed to update profile');
      setIsSuccess(false);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    displayMessage('An error occurred while updating the profile');
    setIsSuccess(false);
  } finally {
    setLoading(false);
  }
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
  displayMessage: DisplayMessageFunction,
  setIsSuccess: SetSuccessFunction,
  setLoading: SetLoadingFunction,
  navigation: NavigationFunction,
): Promise<void> => {
  if (!oldPassword || !newPassword || !confirmPassword) {
    displayMessage('Please fill out all fields');
    return;
  }

  setLoading(true);
  try {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/v1/user/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      body: JSON.stringify({
        old_password: oldPassword,
        password: newPassword,
        confirm_password: confirmPassword,
      }),
    });

    const data = await response.json();
    console.log('Updated password', data);
    if (response.ok) {
      displayMessage('Password updated successful!');
      setIsSuccess(true);
      navigation.navigate('Profile');
    } else {
      displayMessage(data.message || 'Failed to update password');
      setIsSuccess(false);
    }
  } catch (error) {
    console.error('Error updating password:', error);
    displayMessage('An error occurred while updating the password');
    setIsSuccess(false);
  } finally {
    setLoading(false);
  }
};

// export const handlelogout = async () => {
//   try {
//     await AsyncStorage.removeItem('token');
//     await AsyncStorage.removeItem('userProfile');
//     navigation.navigate('Login');
//   } catch (error) {
//     console.error('Error logging out:', error);
//   }
// }