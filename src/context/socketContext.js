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
        setCallDetails(callData); // Store call details
        setIsInCall(true);
        navigation.navigate('CallScreen', {callDetails: callData});
      });

      newSocket.on('call-reject', message => {
        console.log(
          'Call was rejected by a participant:',
          message.participant_id,
        );
        if (message.participant_id === socket.id) {
          setIsInCall(false);
          navigation.navigate('Home');
        }
      });

      newSocket.on('call-exit', message => {
        console.log('Participant exited the call:', message.participant_id);
        if (message.participant_id === socket.id) {
          setIsInCall(false);
          navigation.navigate('Home');
        }
      });

      newSocket.on('call-joined', message => {
        console.log('Participant joined the call:', message.participant_id);
      });

      setSocket(newSocket);
      // return () => {
      //   newSocket.disconnect();
      //   console.log('Socket disconnected');
      // };
    }
  };

  const initiateCall = callInitiateData => {
    try {
      console.log('first innitiate log');
      if (socket) {
        console.log('second innitiate log');
        socket.emit('call-initiate', callInitiateData, response => {
          console.log(callInitiateData);

          // if (err) {
          //   console.error('Error during call initiation:', err);
          // } else {
          //   console.log('Call initiated successfully:', response);
          navigation.navigate('OutgoingCall');
          // }
          // console.log('error:', err, 'response :', response);
        });
      } else {
        console.log('Socket is not connected');
      }
    } catch (err) {
      console.log('call initiate error', err);
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

  const rejectCall = roomId => {
    if (socket) {
      const message = {
        room_id: roomId,
        participant_id: socket.id,
      };
      socket.emit('call-reject', message, (err, response) => {
        if (err) {
          console.error('Error during call rejection:', err);
        } else {
          console.log('Call rejected:', response);
          setIsInCall(false);
          navigation.navigate('Home'); // Navigate to home after rejecting the call
        }
      });
    } else {
      console.log('Socket is not connected');
    }
  };

  const endCall = () => {
    if (socket && callDetails) {
      const {room_id, participant_id} = callDetails;
      const message = {room_id, participant_id};

      socket.emit('call-exit', message, (err, response) => {
        if (err) {
          console.error('Error ending the call:', err);
        } else {
          console.log('Call ended:', response);
        }
      });

      setIsInCall(false);
      setCallDetails(null);
      navigation.navigate('Home');
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
        rejectCall,
        endCall,
      }}>
      {children}
    </SocketContext.Provider>
  );
};
