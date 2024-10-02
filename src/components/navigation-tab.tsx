import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const NavigationTab = ({ activeTab, handleTabPress }) => {
  const navigation = useNavigation(); // Use useNavigation hook from react-navigation

  const handleNavigation = (tab) => {
    handleTabPress(tab);
    navigation.navigate(tab); // Navigate to the tab
  };

  return (
    <SafeAreaView style={styles.safeArea}>


    <View style={styles.navigationTabContainer}>
      <View style={styles.navigationTab}>
        <TouchableOpacity
          style={[styles.navItem, activeTab === "home" && styles.activeTab]}
          onPress={() => handleNavigation("Home")}
        >
          <View style={styles.navContent}>
            <FontAwesome
              name="home"
              size={24}
              color={activeTab === "home" ? "#FFF" : "#415A77"}
            />
            {activeTab === "home" && <Text style={styles.navText}>Home</Text>}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === "contact" && styles.activeTab]}
          onPress={() => handleNavigation("Contact")}
        >
          <View style={styles.navContent}>
            <FontAwesome
              name="address-book"
              size={24}
              color={activeTab === "contact" ? "#FFF" : "#415A77"}
            />
            {activeTab === "contact" && (
              <Text style={styles.navText}>Contact</Text>
            )}
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.navItem, activeTab === "schedule" && styles.activeTab]}
          onPress={() => handleNavigation("ScheduleScreen")}
        >
          <View style={styles.navContent}>
            <FontAwesome
              name="calendar"
              size={24}
              color={activeTab === "schedule" ? "#FFF" : "#415A77"}
            />
            {activeTab === "schedule" && (
              <Text style={styles.navText}>Schedule</Text>
            )}
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[styles.navItem, activeTab === "call" && styles.activeTab]}
          onPress={() => handleNavigation("CallScreen")}
        >
          <View style={styles.navContent}>
            <FontAwesome
              name="phone"
              size={24}
              color={activeTab === "call" ? "#FFF" : "#415A77"}
            />
            {activeTab === "call" && <Text style={styles.navText}>Call</Text>}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === "profile" && styles.activeTab]}
          onPress={() => handleNavigation("ProfileScreen")}
        >
          <View style={styles.navContent}>
            <FontAwesome
              name="user"
              size={24}
              color={activeTab === "profile" ? "#FFF" : "#415A77"}
            />
            {activeTab === "profile" && (
              <Text style={styles.navText}>Profile</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex:1
  },
  navigationTabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  navigationTab: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#415A77",
    borderRadius: 30,
    marginLeft: 20,
    marginRight: 20,
  },

  navItem: {
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeTab: {
    backgroundColor: "#415A77",
    borderRadius: 30,
  },
  navContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  navText: {
    color: "white",
    marginLeft: 5,
  },
});

export default NavigationTab;
