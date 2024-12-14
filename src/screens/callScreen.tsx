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
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const CallDetailsScreen = ({ route }) => {
//   const { callDetails } = route.params; // Agora details received from SocketProvider

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Agora Call Details</Text>
//       <Text style={styles.text}>Room ID: {callDetails.room_id}</Text>
//       <Text style={styles.text}>Participant ID: {callDetails.participant_id}</Text>
//       <Text style={styles.text}>App ID: {callDetails.app_id}</Text>
//       <Text style={styles.text}>Token: {callDetails.token}</Text>
//       <Text style={styles.text}>UID: {callDetails.uid}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
// });

// export default CallDetailsScreen;
