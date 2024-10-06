import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {  AntDesign } from "@expo/vector-icons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Accordion from "../components/accordion";

const helpSupport = ({}) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const handleLogout = () => {
    setModalVisible(false);
  };

  const accordionData = [
    {
      title: "How do I start a video call?",
      content:
        "Select a contact from your list and click the video call icon to initiate the call immediately.",
    },
    {
      title: "Can I use the app on multiple devices?",
      content:
        "Select a contact from your list and click the video call icon to initiate the call immediately.",
    },
    {
      title: "How do I start a video call?",
      content:
        "Select a contact from your list and click the video call icon to initiate the call immediately.",
    },
    {
      title: "Can I use the app on multiple devices?",
      content:
        "Select a contact from your list and click the video call icon to initiate the call immediately.",
    },
    {
      title: "Can I use the app on multiple devices?",
      content:
        "Select a contact from your list and click the video call icon to initiate the call immediately.",
    },
    {
      title: "Can I use the app on multiple devices?",
      content:
        "Select a contact from your list and click the video call icon to initiate the call immediately.",
    },
  ];


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/profile")}
          style={styles.arrowButton}
        >
          <AntDesign name="arrowleft" size={24} color="#1B263B" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help & Support</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}
      >
        <Text style={styles.heeaderText}>
          We're Here to Help with Anything at Onbrela
        </Text>
        <Text style={styles.descriptionText}>
          Need assistance with SmartVideo? Our team is here to help you with any
          questions or issues—reach out for quick support!
        </Text>

        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <FontAwesome
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
        </View>

        <Text style={styles.faqheadtext}>FAQ'S</Text>

        <View style={styles.accordionwrap}>
          {accordionData.map((item, index) => (
            <Accordion key={index} title={item.title}>
              <Text>{item.content}</Text>
            </Accordion>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.formSubmitButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Send message</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Warning</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete your account? You will lose all
              progress and this cannot be reversed. There is no going back!
            </Text>
            <TextInput
              style={styles.textarea}
              placeholder="Enter reason for deleting your account"
              multiline={true}
              numberOfLines={4}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    // paddingTop: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  arrowButton: {
    padding: 10,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "#292D32",
    lineHeight: 30,
  },
  contentContainer: {
    paddingTop: 70, // Adjust to be just below the header
    paddingBottom: 100, // Space for the button
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  heeaderText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B263B",
    marginBottom: 10,
  },
  faqheadtext: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B263B",
    lineHeight: 36,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#1B263BE5",
    marginBottom: 10,
    lineHeight: 26,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#D9D9D980",
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
    color: "#1B263B",
    fontSize: 16,
  },
  accordionwrap: {
    marginTop: 20,
  },
  formSubmitButton: {
    backgroundColor: "#415a77",
    padding: 12,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
  modalContainer: {
     flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background with blur effect
    backdropFilter: "blur(10px)", // Blurring effect (for web, add equivalent for mobile)
  },
  modalContent: {
    width: "95%",
    // maxWidth: 390,
    // height: 300,
    backgroundColor: "#0D1B2A",
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  textarea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top', // Ensures text starts at the top of the TextInput
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 27,
    color: "#fff",
    // textAlign: "center",
    marginBottom: 30,
  },
  modalButtons: {
    flexDirection: "column", // Arrange buttons in a column
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    borderWidth: 1, // Defines the thickness of the border (1px)
    borderColor: "#D9D9D9", // Sets the border color
    borderRadius: 25,
    padding: 15,
    marginBottom: 10, // Space between buttons
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 15,
  },
  logoutButton: {
    backgroundColor: "#415a77",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 25,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 15,
  },
});

export default helpSupport;
