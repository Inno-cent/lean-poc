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

      newSocket.on('call-accept', message => {
        console.log('Call accepted:', message);

        const agoraCallDetails = {
          room_id: message.room_id,
          participant_id: message.participant_id,
          app_id: message.app_id,
          token: message.token,
          uid: message.uid,
        };

        setCallDetails(agoraCallDetails);
        setIsInCall(true);

        // Navigate to CallScreen once the call is accepted
        navigation.navigate('CallScreen');
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
        callerInfo,
        disconnectSocket,
        connectSocket,
        callDetails, 
        isInCall,
      }}>
      {children}
    </SocketContext.Provider>
  );
};
