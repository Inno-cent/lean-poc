import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSocket} from '../context/socketContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OutgoingCallScreen = ({route}) => {
  const { callStatus } = useSocket(); 
  const {participants} = route.params;

  // const [callStatus, setCallStatus] = useState('Connecting...');

  // useEffect(() => {
  //   // Handle the call-received event
  //   const handleCallReceived = (_data: any) => {
  //     console.log("Call received event data:", _data);
  //     setCallStatus('Ringing...');
  //   };

  //   if (socket) {
  //     console.log("Listening for call-received event...");
  //     socket.on('call-received', handleCallReceived);
  //   }

  //   // Cleanup: Remove the event listener when the component unmounts
  //   return () => {
  //     if (socket) {
  //       socket.off('call-received', handleCallReceived);
  //     }
  //   };
  // }, [socket]);

  // // Optional: Log the call status to check for changes
  // useEffect(() => {
  //   console.log("Current call status:", callStatus);
  // }, [callStatus]);

  return (
    <View style={styles.container}>
      <View style={styles.participantsContainer}>
        <Text style={styles.calling}>{callStatus}</Text>

        <View style={styles.participantsContainer}>
          {participants.map((participantId, index) => (
            <Text key={index} style={styles.participantName}>
              {participantId}
            </Text>
          ))}
          {/* <Text style={styles.callStatus}>{callStatus}</Text> */}

        </View>
      </View>
          <TouchableOpacity style={styles.endCallButton}>
            <Icon name="call-end" size={24} color="#ffffff" />
          </TouchableOpacity>
    </View>
  );
};

export default OutgoingCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-between',
    // alignItems: 'center',
    padding: 20,
  },
  participantsContainer: {
    // backgroundColor: '#ffffff',
    // padding: 20,
    // borderRadius: 10,
    // alignItems: 'center',
    // width: '100%',
    // marginBottom: 20,
    // elevation: 5, // shadow for Android
    // shadowColor: '#000', // shadow for iOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },
  participantName: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginVertical: 5,
  },
  callStatus: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  calling: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  endCallButton: {
    // position: 'absolute',
    bottom: 80,
    // left: 0,
    // right: 0,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    width: 60,
    height: 60,
  },
});
