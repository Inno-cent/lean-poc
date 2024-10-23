// import React, { useEffect, useState } from 'react';
// import { handleIncomingCall, disconnectSocket } from "../services/socketService";
// import { useNavigation } from '@react-navigation/native';

// const CallListener = () => {
//   const [callerInfo, setCallerInfo] = useState(null);
//   const navigation = useNavigation(); // Get the navigation object

//   useEffect(() => {
//     console.log('CallListener component mounted, listening for incoming calls.');

//     // Listen for incoming calls, socket is already connected in Home
//     handleIncomingCall((callData) => {
//       console.log('CallListener: Incoming call data received:', callData);
//       setCallerInfo(callData); // Update state with incoming call data

//       // Navigate to the incoming call screen
//       if (callData) {
//         console.log('CallListener: Navigating to IncomingCall screen with callerInfo:', callData);
//         navigation.navigate('IncomingCall', { callerInfo: callData });
//       }
//     }, navigation);

//     // Optionally clean up the socket when the component unmounts
//     return () => {
//       console.log('CallListener component unmounted, disconnecting socket.');
//       disconnectSocket(); // Disconnect if needed
//     };
//   }, []);

//   // Log current callerInfo state
//   useEffect(() => {
//     if (callerInfo) {
//       console.log('CallListener: State updated with callerInfo:', callerInfo);
//     }
//   }, [callerInfo]);

//   return null; // This component doesn't need to render anything
// };

// export default CallListener;
