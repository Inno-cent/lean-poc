/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


interface ContactCardProps {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  international_dialing_code: string;
  profileImage: string;
  isSelected: boolean;
  isTick: boolean;
  onExpand: () => void;
  onLongPress: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  id,
  first_name,
  last_name,
  phone_number,
  international_dialing_code,
  profileImage,
  isSelected,
  isTick,
  onExpand,
  onLongPress,
}) => {

  const defaultImage = require('../assets/images/ll.png');
  const userImage = profileImage ? { uri: profileImage } : defaultImage;

  return (
    <View style={[styles.cardContainer, isSelected && styles.selectedCard]}>
      <TouchableOpacity onPress={onExpand} onLongPress={onLongPress}>
        <View style={styles.card}>
          {/* Expanded Section: Profile Image and Icons */}
          <View
            style={[
              styles.expandedContainer,
              isSelected && styles.expandedBackground,
            ]}
          >
            <Image
              source={userImage}
              style={[styles.profileImage, isSelected && styles.expandedImage]}
            />

            {isSelected && (
              <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.iconButton}>
                  <Icon name="phone" size={18} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Icon name="video-camera" size={18} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Contact Info */}
          <View style={[styles.cardContent, isSelected && { marginLeft: 10 }]}>
            <Text style={styles.name}>{first_name} {last_name}</Text>
            <Text style={styles.phoneNumber}>{international_dialing_code}{phone_number}</Text>
          </View>
          {isTick && (
            <Ionicons name="checkmark-sharp" size={24} color="#415A77" style={styles.tickIcon}/>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.borderLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    // width: "100%"
    paddingVertical: 10,
  },
  expandedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  expandedBackground: {
    backgroundColor: '#778DA980', // Expanded background color covering profile and icons
    borderRadius: 50,
    marginRight: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  expandedImage: {
    width: 50,
    height: 50,
  },

  iconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: '#1B263B',
    padding: 10,
    borderRadius: 20,
    marginLeft: 8,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#415A77',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#778DA9',
    marginTop: 4,
  },
  tickIcon: {
    marginLeft: 'auto',
  },
  borderLine: {
    height: 1,
    backgroundColor: '#D9D9D9',
  },
});

export default ContactCard;
