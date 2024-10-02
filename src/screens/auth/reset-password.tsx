import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const ResetPassword = ({}) => {
  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.backArrow}>
        <Icon name="arrowleft" size={24} color="#1B263B" />
      </TouchableOpacity>

      <Text style={styles.headerText}>Create New Password</Text>
      <Text style={styles.descriptionText}>
      your new password must be different from your previously used password
      </Text>


        <Text style={styles.label}>New Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          >
            <FontAwesome
              name={isPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#778DA9"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm New Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          >
            <FontAwesome
              name={isPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#778DA9"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.formSubmitButton}
          onPress={() => router.replace("auth/reset-success")}
        >
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  backArrow: {
    marginTop: 30,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#415A77",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#415A77",
    marginBottom: 50,

  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 5,
    color: "#1B263B",
  },
  inputWithIcon: {
    height: 44,
    padding: 12,
    fontSize: 14,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginBottom: 50,
  },

  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 14, // Adjust to vertically center the icon inside the input
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

export default ResetPassword;
