import React from 'react';
import { View, Text, Button } from 'react-native';

const IncomingCall = ({ route, navigation }) => {
  const { callerInfo } = route.params;

  const handleAccept = () => {
    // Logic to accept the call
    console.log('Call accepted');
    navigation.navigate('CallScreen', { callerInfo });
  };

  const handleReject = () => {
    // Logic to reject the call
    console.log('Call rejected');
    navigation.goBack();
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
