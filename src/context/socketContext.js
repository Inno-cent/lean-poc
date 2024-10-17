import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://10.0.2.2:8000/'; // Replace with your actual backend URL

// Create a context
const SocketContext = createContext();

// Custom hook to use the SocketContext
export const useSocket = () => {
  return useContext(SocketContext);
};

// Socket provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io(SOCKET_URL);

    // Log connection success
    newSocket.on('connect', () => {
      const dummyUserId = 'dummyUser123'; // Replace with actual user ID if needed
      console.log('Connected to Socket.IO server:', newSocket.id);

      // Emit 'join-room' once connected
      newSocket.emit('join-room', dummyUserId);
      console.log(`Emitted 'join-room' for user ID: ${dummyUserId}`);
    });

    // Log disconnection
    newSocket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server:', newSocket.id);
    });

    // Save the socket instance
    setSocket(newSocket);

    // Clean up and disconnect the socket when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
