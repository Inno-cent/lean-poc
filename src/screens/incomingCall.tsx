import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSocket } from '../context/socketContext';

const IncomingCall = ({ route, navigation }) => {
  const { callerInfo } = route.params;  // Access the caller info passed via route
  const { acceptCall } = useSocket();  // Use acceptCall from the socket context

  // Handle call acceptance
  const handleAccept = () => {
    console.log("accepted click", callerInfo.room_id)
    acceptCall(callerInfo.room_id);  // Trigger acceptCall with the room_id
  };

  // Handle call rejection (if applicable)
  const handleReject = () => {
    // If you want to implement call rejection, you can define rejectCall in the context
    // rejectCall(callerInfo.room_id);
    navigation.goBack();  // Navigate back on call rejection
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Incoming Call from {callerInfo.caller_id}</Text>
      <Text>Call Type: {callerInfo.call_type}</Text>
      <Button title="Accept Call" onPress={handleAccept} />
      <Button title="Reject Call" onPress={handleReject} />
    </View>
  );
};

export default IncomingCall;
