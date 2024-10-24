
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import { useSocket } from '../context/socketContext';

const IncomingCallScreen = ({ route, navigation }) => {
  const screenHeight = Dimensions.get('window').height;

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
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={[styles.contentContainer, { height: screenHeight * 0.6 }]}>
        <Text style={styles.callerName}>{callerInfo.caller_id || 'Unknown Caller'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {/* Decline Button */}
        <TouchableOpacity style={styles.declineButton} onPress={handleReject}>
          <Icon name="times" size={30} color="white" />
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>

        {/* Accept Button */}
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Icon name="phone" size={30} color="white" />
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  callerName: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 50,
  },
  declineButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  acceptButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
});

export default IncomingCallScreen;
