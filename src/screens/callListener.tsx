import React, { useEffect } from 'react';
import { handleIncomingCall } from "../services/socketService";

const CallListener = () => {

  useEffect(() => {
    // Listen for incoming calls
    handleIncomingCall();

    // No need to disconnect the socket here since it's handled elsewhere
  }, []);

  return null; // This component still doesn't need to render anything
};

export default CallListener;