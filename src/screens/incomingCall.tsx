import React from 'react';
import { View, Text, Image, Button } from 'react-native';

const IncomingCall = ({ route, navigation }) => {
  const { callerInfo } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={{ uri: callerInfo.profilePicture }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      <Text>{callerInfo.caller_id}</Text>
      
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button title="Accept" color="green" onPress={() => {/* Handle call accept logic */}} />
        <Button title="Reject" color="red" onPress={() => {/* Handle call reject logic */}} />
      </View>
    </View>
  );
};

export default IncomingCall;
