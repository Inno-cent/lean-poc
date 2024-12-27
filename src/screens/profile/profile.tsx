import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationTab from '../../components/navigation-tab';
import { useNavigation } from '@react-navigation/native';
import { getProfile } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  username: string;
  full_name: string;
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Call getUser on component mount to fetch user details
      const fetchUser = async () => {
        try {
          const userData = await getProfile();
          if (userData) {
            setUser(userData);
        }
        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setLoading(false);
        }
      }
      fetchUser();
    }, []);

  const handleTabPress = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    setModalVisible(false);
  };

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <View style={styles.fixedPart}>
        <Image
          source={require('../../assets/images/profilepic.png')}
          style={styles.profilePicture}
        />

        {/* Head Name and Username */}
        <View>
          {user && user.username ? (
            <View>
              <Text style={styles.headName}>{user.username}</Text>
            </View>
          ) : (
            <Text style={styles.headName}>...</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.formSubmitButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Feather name="edit-2" size={20} color="#FFF" style={styles.icon} />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
      </View>

      {/* Scrollable Settings List */}
      <View style={styles.scrollablePart}>
        <TouchableOpacity style={styles.listItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <View style={styles.listItemContent}>
            <Icon name="cog" size={24} color="#1B263B" />
            <Text style={styles.listItemText}>Settings</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="#778DA9" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}
          onPress={() => navigation.navigate('Notification')}
        >
          <View style={styles.listItemContent}>
            <MaterialIcons name="notifications" size={24} color="#1B263B" />
            <Text style={styles.listItemText}>Notification</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="#778DA9" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <View style={styles.listItemContent}>
            <Icon name="lock" size={24} color="#1B263B" />
            <Text style={styles.listItemText}>Change Password</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="#778DA9" />
        </TouchableOpacity>

        <View style={styles.horizontalLine} />

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemContent}>
            <MaterialIcons name="help-outline" size={24} color="#1B263B" />
            <Text style={styles.listItemText}>Help & Support</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="#778DA9" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem} onPress={() => setModalVisible(true)}>
          <View style={styles.listItemContent}>
            <Icon name="sign-out" size={24} color="#1B263B" />
            <Text style={styles.listItemText}>Log Out</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="#778DA9" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemContent}>
            <MaterialIcons name="help-outline" size={24} color="#1B263B" />
            <Text style={styles.listItemText}>Help & Support</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="#778DA9" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem} onPress={() => setModalVisible(true)}>
          <View style={styles.listItemContent}>
            <Icon name="sign-out" size={24} color="#1B263B" />
            <Text style={styles.listItemText}>Log Out</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="#778DA9" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemContent}>
            <MaterialIcons name="help-outline" size={24} color="#1B263B" />
            <Text style={styles.listItemText}>Help & Support</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="#778DA9" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem} onPress={() => setModalVisible(true)}>
          <View style={styles.listItemContent}>
            <Icon name="sign-out" size={24} color="#1B263B" />
            <Text style={styles.listItemText}>Log Out</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="#778DA9" />
        </TouchableOpacity>
      </View>

      {/* Logout Modal */}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingTop: 30,
  },
  fixedPart: {
    paddingTop: 30,
    backgroundColor: '#FFF',
    alignItems: 'center',
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
    fontWeight: '400',
    lineHeight: 27,
  },
  horizontalLine: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#D9D9D9',
    marginVertical: 20,
  },
  scrollablePart: {
    padding: 16,
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 390,
    height: 300,
    backgroundColor: '#0D1B2A',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
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
    marginBottom: 30,
  },
  modalButtons: {
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
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 15,
  },
});

export default ProfilePage;
