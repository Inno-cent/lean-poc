// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {useSocket} from '../context/socketContext';
// import AgoraUIKit from 'agora-rn-uikit';

// const CallScreen = () => {
//   const {callDetails, isInCall, setIsInCall} = useSocket();

//   // If no call details are available, show a waiting message
//   if (!isInCall || !callDetails) {
//     return (
//       <View style={styles.container}>
//         <Text>Waiting for the call to be accepted...</Text>
//       </View>
//     );
//   }

//   // Agora call configuration
//   const connectionData = {
//     appId: callDetails.app_id, // Agora app ID
//     channel: callDetails.room_id, // Channel name
//     token: callDetails.token, // Token for the session
//     uid: callDetails.uid, // User ID for Agora
//     onEndCall: () => {
//       setIsInCall(false);
//     },
//   };

//   const rtcCallbacks = {
//     EndCall: () => setIsInCall(false),
//   };

//   return (
//     <View style={styles.container}>
//       <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
//       {/* <Text>{connectionData.appId}</Text>
//       <Text>{connectionData.channel}</Text>
//       <Text>{connectionData.token}</Text>
//       <Text>{connectionData.uid}</Text> */}

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CallScreen;



import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  findNodeHandle
} from 'react-native';
import {
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  RenderModeType,
} from 'react-native-agora';

const APP_ID = '4f3e2bbec8e64405a07bdea5e7cd6ee0';
const TOKEN = '007eJxTYAhNj99xOn7XTV4ukw/NedseRqxu3nNkj5XawVsmmiEcgYEKDCZpxqlGSUmpyRapZiYmBqaJBuZJKamJpqnmySlmqakGsmcS0hsCGRlcX91hZmSAQBCfm6EktbjEOSMxLy81h4EBAG2kI0I=';
const CHANNEL_NAME = 'testChannel';
const UID = 0;

const BasicCallApp = () => {
  const [engine, setEngine] = useState<IRtcEngine | null>(null);
  const [joined, setJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState<number | null>(null);

  useEffect(() => {
    const initializeAgora = async () => {
      const rtcEngine = createAgoraRtcEngine();
      setEngine(rtcEngine);

      rtcEngine.initialize({
        appId: APP_ID,
        channelProfile: ChannelProfileType.ChannelProfileCommunication,
      });

      rtcEngine.enableVideo();

      rtcEngine.registerEventHandler({
        onJoinChannelSuccess: (channel, uid, elapsed) => {
          console.log(`Joined channel: ${channel} with UID: ${uid}`);
          setJoined(true);
        },
        onUserJoined: (uid, elapsed) => {
          console.log(`Remote user joined: ${uid}`);
          setRemoteUid(uid);
          engine?.setupRemoteVideo({
            uid,
            renderMode: RenderModeType.RenderModeHidden,
            view: findNodeHandle(remoteViewRef.current),
          });
        },
        onUserOffline: (uid, reason) => {
          console.log(`Remote user left: ${uid}, reason: ${reason}`);
          setRemoteUid(null);
        },
      });

      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
      }
    };

    initializeAgora();

    return () => {
      if (engine) {
        engine.unregisterEventHandler();
        engine.release();
      }
    };
  }, []);

  const localViewRef = React.createRef<View>();
  const remoteViewRef = React.createRef<View>();

  const joinChannel = () => {
    if (engine) {
      engine.startPreview();
      engine.setupLocalVideo({
        uid: UID,
        renderMode: RenderModeType.RenderModeHidden,
        view: findNodeHandle(localViewRef.current),
      });
      engine.joinChannel(TOKEN, CHANNEL_NAME, UID, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    }
  };

  const leaveChannel = () => {
    if (engine) {
      engine.leaveChannel();
      setJoined(false);
      setRemoteUid(null);
    }
  };

  return (
    <View style={styles.container}>
      {joined ? (
        <>
          <View style={styles.videoContainer}>
            {/* Local video */}
            <View ref={localViewRef} style={styles.video} />
            {/* Remote video */}
            {remoteUid && <View ref={remoteViewRef} style={styles.video} />}
          </View>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.button} onPress={leaveChannel}>
              <Text style={styles.buttonText}>Leave Call</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={joinChannel}>
            <Text style={styles.buttonText}>Join Call</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  video: {
    width: '45%',
    height: '50%',
    backgroundColor: '#000',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BasicCallApp;
