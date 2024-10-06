import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native';

const SettingsScreen = ({}) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const handleLogout = () => {
    // Perform logout logic here
    setModalVisible(false);
    // Navigate to the login screen or perform other actions
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={styles.arrowButton}>
              <Icon name="arrowleft" size={24} color="#1B263B" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Change password</Text>
          </View>

          {/* Light Mode */}
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <MaterialIcons name="wb-sunny" size={24} color="#1B263B" />
              <Text style={styles.listItemText}>Light Mode</Text>
            </View>
          </TouchableOpacity>

          {/* Verify Account */}
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <MaterialIcons name="verified-user" size={24} color="#1B263B" />
              <Text style={styles.listItemText}>Verify Account</Text>
            </View>
            <Entypo name="chevron-right" size={24} color="#778DA9" />
          </TouchableOpacity>

          {/* About Us */}
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <MaterialIcons name="info-outline" size={24} color="#1B263B" />
              <Text style={styles.listItemText}>About Us</Text>
            </View>
            <Entypo name="chevron-right" size={24} color="#778DA9" />
          </TouchableOpacity>

          {/* Delete Account */}
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => setModalVisible(true)}>
            <View style={styles.listItemContent}>
              <MaterialIcons name="delete-outline" size={24} color="#B22222" />
              <Text style={[styles.listItemText, styles.deleteText]}>
                Delete Account
              </Text>
            </View>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Warning</Text>
                <Text style={styles.modalText}>
                  Are you sure you want to delete your account? You will loose
                  all progress and this cannot be reversed .Thre is no going
                  back!
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Delete Account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  arrowButton: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#292D32',
    lineHeight: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
    color: '#1B263B',
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
  deleteText: {
    color: '#B22222', // Red color for Delete Account text
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
    borderWidth: 1, // Defines the thickness of the border (1px)
    borderColor: '#D9D9D9', // Sets the border color
    borderRadius: 25,
    padding: 15,
    marginBottom: 10, // Space between buttons
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

export default SettingsScreen;
