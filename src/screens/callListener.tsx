import React, { useEffect, useState } from 'react';
import { handleIncomingCall, connectSocket, disconnectSocket } from './socketService';

const CallListener = () => {
  const [callerInfo, setCallerInfo] = useState(null);

  useEffect(() => {
    // Establish socket connection
    connectSocket();

    // Listen for incoming calls
    handleIncomingCall(setCallerInfo);

    // Optionally clean up the socket when the component unmounts
    return () => {
      disconnectSocket();
    };
  }, []);

  return null; // This component doesn't need to render anything
};

export default CallListener;
