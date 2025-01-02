import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  RtcSurfaceView,
  IRtcEngine,
} from 'react-native-agora';
import {useUser} from '../context/userContext';

// Define Agora constants
const APP_ID = '4f3e2bbec8e64405a07bdea5e7cd6ee0'; // Your Agora App ID
const CHANNEL_NAME = 'test-abc'; // Your channel name
const TEMP_TOKEN =
  '007eJxTYJjhIxyhlL28K2zts8xzDnbbLqb//fI7fLbpD0X3E3PZblQrMJikGacaJSWlJlukmpmYGJgmGpgnpaQmmqaaJ6eYpaYanH5Xlt4QyMjw6cBlJkYGCATxORhKUotLdBOTkhkYAIi5JJc='; // Temporary token
const UID = 0; // Local user ID

const App = () => {
  const agoraEngineRef = useRef<IRtcEngine>(); // Reference to Agora engine
  const [isJoined, setIsJoined] = useState(true); // State to track channel join status
  const [remoteUsers, setRemoteUsers] = useState([]); // State to track remote users
  const [micEnabled, setMicEnabled] = useState(true); // State to track microphone status
  const [cameraEnabled, setCameraEnabled] = useState(true); // State to track camera status

  useEffect(() => {
    const initializeAgora = async () => {
      try {
        if (Platform.OS === 'android') {
          const permissionsGranted = await requestPermissions();
          if (!permissionsGranted) {
            console.log('Permissions not granted');
            return;
          }
        }
        await setupAgoraEngine();
        joinChannel(); // Move here to ensure it is called after setup
      } catch (error) {
        console.error('Error initializing Agora:', error);
      }
    };

    initializeAgora();
    // Clean up when the component unmounts
    return () => {
      agoraEngineRef.current?.leaveChannel();
      agoraEngineRef.current?.release();
    };
  }, []);

  const {user} = useUser();

  const setupAgoraEngine = async () => {
    if (Platform.OS === 'android') {
      await requestPermissions();
    }

    agoraEngineRef.current = createAgoraRtcEngine();
    const agoraEngine = agoraEngineRef.current;

    // Initialize the Agora engine with the App ID
    agoraEngine.initialize({
      appId: APP_ID,
    });

    // Enable video
    agoraEngine.enableVideo();

    // Register event handlers
    agoraEngine.registerEventHandler({
      onJoinChannelSuccess: () => {
        setIsJoined(true);
        console.log('Successfully joined the channel');
      },
      onUserJoined: (_, uid) => {
        setRemoteUsers(prevUsers => [...prevUsers, uid]);
        console.log(`Remote user joined: ${uid}`);
      },
      onUserOffline: (_, uid) => {
        setRemoteUsers(prevUsers => prevUsers.filter(user => user !== uid));
        console.log(`Remote user left: ${uid}`);
      },
    });
  };

  const requestPermissions = async () => {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
    return (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED
    );
  };

  const joinChannel = () => {
    agoraEngineRef.current?.joinChannel(TEMP_TOKEN, CHANNEL_NAME, UID, {
      channelProfile: ChannelProfileType.ChannelProfileCommunication,
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const leaveChannel = () => {
    agoraEngineRef.current?.leaveChannel();
    setIsJoined(false);
    setRemoteUsers([]);
    console.log('Left the channel');
  };

  const toggleMicrophone = () => {
    const newMicState = !micEnabled;
    setMicEnabled(newMicState);
    agoraEngineRef.current?.muteLocalAudioStream(!newMicState);
  };

  const toggleCamera = () => {
    const newCameraState = !cameraEnabled;
    setCameraEnabled(newCameraState);
    agoraEngineRef.current?.muteLocalVideoStream(!newCameraState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        {isJoined && (
          <>
            {remoteUsers.length === 0 ? (
              // Full-screen local video when no remote users
              <RtcSurfaceView
                canvas={{uid: UID}}
                style={styles.fullScreenVideo}
              />
            ) : (
              // Small local video and remote user videos
              <>
                <RtcSurfaceView
                  canvas={{uid: UID}}
                  style={[styles.localVideo]}
                />
                {remoteUsers.map((uid, index) => (
                  <View key={index} style={styles.remoteVideoWrapper}>
                    {cameraEnabled ? (
                      <RtcSurfaceView
                        key={index}
                        canvas={{uid}}
                        style={styles.remoteVideo}
                      />
                    ) : (
                      <View style={styles.cameraOffPlaceholder}>
                        <Text style={styles.placeholderText}>
                          {user ? user.name : uid}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </>
            )}
          </>
        )}
      </View>

     
      <View style={styles.controlsWrapper}>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlIcon}
            onPress={toggleMicrophone}>
            <MaterialIcon
              name={micEnabled ? 'mic' : 'mic-off'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlIcon} onPress={toggleCamera}>
            <MaterialIcon
              name={cameraEnabled ? 'videocam' : 'videocam-off'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlIcon}>
            <Icon name="user-plus" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlIcon, styles.endCall]}
            onPress={leaveChannel}>
            <MaterialIcon name="call-end" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  videoContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  localVideo: {
    width: 100,
    height: 150,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: '#000',
  },
  remoteVideoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    margin: 10,
  },
  controlsWrapper: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
  },
  controlIcon: {
    backgroundColor: '#007bff',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#007bff',
    width: 60,
    height: 60,
  },
  endCall: {
    backgroundColor: '#ff4d4d',
    borderColor: '#ff4d4d',
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  cameraOffPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  placeholderText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;

// <View style={styles.videoContainer}>
// {isJoined && (
//   <>
//     <RtcSurfaceView
//       canvas={{uid: UID}}
//       style={[
//         styles.localVideo,
//         {
//           position: 'absolute',
//           top: 10,
//           right: 10,
//           width: 100,
//           height: 150,
//           zIndex: 10,
//         },
//       ]}
//     />
//     {remoteUsers.length > 0 &&
//       remoteUsers.map((uid, index) => (
//         <View key={index} style={styles.remoteVideo}>
//           {cameraEnabled ? (
//             <RtcSurfaceView
//               key={index}
//               canvas={{uid}}
//               style={[
//                 styles.remoteVideo,
//                 remoteUsers.length > 2
//                   ? {width: '50%', height: '50%'}
//                   : {flex: 1},
//               ]}
//             />
//           ) : (
//             <View style={styles.cameraOffPlaceholder}>
//               <Text style={styles.placeholderText}>
//                 {user ? user.name : uid}
//               </Text>
//             </View>
//           )}
//         </View>
//       ))}
//   </>
// )}
// </View>

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   Button,
//   FlatList
// } from 'react-native';
// import { useSocket } from '../context/socketContext';
// import AgoraUIKit from 'agora-rn-uikit';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Add user icon
// import ContactCard from '../components/contactCard';
// import { useContacts } from '../screens/contacts/api';

// interface Contact {
//   _id: string;
//   first_name: string;
//   last_name: string;
//   international_dialing_code: string;
//   phone_number: string;
//   profileImage: any;
// }

// const CallScreen = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const { contacts, error } = useContacts(false) as {
//     contacts: Contact[];
//     error: any;
//   };

//   const openModal = () => setIsModalVisible(true);
//   const closeModal = () => setIsModalVisible(false);

//   const renderContact = ({ item }: { item: Contact }) => (
//     <ContactCard
//       key={item._id}
//       first_name={item.first_name}
//       id={item._id}
//       last_name={item.last_name}
//       international_dialing_code={item.international_dialing_code}
//       phone_number={item.phone_number}
//       profileImage={item.profileImage}
//     />
//   );
//   // const { callDetails, isInCall, setIsInCall, inviteToCall } = useSocket();

//   // If no call details are available, show a waiting message
//   // if (!isInCall || !callDetails) {
//   //   return (
//   //     <View style={styles.container}>
//   //       <Text>Waiting for the call to be accepted...</Text>
//   //     </View>
//   //   );
//   // }

//   // Agora call configuration
//   // const connectionData = {
//   //   appId: callDetails.app_id, // Agora app ID
//   //   channel: callDetails.room_id, // Channel name
//   //   token: callDetails.token, // Token for the session
//   //   uid: callDetails.uid, // User ID for Agora
//   //   onEndCall: () => {
//   //     setIsInCall(false);
//   //   },
//   // };

//   const connectionData = {
//     appId: "4f3e2bbec8e64405a07bdea5e7cd6ee0",
//     channel: "test",
//     token: "007eJxTYHi9L32loMNZzkOaeps/xTpv/Wc3/ZDmzKCSN6ZzJlY4nTuhwGCSZpxqlJSUmmyRamZiYmCaaGCelJKaaJpqnpxilppqYPSrIL0hkJFB4KwlEyMDBIL4LAwlqcUlDAwAwuohIg==", // Token for the session
//     uid: 1, // User ID for Agora
//     // onEndCall: () => {
//     //   setIsInCall(false);
//     // },
//   };

//   const rtcCallbacks = {
//     // EndCall: () => setIsInCall(false),
//   };

//   return (
//     <View style={styles.container}>
//        <TouchableOpacity
//         style={styles.addUserButton}
//         onPress={openModal}
//       >
//         <Icon name="person-add" size={30} color="#fff" />
//       </TouchableOpacity>

//        {/* Modal to Show Contacts */}
//        <Modal
//         visible={isModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={closeModal}
//       >
//         <View style={styles.modalContainer}>
//           {/* Close Icon */}
//           <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
//             <Icon name="close" size={30} color="#000" />
//           </TouchableOpacity>

//           {/* Contacts List */}
//           <FlatList
//             data={contacts}
//             keyExtractor={(item) => item._id}
//             renderItem={renderContact}
//             contentContainerStyle={styles.contactList}
//           />
//         </View>
//       </Modal>
//       {/* Agora Video Call */}
//       <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />

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
//     marginTop: 20,
//     marginHorizontal: 10,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 15,
//     left: 15,
//     zIndex: 10,
//   },
//   contactList: {
//     marginTop: 50,
//     paddingHorizontal: 10,
//   },
// });

// export default CallScreen;

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

//     </View>
//   );
// };

