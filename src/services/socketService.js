import io from 'socket.io-client';

// Define the backend server URL
const SOCKET_URL = 'http://your-backend-url'; // Replace with your actual backend URL

let socket;

// Function to connect to the Socket.IO server and emit 'join-room'
const connectSocket = (userId) => {
  if (!socket) {
    // Establish connection to Socket.IO server
    socket = io(SOCKET_URL);

    // Log the connection status
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server:', socket.id);

      // Emit 'join-room' event once connected
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

export { connectSocket, initiateCall };
