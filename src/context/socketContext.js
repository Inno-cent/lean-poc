// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';

// Define the backend server URL
const SOCKET_URL = 'http://10.0.2.2:8000/'; // Replace with your actual backend URL

// Create the SocketContext
const SocketContext = createContext();

// Custom hook to use SocketContext
export const useSocket = () => useContext(SocketContext);

// SocketProvider component to wrap the app
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [callerInfo, setCallerInfo] = useState(null);
  const navigation = useNavigation();

  // Connect to socket when component mounts
  useEffect(() => {
    const userId = 'your_user_id'; // Replace with actual userId from login

    if (!socket) {
      const newSocket = io(SOCKET_URL);

      newSocket.on('connect', () => {
        console.log('Connected to Socket.IO server:', newSocket.id);
        newSocket.emit('join-room', userId);
        console.log(`Emitted 'join-room' for user ID: ${userId}`);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server:', newSocket.id);
      });

      // Handle incoming call
      newSocket.on('call-received', callData => {
        console.log('Incoming call received:', callData);
        setCallerInfo(callData); // Update the caller info state
        navigation.navigate('IncomingCall', { callerInfo: callData }); // Navigate to incoming call screen
      });

      setSocket(newSocket); // Set the socket instance in state

      return () => {
        newSocket.disconnect();
        console.log('Socket disconnected');
      };
    }
  }, [socket, navigation]);

  // Function to initiate a call
  const initiateCall = (callInitiateData) => {
    if (socket) {
      socket.emit('call-initiate', callInitiateData, (err, response) => {
        if (err) {
          console.error('Error during call initiation:', err);
        } else {
          console.log('Call initiated successfully:', response);
        }
      });
    } else {
      console.log('Socket is not connected');
    }
  };

  // Function to disconnect socket
  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null); // Reset the socket state
      console.log('Socket disconnected');
    }
  };

  return (
    <SocketContext.Provider value={{ socket, initiateCall, callerInfo, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
