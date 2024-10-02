import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationTab from "../components/navigation-tab";
import RecentCallsCard from "../components/callCard";

const contact = () => {
  const [activeTab, setActiveTab] = useState("call");

  const recentCallsData: any[] = [
    {
      name: "John Doe",
      timeAgo: "25 mins ago",
      isCallIncoming: false,
      isVideoCall: false,
      profileImage: require("../assets/images/Ellipse 37.png"),
    },
    {
      name: "Jane Smith",
      timeAgo: "1 hour ago",
      isCallIncoming: true,
      isVideoCall: true,
      profileImage: require("../assets/images/Ellipse 37.png"),
    },
    {
      name: "Aloye",
      timeAgo: "2 hours ago",
      isVideoCall: true,
      isCallIncoming: false,
      profileImage: require("../assets/images/Ellipse 37.png"),
    },
    {
      name: "Aloye",
      timeAgo: "2 hours ago",
      isCallIncoming: false,
      profileImage: require("../assets/images/Ellipse 37.png"),
    },
    {
      name: "Aloye",
      timeAgo: "2 hours ago",
      isCallIncoming: true,
      isVideoCall: false,

      profileImage: require("../assets/images/Ellipse 37.png"),
    },
    {
      name: "Aloye",
      timeAgo: "2 hours ago",
      isVideoCall: true,
      isCallIncoming: false,
      profileImage: require("../assets/images/Ellipse 37.png"),
    },
    {
      name: "Aloye",
      timeAgo: "2 hours ago",
      isCallIncoming: false,
      isVideoCall: true,
      profileImage: require("../assets/images/Ellipse 37.png"),
    },
    // Add more entries as needed
  ];

  const handleTabPress = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Call logs</Text>
          <Entypo name="dots-three-vertical" size={24} color="#415A77" />
        </View>

       {/* Conditional rendering */}
       {recentCallsData.length === 0 ? (
        // Empty call log state
        <View style={styles.emptyStateContainer}>
          <Image
            source={require("../assets/images/ph.png")} // Placeholder image
            style={styles.emptyStateImage}
          />
          <Text style={styles.emptyStateHeader}>Your call log is empty</Text>
          <Text style={styles.emptyStateSubtext}>
            Your recent calls will appear here. Start a call to see your call history.
          </Text>
          <TouchableOpacity style={styles.startCallButton}>
            <Text style={styles.startCallButtonText}>Start a Call</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Call log state
        <ScrollView>
          {recentCallsData.map((call, index) => (
            <RecentCallsCard
              key={index}
              name={call.name}
              timeAgo={call.timeAgo}
              profileImage={call.profileImage}
              isCallIncoming={call.isCallIncoming}
              isVideoCall={call.isVideoCall}
            />
          ))}
        </ScrollView>
      )}
      {/* Bottom Navigation */}
      </ScrollView>
      <NavigationTab activeTab={activeTab} handleTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  contentContainer: {
    paddingBottom: 80,
    // padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 50,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B263B",
    lineHeight: 36,
  },
  emptyStateContainer: {
    // flex: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyStateImage: {
    // width: 150,
    // height: 150,
    marginBottom: 20,
  },
  emptyStateHeader: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1B263B",
    marginBottom: 10,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: "#415A77",
    textAlign: "center",
    marginBottom: 30,
  },
  startCallButton: {
    backgroundColor: "#415A77",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  startCallButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default contact;
