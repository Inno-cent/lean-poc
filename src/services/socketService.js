import io from 'socket.io-client';

// Define the backend server URL
const SOCKET_URL = 'http://10.0.2.2:8000/'; // Replace with your actual backend URL

let socket;

// Function to connect to the Socket.IO server and emit 'join-room'
const connectSocket = () => {
  if (!socket) {
    // Establish connection to Socket.IO server
    socket = io(SOCKET_URL);

    // Log the connection status
    socket.on('connect', () => {
      const dummyUserId = 'dummyUser123';
      console.log('Connected to Socket.IO server:', socket.id);

      // Emit 'join-room' event once connected
      socket.emit('join-room', dummyUserId);
      console.log(`Emitted 'join-room' for user ID: ${dummyUserId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server:', socket.id);
    });
  }
};

// Function to emit 'call-initiate' event
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

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log('Socket disconnected');
    socket = null; // Resetting the socket variable
  }
};

export { connectSocket, initiateCall, socket,disconnectSocket };

