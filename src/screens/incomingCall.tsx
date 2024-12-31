import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useSocket} from '../context/socketContext';

const IncomingCallScreen = ({route}) => {
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  const {callerInfo} = route.params;
  const {acceptCall, rejectCall} = useSocket();

  // Handle call acceptance
  const handleAccept = () => {
    console.log('accepted click', callerInfo);
    acceptCall(callerInfo.room_id, callerInfo.participants);
  };

  // Handle call rejection
  const handleReject = () => {
    console.log('Rejecting call with caller info:', callerInfo);
    rejectCall(callerInfo.room_id, callerInfo.participants);
  };

  return (
    <>
      <View style={[styles.contentContainer, {height: screenHeight * 0.6}]}>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}} // Placeholder image URL
          style={styles.profilePicture}
        />

        <Text style={styles.callerName}>
          {callerInfo.caller_id || 'Unknown Caller'}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {/* Decline Button */}
        <TouchableOpacity style={styles.declineButton} onPress={handleReject}>
          {/* <Icon name="times" size={30} color="white" /> */}
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>

        {/* Accept Button */}
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          {/* <Icon name="phone" size={30} color="white" /> */}
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  contentContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 30,
  },
  callerName: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginVertical: 5,
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
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 40,
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
