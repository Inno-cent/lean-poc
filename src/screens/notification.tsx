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
  Switch,
  SafeAreaView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Notifications = ({}) => {
  const navigation = useNavigation();

  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isSMSEnabled, setIsSMSEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);

  const toggleSwitch = type => {
    if (type === 'push') setIsPushEnabled(prevState => !prevState);
    if (type === 'sms') setIsSMSEnabled(prevState => !prevState);
    if (type === 'email') setIsEmailEnabled(prevState => !prevState);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.arrowButton}>
              <Icon name="arrowleft" size={24} color="#1B263B" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Notification Settings</Text>
          </View>

          {/* Push Notification */}
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <MaterialIcons name="devices" size={24} color="#1B263B" />
              <Text style={styles.listItemText}>Push Notifications</Text>
            </View>
            <Switch
              trackColor={{false: '#778DA9', true: '#415A77'}}
              thumbColor={isSMSEnabled ? '#ffffff' : '#ffffff'}
              ios_backgroundColor="#778DA9"
              onValueChange={() => toggleSwitch('sms')}
              value={isSMSEnabled}
            />
          </TouchableOpacity>

          {/* SMS Notification */}
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <MaterialIcons
                name="chat-bubble-outline"
                size={24}
                color="#1B263B"
              />
              <Text style={styles.listItemText}>SMS Notifications</Text>
            </View>
            <Switch
              trackColor={{false: '#778DA9', true: '#415A77'}}
              thumbColor={isSMSEnabled ? '#ffffff' : '#ffffff'}
              ios_backgroundColor="#778DA9"
              onValueChange={() => toggleSwitch('sms')}
              value={isSMSEnabled}
            />
          </TouchableOpacity>

          {/* Email Notification */}
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <MaterialIcons name="mail-outline" size={24} color="#1B263B" />
              <Text style={styles.listItemText}>Email Notifications</Text>
            </View>
            <Switch
              trackColor={{false: '#778DA9', true: '#415A77'}}
              thumbColor={isEmailEnabled ? '#ffffff' : '#ffffff'}
              ios_backgroundColor="#778DA9"
              onValueChange={() => toggleSwitch('email')}
              value={isEmailEnabled}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: '700',
    color: '#415A77',
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
});

export default Notifications;
