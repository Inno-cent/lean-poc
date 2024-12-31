import React, {createContext, useContext, useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useNavigation} from '@react-navigation/native';
import {API_BASE_URL} from '@env';

const SOCKET_URL = 'http://54.173.73.46/';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const [callerInfo, setCallerInfo] = useState(null);
  const [callDetails, setCallDetails] = useState(null);
  const [isInCall, setIsInCall] = useState(false);
  const [callStatus, setCallStatus] = useState('Connecting...');
  const navigation = useNavigation();

  // Helper function to navigate to CallScreen only if not already in a call
  const navigateToCallScreen = callData => {
    // if (!isInCall) {
    setCallDetails(callData);
    setIsInCall(true);
    navigation.navigate('CallScreen', {callDetails: callData});
    // }
  };

  const connectSocket = userId => {
    console.log('main connectSocket function with userId :', userId);
    if (!socket) {
      const newSocket = io(SOCKET_URL);

      // newSocket.on('connect', () => {
      //   console.log('Connected to Socket.IO server:', newSocket.id);
      //   newSocket.emit('join-room', userId);
      // });

      newSocket.on('connect', () => {
        console.log('Connected to Socket.IO server:', newSocket.id);

        if (userId) {
          // Emit the join-room event if userId is valid
          console.log(`Emitting 'join-room' event with userId: ${userId}`);
          newSocket.emit('join-room', userId);
        } else {
          // Log a message if userId is not valid
          console.log(
            'Error: userId is missing or invalid. Cannot emit join-room event.',
          );
        }
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server:', newSocket.id);
      });

      // Navigate to IncomingCall screen when a call is received
      newSocket.on('call-received', (callData, callback) => {
        console.log('Incoming call received:', callData);
        setCallStatus('Ringing...');
        setCallerInfo(callData);
        navigation.navigate('IncomingCall', {callerInfo: callData});
        callback({status: true, message: 'Call Received'});
      });

      // Listen for 'join-call' event and navigate to CallScreen if not already in a call
      newSocket.on('join-call', callData => {
        console.log('Received call join details:', callData);
        navigateToCallScreen(callData);
      });

      // Handle call rejection
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

      // Handle participant exiting the call
      newSocket.on('call-exit', message => {
        console.log('Participant exited the call:', message.participant_id);
        if (message.participant_id === socket.id) {
          setIsInCall(false);
          navigation.navigate('Home');
        }
      });

      // Notify when a participant joins the call
      newSocket.on('call-joined', message => {
        console.log('Participant joined the call:', message.participant_id);
      });

      setSocket(newSocket);
    }
  };

  const initiateCall = callInitiateData => {
    console.log('call initiate function first log');
    if (socket) {
      console.log('if is socketconnected ( call-initiate)');
      socket.emit('call-initiate', callInitiateData, response => {
        console.log('call emit logg debug');
        if (!response || !response.status) {
          console.error(
            'Error during call initiation:',
            response?.message || 'Unknown error',
          );
        } else {
          console.log('Call initiated successfully:', response);
          navigation.navigate('OutgoingCall', {
            participants: callInitiateData.participants,
          });
        }
      });
    } else {
      console.log('Socket is not connected');
    }
  };

  // const inviteToCall = (roomId, participantId) => {
  //   if (socket) {
  //     const message = {
  //       room_id: roomId,
  //       participant_id: participantId,
  //     };
  //     socket.emit('call-join', message, response => {
  //       if (!response || !response.status) {
  //         console.error(
  //           'Error during call invitation:',
  //           response?.message || 'Unknown error'
  //         );
  //       } else {
  //         console.log('Call invitation sent:', response);
  //         const { data: callData } = response;
  //         navigation.navigate('OutgoingCall', { callDetails: callData });
  //       }
  //     });
  //   } else {
  //     console.log('Socket is not connected');
  //   }
  // };

  const acceptCall = (roomId, participants) => {
    if (socket) {
      const message = {
        room_id: roomId,
        participant_id: participants,
      };
      socket.emit('call-accept', message, response => {
        if (!response || !response.status) {
          console.error(
            'Error during call acceptance:',
            response?.message || 'Unknown error',
          );
        } else {
          console.log('Call accepted:', response);
          const {data: callData} = response;
          navigateToCallScreen(callData);
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
      socket.emit('call-reject', message, response => {
        if (!response || !response.status) {
          console.error(
            'Error during call rejection:',
            response?.message || 'Unknown error',
          );
        } else {
          console.log('Call rejected:', response);
          setIsInCall(false);
          navigation.navigate('Home');
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

      socket.emit('call-exit', message, response => {
        if (!response || !response.status) {
          console.error(
            'Error ending the call:',
            response?.message || 'Unknown error',
          );
        } else {
          console.log('Call ended:', response);
          setIsInCall(false);
          setCallDetails(null);
          navigation.navigate('Home');
        }
      });
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
        callStatus,
        // inviteToCall
      }}>
      {children}
    </SocketContext.Provider>
  );
};
