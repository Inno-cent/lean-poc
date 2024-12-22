/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import NavigationTab from '../../components/navigation-tab';
import ContactCard from '../../components/contactCard';
import { useNavigation } from '@react-navigation/native';
import { useContacts, deleteContact } from './api';
import ConfirmationModal from './ConfirmationModal';
import { useSocket } from '../../context/socketContext';

interface Contact {
    _id: string;
    first_name: string;
    last_name: string;
    international_dialing_code: string;
    phone_number: string;
    profileImage: any;
}

const Contact = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [contactIdsToDelete, setContactIdsToDelete] = useState<string[] | null>([]);
  const [tickContacts, setTickContacts] = useState<string[]>([]);
  const [refreshContacts, setRefreshContacts] = useState(false);
  const { contacts, error } = useContacts(refreshContacts) as { contacts: Contact[], loading: boolean, error: any };

  const navigation = useNavigation();
  const { initiateCall } = useSocket();


  const handleInitiateCall = (dialingCode: string, phoneNumber: string) => {
    const fullNumber = `${dialingCode}${phoneNumber}`;
    const callInitiateData = {
      call_type: 'Video',
      caller_id: '+2347017915991', // Replace with the current user's number or dynamically set it
      participants: [fullNumber],
    };
    console.log('Call initiated:', callInitiateData);
    initiateCall(callInitiateData);
  };

  const displayMessage = (msg: string) => {
    setMessage(msg);
    // Automatically clear the message after 5 seconds
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };


  const favouriteContacts: any[] = [
    // {name: 'Alice', profileImage: require('../../assets/images/ll.png')},
    // {name: 'Bob', profileImage: require('../../assets/images/ll.png')},
    // {
    //   name: 'Charlie',
    //   profileImage: require('../../assets/images/ll.png'),
    // },
    // {name: 'Daisy', profileImage: require('../../assets/images/ll.png')},
    // {name: 'Eva', profileImage: require('../../assets/images/ll.png')},
  ];

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact =>
    contact.first_name && contact.first_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleToggleExpand = index => {
    setExpandedCardIndex(index === expandedCardIndex ? null : index); // Collapse if clicked again
  };

  const handleTabPress = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleLongPress = (contact: Contact) => {
    setSelectedContacts(prevSelected => {
      if (prevSelected.includes(contact)) {
        return prevSelected.filter(c => c !== contact);
      } else {
        return [...prevSelected, contact];
      }
    });
      setTickContacts(prevTick => {
      if (prevTick.includes(contact._id)) {
        return prevTick.filter(id => id !== contact._id);
      } else {
        return [...prevTick, contact._id];
      }
    });
  };

  const handleDelete = () => {
    const idsToDelete = selectedContacts.map(contact => contact._id);
     setContactIdsToDelete(idsToDelete);
     setModalVisible(true);
  };

  const confirmDelete = () => {
    if (contactIdsToDelete && contactIdsToDelete.length > 0) {
      deleteContact(contactIdsToDelete, displayMessage, setIsSuccess, navigation, setRefreshContacts);
      setSelectedContacts([]);
      setModalVisible(false);
    }
 };

  const cancelDelete = () => {
    setModalVisible(false);
    setContactIdsToDelete([]);
  };

  const handleEdit = () => {
    if (selectedContacts.length > 0) {
      const contact = selectedContacts[0];
      navigation.navigate('UpdateContact', { contact, setRefreshContacts });
    }
  };

  const handleTouchOutside = () => {
    setSelectedContacts([]);
    setTickContacts([]);
  };

  //   const handleToggleStarred = (contact: Contact) => {
  //   // Implement toggle favorite functionality
  //   contact.isStarred = !contact.isStarred;
  // };

  return (
  <TouchableWithoutFeedback onPress={handleTouchOutside}>
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header Section */}
            <View style={styles.header}>
              {selectedContacts.length > 0 ? (
                <View style={styles.headerIcons}>
                  <View style={styles.leftIcons}>
                    <TouchableOpacity>
                      <Feather name="arrow-left" size={24} color="#415A77" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.selectedCount}>{selectedContacts.length}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.rightIcons}>
                    <TouchableOpacity>
                      <Icon name="star-o" size={24} color="#415A77" style={styles.headerIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleEdit}>
                      <Icon name="edit" size={24} color="#415A77" style={styles.headerIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}>
                      <Icon name="trash" size={24} color="#415A77" style={styles.headerIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Entypo name="dots-three-vertical" size={24} color="#415A77" />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                  <Text style={styles.headerText}>Contacts</Text>
                  <Entypo name="dots-three-vertical" size={24} color="#415A77" />
                </>
              )}
            </View>

        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Icon
              name="search"
              size={20}
              color="#1B263B"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#1B263B"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="sliders" size={24} color="#1B263B" />
          </TouchableOpacity>
        </View>

        {/* Favourites Section */}
        <View style={styles.favouritesSection}>
          <Text style={styles.favouritesHeader}>Favourites</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.favouritesList}>
              {favouriteContacts.map((contact, index) => (
                <View key={index} style={styles.favouriteItem}>
                  <Image
                    source={contact.profileImage}
                    style={styles.favouriteImage}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Add New Section */}
        <TouchableOpacity
          style={styles.addNewSection}
          onPress={() => navigation.navigate('CreateContact' as never, { setRefreshContacts })}>
          <View style={styles.addButton}>
            <Icon name="plus" size={16} color="#1B263B" />
          </View>
          <Text style={styles.addNewText}>Add New</Text>
        </TouchableOpacity>

        {/* Conditional Rendering for Empty Contact List or Search Results */}
        { loading ? (
          <ActivityIndicator size="large" color="#415A77" />
          ) : error ? (
          <Text>Error: {error.message}</Text>
          ) : contacts.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Image
              source={require('../../assets/images/addcontact.png')} // Placeholder image
              style={styles.emptyStateImage}
            />
            <Text style={styles.emptyStateHeader}>No contacts found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try to add more contacts from your personal account
            </Text>
            <TouchableOpacity style={styles.startCallButton}
              onPress={()=> navigation.navigate('CreateContact', { setRefreshContacts })}>
              <Text style={styles.startCallButtonText}>Add contact</Text>
            </TouchableOpacity>
          </View>
        ) : filteredContacts.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Image
              source={require('../../assets/images/nosearch.png')} // Placeholder image
              style={styles.emptyStateImage}
            />
            <Text style={styles.emptyStateHeader}>No search result</Text>
            <Text style={styles.emptyStateSubtext}>
              We cant find any contacts matching your search
            </Text>
          </View>
          ) : (
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.cardContentContainer}>
              {filteredContacts.map((contact, index) => (
                <ContactCard
                  key={index}
                  first_name={contact.first_name}
                  id={contact._id}
                  last_name={contact.last_name}
                  international_dialing_code={contact.international_dialing_code}
                  phone_number={contact.phone_number}
                  profileImage={contact.profileImage}
                  isSelected={expandedCardIndex === index}
                  isTick={tickContacts.includes(contact._id)}
                  onExpand={() => handleToggleExpand(index)}
                  onLongPress={() => handleLongPress(contact)}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
      {/* Bottom Navigation */}
      <NavigationTab activeTab={activeTab} handleTabPress={handleTabPress} />
      </View>
      <ConfirmationModal
        visible={modalVisible}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
   </SafeAreaView>
  </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
      },
  container: {
    flex: 1,
    position: 'relative',
  },
  cardContentContainer: {
  },
  contentContainer: {
    paddingBottom: 80,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B263B',
    lineHeight: 36,
  },
  headerIcons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 16,
  },
  selectedCount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 16,
    color: '#415A77',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 30,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 15,
    backgroundColor: '#D9D9D980',
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#1B263B',
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#D9D9D980',
    padding: 15,
    borderRadius: 5,
  },
  favouritesSection: {
    marginTop: 20,
  },
  favouritesHeader: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 27,
    color: '#1B263B',
    marginBottom: 10,
  },
  favouritesList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favouriteItem: {
    marginRight: 15,
  },
  favouriteImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  addNewSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#778DA980',
    padding: 10,
    borderRadius: 50,
    marginRight: 10,
    textAlign: 'center',
  },
  addNewText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1B263B',
    lineHeight: 30,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#1B263B',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateImage: {
    marginBottom: 20,
  },
  emptyStateHeader: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B263B',
    marginBottom: 10,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#415A77',
    textAlign: 'center',
    marginBottom: 30,
  },
  startCallButton: {
    backgroundColor: '#415A77',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  startCallButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Contact;
