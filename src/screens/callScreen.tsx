


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { useSocket } from '../context/socketContext';
import AgoraUIKit from 'agora-rn-uikit';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Add user icon

const CallScreen = () => {
  const { callDetails, isInCall, setIsInCall, inviteToCall } = useSocket();

  // If no call details are available, show a waiting message
  if (!isInCall || !callDetails) {
    return (
      <View style={styles.container}>
        <Text>Waiting for the call to be accepted...</Text>
      </View>
    );
  }

  // Agora call configuration
  // const connectionData = {
  //   appId: callDetails.app_id, // Agora app ID
  //   channel: callDetails.room_id, // Channel name
  //   token: callDetails.token, // Token for the session
  //   uid: callDetails.uid, // User ID for Agora
  //   onEndCall: () => {
  //     setIsInCall(false);
  //   },
  // };

  const connectionData = {
    appId: "4f3e2bbec8e64405a07bdea5e7cd6ee0",
    channel: "test",
    token: "007eJxTYHi9L32loMNZzkOaeps/xTpv/Wc3/ZDmzKCSN6ZzJlY4nTuhwGCSZpxqlJSUmmyRamZiYmCaaGCelJKaaJpqnpxilppqYPSrIL0hkJFB4KwlEyMDBIL4LAwlqcUlDAwAwuohIg==", // Token for the session
    uid: 1, // User ID for Agora
    onEndCall: () => {
      setIsInCall(false);
    },
  };

  const rtcCallbacks = {
    EndCall: () => setIsInCall(false),
  };

  return (
    <View style={styles.container}>
 
      {/* Agora Video Call */}
      <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  addUserButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default CallScreen;




// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   Button,
// } from 'react-native';
// import { useSocket } from '../context/socketContext';
// import AgoraUIKit from 'agora-rn-uikit';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Add user icon

// const CallScreen = () => {
//   const { callDetails, isInCall, setIsInCall, inviteToCall } = useSocket();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const handleAddUser = () => {
//     if (phoneNumber.trim() !== '') {
//       inviteToCall(callDetails.room_id, phoneNumber);
//       setModalVisible(false);
//       setPhoneNumber('');
//     } else {
//       console.log('Please enter a valid phone number.');
//     }
//   };

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
//       {/* Add User Icon */}
//       <TouchableOpacity
//         style={styles.addUserButton}
//         onPress={() => setModalVisible(true)}
//       >
//         <Icon name="person-add" size={30} color="#fff" />
//       </TouchableOpacity>

//       {/* Agora Video Call */}
//       <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />

//       {/* Modal for Adding User */}
//       <Modal
//         transparent
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Add User to Call</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter phone number"
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//               keyboardType="phone-pad"
//             />
//             <View style={styles.modalButtons}>
//               <Button title="Add" onPress={handleAddUser} />
//               <Button
//                 title="Cancel"
//                 color="red"
//                 onPress={() => setModalVisible(false)}
//               />
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   addUserButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     zIndex: 10,
//     backgroundColor: '#007AFF',
//     borderRadius: 50,
//     padding: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
// });

// export default CallScreen;




// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   PermissionsAndroid,
//   Platform,
//   findNodeHandle
// } from 'react-native';
// import {
//   createAgoraRtcEngine,
//   IRtcEngine,
//   ChannelProfileType,
//   ClientRoleType,
//   RenderModeType,
// } from 'react-native-agora';

// const APP_ID = '4f3e2bbec8e64405a07bdea5e7cd6ee0';
// const TOKEN = '007eJxTYAhNj99xOn7XTV4ukw/NedseRqxu3nNkj5XawVsmmiEcgYEKDCZpxqlGSUmpyRapZiYmBqaJBuZJKamJpqnmySlmqakGsmcS0hsCGRlcX91hZmSAQBCfm6EktbjEOSMxLy81h4EBAG2kI0I=';
// const CHANNEL_NAME = 'testChannel';
// const UID = 0;

// const BasicCallApp = () => {
//   const [engine, setEngine] = useState<IRtcEngine | null>(null);
//   const [joined, setJoined] = useState(false);
//   const [remoteUid, setRemoteUid] = useState<number | null>(null);

//   useEffect(() => {
//     const initializeAgora = async () => {
//       const rtcEngine = createAgoraRtcEngine();
//       setEngine(rtcEngine);

//       rtcEngine.initialize({
//         appId: APP_ID,
//         channelProfile: ChannelProfileType.ChannelProfileCommunication,
//       });

//       rtcEngine.enableVideo();

//       rtcEngine.registerEventHandler({
//         onJoinChannelSuccess: (channel, uid, elapsed) => {
//           console.log(`Joined channel: ${channel} with UID: ${uid}`);
//           setJoined(true);
//         },
//         onUserJoined: (uid, elapsed) => {
//           console.log(`Remote user joined: ${uid}`);
//           setRemoteUid(uid);
//           engine?.setupRemoteVideo({
//             uid,
//             renderMode: RenderModeType.RenderModeHidden,
//             view: findNodeHandle(remoteViewRef.current),
//           });
//         },
//         onUserOffline: (uid, reason) => {
//           console.log(`Remote user left: ${uid}, reason: ${reason}`);
//           setRemoteUid(null);
//         },
//       });

//       if (Platform.OS === 'android') {
//         await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         ]);
//       }
//     };

//     initializeAgora();

//     return () => {
//       if (engine) {
//         engine.unregisterEventHandler();
//         engine.release();
//       }
//     };
//   }, []);

//   const localViewRef = React.createRef<View>();
//   const remoteViewRef = React.createRef<View>();

//   const joinChannel = () => {
//     if (engine) {
//       engine.startPreview();
//       engine.setupLocalVideo({
//         uid: UID,
//         renderMode: RenderModeType.RenderModeHidden,
//         view: findNodeHandle(localViewRef.current),
//       });
//       engine.joinChannel(TOKEN, CHANNEL_NAME, UID, {
//         clientRoleType: ClientRoleType.ClientRoleBroadcaster,
//       });
//     }
//   };

//   const leaveChannel = () => {
//     if (engine) {
//       engine.leaveChannel();
//       setJoined(false);
//       setRemoteUid(null);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {joined ? (
//         <>
//           <View style={styles.videoContainer}>
//             {/* Local video */}
//             <View ref={localViewRef} style={styles.video} />
//             {/* Remote video */}
//             {remoteUid && <View ref={remoteViewRef} style={styles.video} />}
//           </View>
//           <View style={styles.controls}>
//             <TouchableOpacity style={styles.button} onPress={leaveChannel}>
//               <Text style={styles.buttonText}>Leave Call</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         <View style={styles.controls}>
//           <TouchableOpacity style={styles.button} onPress={joinChannel}>
//             <Text style={styles.buttonText}>Join Call</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   videoContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   video: {
//     width: '45%',
//     height: '50%',
//     backgroundColor: '#000',
//   },
//   controls: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   button: {
//     padding: 10,
//     backgroundColor: '#007AFF',
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default BasicCallApp;
