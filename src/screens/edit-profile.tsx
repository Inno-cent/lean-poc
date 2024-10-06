import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native';

import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-date-picker";

const EditProfile = ({ navigation }) => {
    const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState("");
  const [openDatePicker, setOpenDatePicker] = useState(false);



  return (
    <SafeAreaView>

    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.arrowButton}
          >
            <AntDesign name="arrowleft" size={24} color="#1B263B" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Edit Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profilePictureContainer}>
            <Image
              source={require("../assets/images/Ellipse 37.png")}
              style={styles.profilePicture}
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <FontAwesome name="camera" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.nameText}>John Doe</Text>
          <Text style={styles.usernameText}>@johndoe</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <View style={styles.flexContainer}>
            <View style={styles.flexItem}>
              <Text style={styles.label}>Birthday</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/DD/YYYY"
                value={birthday}
                onChangeText={setBirthday}
              />
            </View>
            <View style={styles.flexItem}>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={styles.input}
                placeholder="Select Gender"
                value={gender}
                onChangeText={setGender}
              />
            </View>
          </View>

          {/* <View style={styles.flexContainer}>
            <View style={styles.flexItem}>
              <Text style={styles.label}>Birthday</Text>
              <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  value={birthday.toDateString()}
                  editable={false}
                  placeholder="MM/DD/YYYY"
                />
              </TouchableOpacity>
              <DatePicker
                modal
                mode="date"
                open={openDatePicker}
                date={birthday}
                onConfirm={(date) => {
                  setOpenDatePicker(false);
                  setBirthday(date);
                }}
                onCancel={() => {
                  setOpenDatePicker(false);
                }}
              />
            </View>
            <View style={styles.flexItem}>
              <Text style={styles.label}>Gender</Text>
              <RNPickerSelect
                onValueChange={(value) => setGender(value)}
                items={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
                style={pickerSelectStyles}
                placeholder={{
                  label: "Select Gender",
                  value: null,
                }}
                value={gender}
              />
            </View>
          </View> */}
        </View>

        <TouchableOpacity
          style={styles.formSubmitButton}
          onPress={() => router.replace("/profile")}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  arrowButton: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#415A77",
    lineHeight: 30,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePictureContainer: {
    position: "relative",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    padding: 5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    color: "#1B263B",
  },
  usernameText: {
    fontSize: 16,
    color: "#778DA9",
  },
  separator: {
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 2,
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 5,
    lineHeight: 27,
    color: "#1B263B",
  },
  input: {
    height: 44,
    padding: 12,
    fontSize: 14,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexItem: {
    flex: 1,
    marginRight: 10,
  },
  formSubmitButton: {
    backgroundColor: "#415a77",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
});



export default EditProfile;
