import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationTab from '../components/navigation-tab';
import RecentCallsCard from '../components/callCard';
import {useNavigation} from '@react-navigation/native';
import {getUser} from './auth/auth';
import {connectSocket, disconnectSocket} from '../services/socketService';

// Define a type for the user object
interface User {
  username: string;
  // Add other user properties as needed
}

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('home'); // Default active tab
  const navigation = useNavigation();
  const recentCallsData = [
    {
      name: 'John Doe',
      timeAgo: '25 mins ago',
      isCallIncoming: false,
      profileImage: require('../assets/images/ll.png'),
    },
    {
      name: 'John Doe',
      timeAgo: '25 mins ago',
      isCallIncoming: false,
      profileImage: require('../assets/images/ll.png'),
    },
    {
      name: 'John Doe',
      timeAgo: '25 mins ago',
      isCallIncoming: false,
      profileImage: require('../assets/images/ll.png'),
    },
  ];

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call getUser on component mount to fetch user details
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        console.log(userData);
        setUser(userData); 
         // Connect to the socket after fetching user data
         if (userData) {
          connectSocket(userData._id); // Pass user ID if needed
        }
      } catch (error) {
        console.error('Error fetching user:', error); // Log any errors
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, []);

  const handleTabPress = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* First Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerSectionInn}>
            <View style={styles.headerSectionInner}>
              <Text style={styles.headerText}>Onbrela</Text>

              <View>
                {loading ? (
                  <Text style={styles.subText}>Hi ...</Text> // Display loading text
                ) : user ? (
                  <Text style={styles.subText}>Hi, {user.username}</Text> // Accessing username
                ) : (
                  <Text style={styles.subText}>Hi, ?</Text> // Handle case where user is null
                )}
              </View>
            </View>

            <View style={styles.profileSection}>
              <Image
                source={require('../assets/images/ll.png')}
                style={styles.profilePicture}
              />
            </View>
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
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Icon name="sliders" size={24} color="#1B263B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Card Section */}
        <View style={styles.cardWrapper}>
          <View style={styles.cardContainer}>
            <View style={styles.smallCard}>
              <Text style={styles.smallCardText}>27 Aug</Text>
            </View>

            <Text style={styles.cardTitle}>
              Designing Name Video Calling App
            </Text>

            <View style={styles.cardInfo}>
              <View style={styles.timeContainer}>
                <Icon name="clock-o" size={16} color="white" />
                <Text style={styles.timeText}>10:30AM - 11:30AM</Text>
              </View>
              <Icon name="ellipsis-h" size={24} color="white" />
            </View>
          </View>
        </View>

        <View style={styles.boxContainer}>
          <View style={styles.boxWrapper}>
            <TouchableOpacity style={styles.box}>
              <Icon name="video-camera" size={20} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.boxText}>Quick Call</Text>
          </View>

          <View style={styles.boxWrapper}>
            <TouchableOpacity style={styles.box}>
              <Icon name="calendar" size={20} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.boxText}>Schedule</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('SOS')}>
            <View style={styles.boxWrapper}>
              <TouchableOpacity style={styles.box}>
                <View style={styles.plusIconContainer}>
                  <Image source={require('../assets/images/sos.png')} />
                </View>
              </TouchableOpacity>
              <Text style={styles.boxText}>SOS</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Calls Header */}
        <View style={styles.recentCallsHeader}>
          <Text style={styles.recentCallsText}>Recent Calls</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Calls Card */}
        <ScrollView>
          {recentCallsData.map((call, index) => (
            <RecentCallsCard
              key={index}
              name={call.name}
              timeAgo={call.timeAgo}
              isCallIncoming={call.isCallIncoming}
              profileImage={call.profileImage}
            />
          ))}
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <NavigationTab activeTab={activeTab} handleTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Ensures the nav bar is positioned within the parent container
  },
  contentContainer: {
    paddingBottom: 80, // Prevents content from being hidden behind the fixed nav bar
  },
  headerSection: {
    backgroundColor: '#0D1B2A',
    padding: 20,
  },
  headerSectionInn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 36,
  },
  subText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
    lineHeight: 30,
  },
  profileSection: {
    marginTop: 60,
  },
  headerSectionInner: {
    marginTop: 60,
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
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1B263B',
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
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
  },
  cardWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  cardContainer: {
    backgroundColor: '#415A77',
    padding: 40,
    borderRadius: 10,
    position: 'relative',
  },
  smallCard: {
    backgroundColor: '#0D1B2A',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    position: 'absolute',
    top: -10,
    left: 20,
  },
  smallCardText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 10,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  boxWrapper: {
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#0D1B2A',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 80,
  },
  boxText: {
    marginTop: 8,
    color: '#1B263B',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 27,
    textAlign: 'center',
  },
  plusIconContainer: {
    // backgroundColor: "#FFF",
    padding: 5,
  },
  recentCallsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  recentCallsText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1B263B',
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1B263B',
  },
  recentCallsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D9D9D980',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
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
  tiimeText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#1B263B',
  },
  rightCard: {
    padding: 10,
    // backgroundColor: "#FFFFFF",
    // borderRadius: 10,
  },
  navigationinner: {
    backgroundColor: '#FFF',
  },
  navigationTab: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#415A77',
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },

  navItem: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeTab: {
    backgroundColor: '#415A77',
    borderRadius: 30,
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    marginLeft: 5,
  },
});

export default HomePage;
