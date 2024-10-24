import React, {createContext, useContext, useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useNavigation} from '@react-navigation/native';

const SOCKET_URL = 'http://10.0.2.2:8000/';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const [callerInfo, setCallerInfo] = useState(null);
  const [callDetails, setCallDetails] = useState(null); // Agora call details
  const [isInCall, setIsInCall] = useState(false);
  const navigation = useNavigation();

  const connectSocket = userId => {
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

      newSocket.on('call-received', callData => {
        console.log('Incoming call received:', callData);
        setCallerInfo(callData);
        navigation.navigate('IncomingCall', {callerInfo: callData});
      });

      newSocket.on('join-call', callData => {
        console.log('Joined call:', callData);
        setCallDetails(callData);  // Store call details
        setIsInCall(true);
        navigation.navigate('CallScreen', { callDetails: callData });
      });

      setSocket(newSocket);
      // return () => {
      //   newSocket.disconnect();
      //   console.log('Socket disconnected');
      // };
    }
  };

  const initiateCall = callInitiateData => {
    console.log('first innitiate log');
    if (socket) {
      console.log('second innitiate log');
      socket.emit('call-initiate', callInitiateData, (err, response) => {
        if (err) {
          console.error('Error during call initiation:', err);
        } else {
          console.log('Call initiated successfully:', response);
          navigation.navigate('OutgoingCall');
        }
      });
    } else {
      console.log('Socket is not connected');
    }
  };

  const acceptCall = roomId => {
    if (socket) {
      const message = {
        room_id: roomId,
        participant_id: socket.id,
      };
      socket.emit('call-accept', message, (err, response) => {
        if (err) {
          console.error('Error during call acceptance:', err);
        } else {
          console.log('Call accepted:', response);
        }
      });
    } else {
      console.log('Socket is not connected');
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      console.log('Socket disconnected');
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        initiateCall,
        acceptCall,
        callerInfo,
        callDetails,
        isInCall,
        disconnectSocket,
        connectSocket,
      }}>
      {children}
    </SocketContext.Provider>
  );
};
