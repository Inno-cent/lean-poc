/* eslint-disable no-catch-shadow */
import { useState, useEffect } from 'react';
import { getToken } from '../auth/auth';
import {API_BASE_URL} from '@env';


// Define types for function parameters
type DisplayMessageFunction = (message: string) => void;
type SetSuccessFunction = (success: boolean) => void;
type SetLoadingFunction = (loading: boolean) => void;
type NavigationFunction = {
  navigate: (screen: string) => void;
};

export const fetchContacts = async () => {
    try {
        const token = await getToken();

        if (!token) {
        throw new Error('No token found');
        }

        const response = await fetch(`${API_BASE_URL}/v1/contact/`, {
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
        console.log('Contacts:', data);
        return data;
    } catch (error) {
        console.error('Failed to fetch contacts:', error);
        throw error;
    }
};

export const createContact = async (
  countryCode: string,
  phoneNumber: string,
  lastName: string,
  firstName: string,
  displayMessage: DisplayMessageFunction,
  setIsSuccess: SetSuccessFunction,
  setLoading: SetLoadingFunction,
  navigation: NavigationFunction,
  setRefreshContacts: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  if (!countryCode || !phoneNumber || !lastName || !firstName) {
    displayMessage('Please fill out all fields');
    return;
  }

  setLoading(true);
  try {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/v1/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        idc: countryCode,
        phone_number: phoneNumber,
      }),
    });

    const data = await response.json();
    // console.log(data);
    if (response.ok) {
      displayMessage('Contact Added successful!');
      setIsSuccess(true);
      navigation.navigate('Contact');
      setRefreshContacts(prev => !prev);
    } else {
      displayMessage(data.message || 'Contact adding failed.');
      setIsSuccess(false);
    }
  } catch (error) {
    console.error('Failed to create contact:', error);
    displayMessage('Network error. Please try again.');
    setIsSuccess(false);
  } finally {
    setLoading(false);
  }
};

export const updateContact = async (
  contactId: string,
  countryCode: string,
  phoneNumber: string,
  lastName: string,
  firstName: string,
  displayMessage: DisplayMessageFunction,
  setIsSuccess: SetSuccessFunction,
  setLoading: SetLoadingFunction,
  navigation: NavigationFunction,
  setRefreshContacts: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  if (!countryCode || !phoneNumber || !lastName || !firstName) {
    displayMessage('Please fill out all fields');
    return;
  }

  setLoading(true);
  try {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/v1/contact/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        idc: countryCode,
        phone_number: phoneNumber,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      displayMessage('Contact updated successful!');
      setIsSuccess(true);
      navigation.navigate('Contact');
      setRefreshContacts(prev => !prev);
    } else {
      displayMessage(data.message || 'Failed to update contact');
      setIsSuccess(false);
    }
  } catch (error) {
    console.error('Error updating contact:', error);
    displayMessage('An error occurred while updating the contact');
    setIsSuccess(false);
  } finally {
    setLoading(false);
  }
};

export const deleteContact = async (
  contactIdsToDelete: string[],
  displayMessage: DisplayMessageFunction,
  setIsSuccess: SetSuccessFunction,
  // setLoading: SetLoadingFunction,
  navigation: NavigationFunction,
  setRefreshContacts: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {

  // setLoading(true);
  try {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/v1/contact/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      body: JSON.stringify({
        ids: contactIdsToDelete,
      }),
    });

    const data = await response.json();
    // console.log("data", data);
    if (response.ok) {
      displayMessage('Contact deleted successful!');
      setIsSuccess(true);
      navigation.navigate('Contact');
      setRefreshContacts(prev => !prev);
    } else {
      displayMessage(data.message || 'Failed to delete contact');
      setIsSuccess(false);
    }
  } catch (error) {
    console.error('Error updating contact:', error);
    displayMessage('An error occurred while delecting the contact');
    setIsSuccess(false);
  } finally {
    // setLoading(false);
  }
};

export const useContacts = (refreshContacts: boolean) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const fetchedContacts = await fetchContacts();
        setContacts(fetchedContacts);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, [refreshContacts]);

  return { contacts, loading, error };
};

export default useContacts;
