import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationTab from '../components/navigation-tab';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const handleTabPress = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const handleLogout = () => {
    // Perform logout logic here
    setModalVisible(false);
    // Navigate to the login screen or perform other actions
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={require('../assets/images/profilepic.png')} // Replace with your profile image
        style={styles.profilePicture}
      />

      {/* Head Name and Username */}
      <Text style={styles.headName}>John Doe</Text>
      <Text style={styles.username}>@johndoe</Text>

      <TouchableOpacity
        style={styles.formSubmitButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Feather name="edit-2" size={20} color="#FFF" style={styles.icon} />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      {/* Horizontal Line */}
      <View style={styles.horizontalLine} />

      {/* Settings List */}
      {/* <View style={styles.settingsList}> */}
      <TouchableOpacity
        style={styles.listItem}
        // onPress={() => router.replace("/settings")}
      >
        <View style={styles.listItemContent}>
          <Icon name="cog" size={24} color="#1B263B" />
          <Text style={styles.listItemText}>Settings</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#778DA9" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.listItem}
        // onPress={() => router.replace("/notification")}
      >
        <View style={styles.listItemContent}>
          <MaterialIcons name="notifications" size={24} color="#1B263B" />
          <Text style={styles.listItemText}>Notification</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#778DA9" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.listItem}
        // onPress={() => router.replace("/change-password")}
      >
        <View style={styles.listItemContent}>
          <Icon name="lock" size={24} color="#1B263B" />
          <Text style={styles.listItemText}>Change Password</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#778DA9" />
      </TouchableOpacity>
      <View style={styles.horizontalLine} />

      <TouchableOpacity
        style={styles.listItem}
        // onPress={() => router.replace("/help-support")}
      >
        <View style={styles.listItemContent}>
          <MaterialIcons name="help-outline" size={24} color="#1B263B" />
          <Text style={styles.listItemText}>Help & Support</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#778DA9" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.listItem}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.listItemContent}>
          <Icon name="sign-out" size={24} color="#1B263B" />
          <Text style={styles.listItemText}>Log Out</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#778DA9" />
      </TouchableOpacity>
      {/* </View> */}

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalText}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <NavigationTab activeTab={activeTab} handleTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  headName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B263B',
    marginBottom: 5,
    lineHeight: 30,
  },
  username: {
    fontSize: 16,
    color: '#1B263BE5',
    marginBottom: 20,
    fontWeight: 400,
    lineHeight: 27,
  },
  horizontalLine: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#D9D9D9',
    marginVertical: 20,
  },

  icon: {
    marginRight: 10,
  },

  formSubmitButton: {
    flexDirection: 'row',
    backgroundColor: '#415a77',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#1B263B',
  },
  settingsList: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
    borderBottomColor: '#D9D9D9',
    // borderBottomWidth: 1,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#1B263B',
    fontWeight: '400',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background with blur effect
    backdropFilter: 'blur(10px)', // Blurring effect (for web, add equivalent for mobile)
  },
  modalContent: {
    width: '90%',
    maxWidth: 390,
    height: 300,
    backgroundColor: '#0D1B2A',
    borderRadius: 20,
    padding: 20,
    // alignItems: "center",
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#fff',
    // textAlign: "center",
    marginBottom: 30,
  },
  modalButtons: {
    flexDirection: 'column', // Arrange buttons in a column
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 25,
    padding: 15,
    marginBottom: 10, 
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 15,
  },
  logoutButton: {
    backgroundColor: '#415a77',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 25,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 15,
  },
});

export default ProfilePage;
