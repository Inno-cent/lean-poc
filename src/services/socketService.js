import io from 'socket.io-client';

// Define the backend server URL
const SOCKET_URL = 'http://10.0.2.2:8000/'; // Replace with your actual backend URL

let socket;

// Function to connect to the Socket.IO server and emit 'join-room'
// Accept the userId (MongoDB _id) after login
const connectSocket = (userId) => {
  if (!socket) {
    // Establish connection to Socket.IO server
    socket = io(SOCKET_URL);

    // Log the connection status
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server:', socket.id);

      // Emit 'join-room' event with the MongoDB ObjectId (userId)
      socket.emit('join-room', userId);
      console.log(`Emitted 'join-room' for user ID: ${userId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server:', socket.id);
    });
  }
};

// Function to emit 'call-initiate' event
// Pass the userId as part of the callInitiateData if necessary
const initiateCall = (callInitiateData) => {
  if (socket) {
    // Emit the 'call-initiate' event
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

// Function to handle incoming calls
// Pass `setCallerInfo` and `navigation` from the component
const handleIncomingCall = (setCallerInfo, navigation) => {
  if (socket) {
    // Listen for the 'call-received' event
    socket.on('call-received', (callData) => {
      console.log('Incoming call received:', callData);
      
      // Set the caller information in the state
      if (typeof setCallerInfo === 'function') {
        setCallerInfo(callData);
      } else {
        console.error('setCallerInfo is not a function');
      }

      // Navigate to the incoming call screen
      navigation.navigate('IncomingCall', { callerInfo: callData });
    });
  }
};

// Function to disconnect the socket
const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log('Socket disconnected');
    socket = null; // Resetting the socket variable
  }
};

// Export the necessary functions
export { connectSocket, initiateCall, socket, disconnectSocket, handleIncomingCall };
