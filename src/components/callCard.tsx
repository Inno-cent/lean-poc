import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Swipeable} from 'react-native-gesture-handler';
import { useSocket } from '../context/socketContext';

const CallCard = ({
  name,
  timeAgo,
  profileImage,
  isCallIncoming,
  isVideoCall,
  onDelete,
}) => {
  const [isSwiped, setIsSwiped] = useState(false);

  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <FontAwesome name="trash" size={24} color="#FFF" />
    </TouchableOpacity>
  );

  const { initiateCall } = useSocket();

  const handleInitiateCall = () => {
    const callInitiateData = {
      call_type: 'Video', // Dummy call data
      caller_id: '6717f284bf03fa46df1bbfa5',
      participants: ['67101dc4eb84cedc9bafcbea'],
    };
    console.log('call clicked', callInitiateData);
    initiateCall(callInitiateData);
  };
  const handleSwipe = () => {
    setIsSwiped(true);
  };

  const handleSwipeClose = () => {
    setIsSwiped(false);
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableOpen={handleSwipe}
      onSwipeableClose={handleSwipeClose}>
      <View
        style={[
          styles.recentCallsCard,
          isSwiped && styles.swipedCard, // Apply conditional styling
        ]}>
        <View style={styles.leftCard}>
          <Image source={profileImage} style={styles.profilePicture} />
          <View style={styles.callInfo}>
            <Text style={styles.nameText}>{name}</Text>
            <View style={styles.timeInfo}>
              <FontAwesome
                name={isCallIncoming ? 'arrow-down' : 'arrow-up'}
                size={14}
                color={isCallIncoming ? 'red' : 'green'}
              />
              <Text style={styles.timeText}>{timeAgo}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleInitiateCall}>
          <FontAwesome
            name={isVideoCall ? 'video-camera' : 'phone'}
            size={20}
            color="#415A77"
          />
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  recentCallsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D9D9D980',
    padding: 15,
    borderRadius: 10, // Default borderRadius
    marginHorizontal: 20, // Default marginHorizontal
    marginBottom: 20,
  },
  swipedCard: {
    borderRadius: 0, // Remove borderRadius when swiped
    marginHorizontal: 0, // Remove marginHorizontal when swiped
  },
  leftCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  callInfo: {
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B263B',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  timeText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#1B263B',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    backgroundColor: '#FB4040',
    marginBottom: 20,

    // borderRadius: 10,
    // marginVertical: 10,
  },
});

export default CallCard;
