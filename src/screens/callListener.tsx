import React, { useEffect, useState } from 'react';
import { handleIncomingCall } from "../services/socketService";
import { useNavigation } from '@react-navigation/native';

const CallListener = () => {
  const [callerInfo, setCallerInfo] = useState(null);
  const navigation = useNavigation(); // Get the navigation object

  useEffect(() => {
    // Listen for incoming calls, socket is already connected in Home
    handleIncomingCall(setCallerInfo, navigation); // Pass navigation to handleIncomingCall

    // Optionally clean up the socket when the component unmounts
   
  }, []);

  return null; // This component doesn't need to render anything
};

export default CallListener;
