import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationTab from '../components/navigation-tab';
import ContactCard from '../components/contactCard';
import {useNavigation} from '@react-navigation/native';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const navigation = useNavigation();

  const contacts = [
    {
      name: 'Aloye',
      phoneNumber: '+234 567 564 765',
      profileImage: require('../assets/images/ll.png'),
    },
    {
      name: 'Sam',
      phoneNumber: '+234 567 564 765',
      profileImage: require('../assets/images/ll.png'),
    },
    {
      name: 'David',
      phoneNumber: '+234 567 564 765',
      profileImage: require('../assets/images/ll.png'),
    },
    {
      name: 'Tunde',
      phoneNumber: '+234 567 564 765',
      profileImage: require('../assets/images/ll.png'),
    },
    {
      name: 'Alex',
      phoneNumber: '+234 567 564 765',
      profileImage: require('../assets/images/ll.png'),
    },
    {
      name: 'Chris',
      phoneNumber: '+234 567 564 765',
      profileImage: require('../assets/images/ll.png'),
    },
    {
      name: 'Dan',
      phoneNumber: '+234 567 564 765',
      profileImage: require('../assets/images/ll.png'),
    },
    {
      name: 'Anita',
      phoneNumber: '+234 567 564 765',
      profileImage: require('../assets/images/ll.png'),
    },
    {
      name: 'Nelly',
      phoneNumber: '+234 567 564 765',
      profileImage: require('../assets/images/ll.png'),
    },
  ];

  const favouriteContacts = [
    {name: 'Alice', profileImage: require('../assets/images/ll.png')},
    {name: 'Bob', profileImage: require('../assets/images/ll.png')},
    {
      name: 'Charlie',
      profileImage: require('../assets/images/ll.png'),
    },
    {name: 'Daisy', profileImage: require('../assets/images/ll.png')},
    {name: 'Eva', profileImage: require('../assets/images/ll.png')},
  ];

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleToggleExpand = index => {
    setExpandedCardIndex(index === expandedCardIndex ? null : index); // Collapse if clicked again
  };

  const handleTabPress = tab => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Contacts</Text>
          <Entypo name="dots-three-vertical" size={24} color="#415A77" />
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
          onPress={() => navigation.navigate('/create-contact')}>
          <View style={styles.addButton}>
            <Icon name="plus" size={16} color="#1B263B" />
          </View>
          <Text style={styles.addNewText}>Add New</Text>
        </TouchableOpacity>

        {/* Conditional Rendering for Empty Contact List or Search Results */}
        {contacts.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Image
              source={require('../assets/images/addcontact.png')} // Placeholder image
              style={styles.emptyStateImage}
            />
            <Text style={styles.emptyStateHeader}>No contacts found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try to add more contacts from your personal account
            </Text>
            <TouchableOpacity style={styles.startCallButton}>
              <Text style={styles.startCallButtonText}>Add contact</Text>
            </TouchableOpacity>
          </View>
        ) : filteredContacts.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Image
              source={require('../assets/images/nosearch.png')} // Placeholder image
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
                  name={contact.name}
                  phoneNumber={contact.phoneNumber}
                  profileImage={contact.profileImage}
                  isSelected={expandedCardIndex === index}
                  onExpand={() => handleToggleExpand(index)} // Pass toggle function
                />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <NavigationTab activeTab={activeTab} handleTabPress={handleTabPress} />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex:1
      },
  container: {
    flex: 1,
    position: 'relative',
  },
  contentContainer: {
    paddingBottom: 80,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B263B',
    lineHeight: 36,
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
    padding: 15,
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
    // flex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateImage: {
    // width: 150,
    // height: 150,
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
