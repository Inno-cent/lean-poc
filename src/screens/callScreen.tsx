import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSocket} from '../context/socketContext';
import AgoraUIKit from 'agora-rn-uikit';

const CallScreen = () => {
  const {callDetails, isInCall, setIsInCall} = useSocket();

  // If no call details are available, show a waiting message
  if (!isInCall || !callDetails) {
    return (
      <View style={styles.container}>
        <Text>Waiting for the call to be accepted...</Text>
      </View>
    );
  }

  // Agora call configuration
  const connectionData = {
    appId: callDetails.app_id, // Agora app ID
    channel: callDetails.room_id, // Channel name
    token: callDetails.token, // Token for the session
    uid: callDetails.uid, // User ID for Agora
    onEndCall: () => {
      setIsInCall(false);
    },
  };

  const rtcCallbacks = {
    EndCall: () => setIsInCall(false),
  };

  return (
    <View style={styles.container}>
      <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
      {/* <Text>{connectionData.appId}</Text>
      <Text>{connectionData.channel}</Text>
      <Text>{connectionData.token}</Text>
      <Text>{connectionData.uid}</Text> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CallScreen;

