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
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';


const createContact = ({}) => {
  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  return (
    <SafeAreaView>
      
    </SafeAreaView>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/contact")}
            style={styles.arrowButton}
          >
            <AntDesign name="arrowleft" size={24} color="#1B263B" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Create New Contact</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <AntDesign
              name="user"
              size={20}
              color="#1B263B"
              style={styles.icon}
            />
            <TextInput
              placeholder="First name"
              placeholderTextColor="#1B263BE5"
              style={styles.inputWithIcon}
            />
          </View>

          <View style={styles.inputWrapper}>
            <View style={styles.emptyIcon} />
            <TextInput
              placeholder="Last name"
              placeholderTextColor="#1B263BE5"
              style={styles.inputWithIcon}
            />
          </View>
          <View style={styles.inputWrapperFlex}>
            <View style={[styles.inputWrapper, styles.specialInput]}>
              <AntDesign
                name="phone"
                size={20}
                color="#1B263B"
                style={styles.icon}
              />
              <View style={styles.inputInnerWrapper}>
                <Text style={styles.label}>Country</Text>
                <TextInput
                  placeholder="NG"
                  placeholderTextColor="#1B263BE5"
                  style={styles.inputWithIcon}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Phone"
                placeholderTextColor="#1B263BE5"
                style={styles.inputWithIcon}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.formSubmitButton}
        onPress={() => router.replace("/contact")}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea:{
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
    marginBottom: 80,
    marginTop: 10,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#415A77",
    lineHeight: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
  },
  inputWrapperflex: {
    marginRight: 20,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 27,
    color: "#1B263B",
    paddingLeft: 12,
  },
  emptyIcon: {
    width: 30, // This should match the icon size for alignment
  },
  inputWithIcon: {
    flex: 1,
    height: 44,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#1B263B",
    paddingBottom: 5,
    width: "100%",
  },
  specialInput: {
    marginRight: 20,
  },
  //   inputWrapperInner: {
  // marginRight: 20
  //   },
  inputWrapperFlex: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  inputInnerWrapper: {
    flex: 1,
    flexDirection: "column",
  },

  formSubmitButton: {
    backgroundColor: "#415a77",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 80,
    marginBottom: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
});

export default createContact;
